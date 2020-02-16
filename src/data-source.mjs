import { EventEmitter } from 'relaks-event-emitter';
import { DataSourceError } from './data-source-error.mjs';
import { DataSourceEvent } from './data-source-event.mjs';

const defaultOptions = {
  baseURL: '',
  permalinks: true,
  refreshInterval: 0,
  fetchFunc: null,
};

class RelaksWordpressDataSource extends EventEmitter {
  constructor(options) {
    super();
    this.active = false;
    this.activationPromise = null;
    this.queries = [];
    this.authentications = [];
    this.authorizations = [];
    this.options = {};
    for (let name in defaultOptions) {
      if (options && options[name] !== undefined) {
        this.options[name] = options[name];
      } else {
        this.options[name] = defaultOptions[name];
      }
    }
  }

  /**
   * Activate the component
   */
  activate() {
    if (!this.active) {
      this.active = true;
      if (this.activationPromise) {
        const { resolve } = this.activationPromise;
        this.activationPromise = null;
        resolve();
      }
      this.startExpirationCheck();
      this.checkExpiration();
    }
  }

  /**
   * Activate the component
   */
  deactivate() {
    if (this.active) {
      this.stopExpirationCheck();
      this.active = false;
    }
  }

  /**
   * Add baseURL to relative URL
   *
   * @param  {String} url
   *
   * @return {String}
   */
  resolveURL(url) {
    if (typeof(url) !== 'string') {
      return url;
    }
    let { baseURL } = this.options;
    if (baseURL && !/^https?:/.test(url)) {
      if (!/^https?:/.test(baseURL)) {
        if (typeof(location) === 'object') {
          const { protocol, host } = location;
          baseURL = `${protocol}//${host}${baseURL}`;
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Base URL is not absolute');
          }
        }
      }
      url = removeTrailingSlash(baseURL) + addLeadingSlash(url);
    }
    url = addTrailingSlash(url);
    return url;
  }

  /**
   * Resolve a list of URLs
   *
   * @param  {Array<String>} urls
   *
   * @return {Array<String>}
   */
  resolveURLs(urls) {
    return urls.map(url => this.resolveURL(url));
  }

  /**
   * Trigger a 'change' event unless changed is false
   *
   * @param  {Boolean} changed
   *
   * @return {Boolean}
   */
  notifyChanges(changed) {
    if (changed === false) {
      return false;
    }
    this.triggerEvent(new DataSourceEvent('change', this));
    return true;
  }

  /**
   * Fetch one object at the URL.
   *
   * @param  {String} url
   * @param  {Number|String|undefined} id
   * @param  {Object|undefined} options
   *
   * @return {Promise<Object>}
   */
  fetchOne(url, id, options) {
    if (id) {
      return this.fetchMultiple(url, [ id ], options).then((objects) => {
        return objects[0] || null;
      });
    } else {
      const absURL = this.resolveURL(url);
      const props = {
        type: 'object',
        url: absURL,
        options: options || {},
      };
      let query = this.findQuery(props);
      if (!query) {
        const time = getTime();
        query = props;
        query.promise = this.get(absURL).then((response) => {
          const object = response;
          query.object = object;
          query.time = time;
          this.processFreshObject(object, absURL, query, true);
          return object;
        });
        this.queries.unshift(query);
      }
      return query.promise.then((object) => {
        if (query.expired)  {
          this.refreshOne(query);
        }
        return object;
      });
    }
  }

  /**
   * Fetch a page of objects
   *
   * @param  {String} url
   * @param  {Number} page
   * @param  {Object|undefined} options
   *
   * @return {Promise<Array>}
   */
  fetchPage(url, page, options) {
    const absURL = this.resolveURL(url);
    const props = {
      type: 'page',
      url: absURL,
      page: page,
      options: options || {},
    };
    let query = this.findQuery(props);
    if (!query) {
      const pageURL = attachPageNumber(absURL, page);
      const time = getTime();
      query = props;
      query.promise = this.get(pageURL).then((response) => {
        const objects = response;
        query.objects = objects;
        query.time = time;
        this.processFreshObjects(objects, pageURL, query, true);
        return objects;
      });
      this.queries.push(query);
    }
    return query.promise.then((objects) => {
      if (query.expired)  {
        this.refreshPage(query);
      }
      return objects;
    });
  }

  /**
   * Fetch a list of objects at the given URL.
   *
   * @param  {String} url
   * @param  {Object} options
   *
   * @return {Promise<Array>}
   */
  fetchList(url, options) {
    const absURL = this.resolveURL(url);
    const props = {
      type: 'list',
      url: absURL,
      options: options || {},
    };
    let query = this.findQuery(props);
    if (!query) {
      query = props;
      query.promise = this.fetchNextPage(query, true);
      this.queries.push(query);
    }
    return query.promise.then((objects) => {
      if (query.expired)  {
        this.refreshList(query);
      }
      return objects;
    });
  }

  /**
   * Return what has been fetched. Used by fetchList().
   *
   * @param  {Object} query
   *
   * @return {Promise<Array>}
   */
  fetchNoMore(query) {
    return query.promise;
  }

  /**
   * Initiate fetching of the next page. Used by fetchList().
   *
   * @param  {Object} query
   * @param  {Boolean} initial
   *
   * @return {Promise<Array>}
   */
  fetchNextPage(query, initial) {
    if (query.nextPromise) {
      return query.nextPromise;
    }
    const time = getTime();
    const perPage = 10;
    const page = query.nextPage || 1;
    const expectedCount = perPage * page;
    const nextURL = attachPageNumber(query.url, page);
    const nextPromise = this.get(nextURL).then((response) => {
      // append retrieved objects to list
      const total = response.total;
      const freshObjects = response;
      const objects = appendObjects(query.objects, freshObjects);
      query.objects = objects;
      query.promise = nextPromise;
      query.nextPromise = null;
      query.nextPage = (query.nextPage || 1) + 1;
      if (initial) {
        query.time = time;
      }
      this.processFreshObjects(freshObjects, nextURL, query, initial);

      // attach function to results so caller can ask for more results
      if (expectedCount < total && freshObjects.length > 0) {
        objects.more = this.fetchNextPage.bind(this, query, false);
        objects.total = total;

        // if minimum is provide, fetch more if it's not met
        const minimum = getMinimum(query.options, total, NaN);
        if (objects.length < minimum) {
          // fetch the next page
          return this.fetchNextPage(query, false);
        }
      } else {
        objects.more = this.fetchNoMore.bind(this, query);
        objects.total = objects.length;
      }

      // inform parent component that more data is available
      this.notifyChanges(!initial);
      return objects;
    }).catch((err) => {
      if (!initial) {
        query.nextPromise = null;
      }
      throw err;
    });
    if (!initial) {
      query.nextPromise = nextPromise;
    }
    return nextPromise;
  }

  /**
   * Fetch multiple JSON objects. If minimum is specified, then immediately
   * resolve with cached results when there're sufficient numbers of objects.
   * An onChange will be trigger once the full set is retrieved.
   *
   * @param  {String} url
   * @param  {Array<Number|String>} ids
   * @param  {Object} options
   *
   * @return {Promise<Array>}
   */
  fetchMultiple(url, ids, options) {
    const absURL = this.resolveURL(url);
    const byID = {
      ids: [],
      objects: [],
      expired: false,
      urlParam: 'include',
    };
    const bySlug = {
      ids: [],
      objects: [],
      expired: false,
      urlParam: 'slug',
    };
    // look for cached objects from among existing queries
    const cachedObjectHash = {};
    const remaining = ids.slice().filter(Boolean);
    this.scanCachedObjects(absURL, (object, query) => {
      let index = remaining.indexOf(object.id);
      if (index !== -1) {
        cachedObjectHash[object.id] = object;
        if (query.expired) {
          byID.expired = true;
        }
      } else {
        if (object.slug) {
          index = ids.indexOf(object.slug);
          if (index !== -1) {
            cachedObjectHash[object.slug] = object;
            if (query.expired) {
              bySlug.expired = true;
            }
          }
        }
      }
      if (index !== -1) {
        remaining.splice(index, 1);
      }
      if (remaining.length === 0) {
        return false;
      }
    });

    // map ids to cached objects, remembering which one is found by numeric id
    // and which one is found by slug
    let cached = 0;
    const cachedResults = ids.map((id) => {
      const cachedObject = cachedObjectHash[id];
      let byX;
      if (typeof(id) === 'number') {
        byX = byID;
      } else if (typeof(id) === 'string') {
        byX = bySlug;
      }
      if (byX) {
        if (byX.ids.indexOf(id) === -1) {
          byX.ids.push(id);
          if (cachedObject) {
            byX.objects.push(cachedObject);
            cached++;
          }
        }
        return cachedObject || null;
      }
    });

    // create list queries (one usually; two if ids contains a mix of strings and numbers)
    const listPromises = [];
    for (let byX of [ byID, bySlug ]) {
      if (byX.ids.length > 0) {
        const listURL = attachURLParameter(absURL, byX.urlParam, byX.ids);
        const listOptions = {
          pageSize: Math.min(100, byX.ids.length),
          minimum: '100%',
          afterInsert: 'ignore',
          afterUpdate: 'replace',
          afterDelete: 'remove',
        };
        for (let key in options) {
          listOptions[key] = options[key];
        }
        const props = {
          type: 'list',
          url: listURL,
          options: listOptions,
        };
        let query = this.findQuery(props);
        if (!query) {
          query = props;
          if (byX.ids.length === byX.objects.length) {
            // no wait if we have all the objects
            query.promise = Promise.resolve(byX.objects);
            query.expired = byX.expired;
            if (query.expired) {
              this.refreshList(query);
            }
          } else {
            // fetch the first page
            query.promise = this.fetchNextPage(query, true);
          }
          this.queries.push(query);
          listPromises.push(query.promise);
        }
      }
    }

    // create a promise that's fulfiled when the list queries are done
    const completeListPromise = Promise.all(listPromises).then((lists) => {
      const objectHash = {};
      for (let list of lists) {
        for (let object of list) {
          objectHash[object.id] = object;
          if (object.slug) {
            objectHash[object.slug] = object;
          }
        }
      }
      return ids.map(id => objectHash[id] || null);
    });

    // see whether partial result set should be immediately returned
    const minimum = getMinimum(options, ids.length, ids.length);
    if (cached < minimum) {
      return completeListPromise;
    } else {
      // return partial list--the list query will issue change event
      return Promise.resolve(cachedResults);
    }
  }

  scanCachedObjects(absURL, cb) {
    for (let query of this.queries) {
      if (query.type === 'page' || query.type === 'list') {
        const url = omitSearchString(query.url);
        if (url === absURL && query.objects) {
          for (let object of query.objects) {
            const ret = cb(object, query);
            if (ret === false) {
              return;
            }
          }
        }
      }
    }
  }

  /**
   * Reperform an query for an object, triggering an onChange event if the
   * object has changed.
   *
   * @param  {Object} query
   */
  refreshOne(query) {
    if (query.refreshing) {
      return;
    }
    query.refreshing = true;

    const time = getTime();
    this.get(query.url).then((response) => {
      const object = response;
      query.time = time;
      query.refreshing = false;
      query.expired = false;
      if (!matchObject(object, query.object)) {
        query.object = object;
        query.promise = Promise.resolve(object);
        this.processFreshObject(object, query.url, query, false);
        this.notifyChanges();
      }
    }).catch((err) => {
      query.refreshing = false;
    });
  }

  /**
   * Reperform an query for a page of objects, triggering an onChange event if
   * the list is different from the one fetched previously.
   *
   * @param  {Object} query
   */
  refreshPage(query) {
    if (query.refreshing) {
      return;
    }
    query.refreshing = true;

    const time = getTime();
    const pageURL = attachPageNumber(query.url, query.page);
    this.get(pageURL).then((response) => {
      const objects = response;
      const total = response.total;

      // remove other pages (unless they're refreshing)
      const otherQueries = [];
      for (let otherQuery of this.queries) {
        if (otherQuery.url === query.url) {
          if (otherQuery.page !== query.page) {
            if (otherQuery.expired && !otherQuery.refreshing) {
              otherQueries.push(otherQuery);
            }
          }
        }
      }
      pullObjects(this.queries, otherQueries);
      setTimeout(() => {
        for (let { url, page, options } of otherQueries) {
          this.fetchPage(url, page, options);
        }
      }, 1000);

      query.time = time;
      query.refreshing = false;
      query.expired = false;
      const freshObjects = replaceIdentificalObjects(objects, query.objects);
      if (freshObjects) {
        objects.total = total;
        query.objects = objects;
        query.promise = Promise.resolve(objects);
        this.processFreshObjects(freshObjects, pageURL, query, false);
        this.notifyChanges();
      }
    }).catch((err) => {
      query.refreshing = false;
    });
  }

  /**
   * Reperform an query for a list of objects, triggering an onChange event if
   * the list is different from the one fetched previously.
   *
   * @param  {Object} query
   */
  refreshList(query) {
    if (query.refreshing) {
      return;
    }
    query.refreshing = true;

    // updating paginated list
    // wait for any call to more() to finish first
    Promise.resolve(query.nextPromise).then(() => {
      // suppress fetching of additional pages for the time being
      const oldObjects = query.objects || [];
      let morePromise, moreResolve, moreReject;
      const fetchMoreAfterward = () => {
        if (!morePromise) {
          morePromise = new Promise((f1, f2) => {
            moreResolve = f1;
            moreReject = f2;
          });
        }
        return morePromise;
      };
      oldObjects.more = fetchMoreAfterward;

      let refreshedObjects;
      let pageRemaining = query.nextPage - 1;
      let nextPage = 1;
      let nextURL = attachPageNumber(query.url, nextPage);

      const refreshNextPage = () => {
        return this.get(nextURL).then((response) => {
          pageRemaining--;
          nextPage++;
          nextURL = attachPageNumber(query.url, nextPage);
          if (pageRemaining === 0) {
            // set query.nextPage to the URL given by the server
            // in the event that new pages have become available
            query.nextPage = nextPage;
          }
          refreshedObjects = appendObjects(refreshedObjects, response);

          const total = response.total;
          const objects = joinObjectLists(refreshedObjects, oldObjects);
          const freshObjects = replaceIdentificalObjects(objects, query.objects);
          if (freshObjects) {
            objects.total = total;
            objects.more = fetchMoreAfterward;
            query.objects = objects;
            query.promise = Promise.resolve(objects);
            this.processFreshObjects(freshObjects, query.url, query, false);
            this.notifyChanges();
          }

          // keep going until all pages have been updated
          if (query.nextPage !== nextPage) {
            return refreshNextPage();
          }
        });
      };

      const time = getTime();
      refreshNextPage().then(() => {
        // we're done
        query.time = time;
        query.refreshing = false;
        query.expired = false;

        // reenable fetching of additional pages
        if (query.objects.length < query.objects.total) {
          query.objects.more = this.fetchNextPage.bind(this, query, false);
        } else {
          query.objects.more = this.fetchNoMore.bind(this, query);
        }

        // trigger it if more() had been called
        if (morePromise) {
          query.objects.more().then(moreResolve, moreReject);
        }
      }).catch((err) => {
        query.refreshing = false;
      });
    });
  }

  processFreshObject(object, objectURL, excludeQuery, notify) {
    const op = {
      url: getFolderURL(objectURL),
      results: [ object ],
      rejects: [],
      query: excludeQuery,
    };
    const changed = this.runUpdateHooks(op);
    if (notify)  {
      this.notifyChanges(changed);
    }
    return changed;
  }

  processFreshObjects(objects, folderURL, excludeQuery, notify) {
    const op = {
      url: omitSearchString(folderURL),
      results: objects,
      rejects: [],
      query: excludeQuery,
    };
    const changed = this.runUpdateHooks(op);
    if (notify)  {
      this.notifyChanges(changed);
    }
    return changed;
  }

  /**
   * Run afterUpdate hooks
   *
   * @param  {Object} op
   *
   * @return {Boolean}
   */
  runUpdateHooks(op) {
    let changed = false;
    for (let query of this.queries) {
      if (query !== op.query) {
        if (this.runUpdateHook(query, op)) {
          changed = true;
        }
      }
    }
    return changed;
  }

  /**
   * Run a query's afterUpdate hook if its URL matches
   *
   * @param  {Object} query
   * @param  {Object} op
   *
   * @return {Boolean}
   */
  runUpdateHook(query, op) {
    if (query.type === 'object') {
      const defaultBehavior = 'replace';
      const queryFolderURL = getFolderURL(query.url);
      if (queryFolderURL === op.url) {
        if (op.rejects) {
          const rejectedObject = findObject(op.rejects, query.object);
          if (rejectedObject) {
            query.expired = true;
            return true;
          }
        }
        if (op.results) {
          const modifiedObject = findObject(op.results, query.object, true);
          if (modifiedObject) {
            return runHook(query, 'afterUpdate', modifiedObject, defaultBehavior);
          }
        }
      }
    } else if (query.type === 'page' || query.type === 'list') {
      const defaultBehavior = 'refresh';
      const queryFolderURL = omitSearchString(query.url);
      if (queryFolderURL === op.url) {
        if (op.rejects) {
          const rejectedObjects = findObjects(op.rejects, query.objects);
          if (rejectedObjects) {
            query.expired = true;
            return true;
          }
        }
        if (op.results) {
          const modifiedObjects = findObjects(op.results, query.objects, true);
          if (modifiedObjects) {
            return runHook(query, 'afterUpdate', modifiedObjects, defaultBehavior);
          }
        }
      }
    }
    return false;
  }

  /**
   * Mark matching queries as expired
   *
   * @param  {String|Date} time
   *
   * @return {Boolean}
   */
  invalidate(time) {
    if (time instanceof Date) {
      time = time.toISOString();
    }
    let changed = false;
    for (let query of this.queries) {
      if (!query.expired) {
        if (!time || query.time <= time) {
          query.expired = true;
          changed = true;
        }
      }
    }
    return this.notifyChanges(changed);
  }

  /**
   * Find an existing query
   *
   * @param  {Object} props
   *
   * @return {Object|undefined}
   */
  findQuery(props) {
    return this.queries.find(query => matchQuery(query, props));
  }

  /**
   * Start expiration checking
   */
  startExpirationCheck() {
    const { refreshInterval } = this.options;
    if (refreshInterval > 0) {
      if (!this.expirationCheckInterval) {
        this.expirationCheckInterval = setInterval(() => {
          this.checkExpiration();
        }, Math.min(100, refreshInterval / 10));
      }
    }
  }

  /**
   * Stop expiration checking
   */
  stopExpirationCheck() {
    if (this.expirationCheckInterval) {
      clearInterval(this.expirationCheckInterval);
      this.expirationCheckInterval = 0;
    }
  }

  /**
   * Mark queries as expired and trigger onChange event when enough time has passed
   */
  checkExpiration() {
    const interval = Number(this.options.refreshInterval);
    if (interval) {
      const time = getTime(-interval);
      this.invalidate(time);
    }
  }

  /**
   * Perform an HTTP GET operation
   *
   * @param  {String} url
   *
   * @return {Promise<Object>}
   */
  get(url) {
    const options = {
      method: 'GET',
    };
    return this.request(url, options);
  }

  /**
   * Perform an HTTP request
   *
   * @param  {String} url
   * @param  {Object} options
   *
   * @return {Promise}
   */
  request(url, options) {
    if (!options) {
      options = {};
    }
    return this.fetch(url, options).then((response) => {
      const { status, statusText } = response;
      if (status < 400) {
        if (status == 204) {
          return null;
        }
        const total = parseInt(response.headers.get('X-WP-Total'));
        return response.json().then((objects) => {
          if (objects instanceof Array && total === total) {
            objects.total = total;
          }
          return objects;
        });
      } else {
        throw new DataSourceError(status, statusText);
      }
    });
  }

  /**
   * Wait for active to become true then run fetch()
   *
   * @type {Promise<Response>}
   */
  fetch(url, options) {
    return this.waitForActivation().then(() => {
      let { fetchFunc } = this.options;
      if (!fetchFunc) {
        fetchFunc = fetch;
      }
      return fetchFunc(url, options).catch((err) => {
        // try again if the data source was deactivated in the middle of
        // an operation
        if (!this.active) {
          return this.fetch(url, options);
        } else {
          throw err;
        }
      });
    });
  }

  /**
   * If this.active is false, wait for it to become true
   *
   * @return {Promise}
   */
  waitForActivation() {
    if (this.active) {
      return Promise.resolve();
    }
    if (!this.activationPromise) {
      let resolve, reject;
      this.activationPromise = new Promise((f1, f2) => {
        resolve = f1;
        reject = f2;
      });
      this.activationPromise.resolve = resolve;
      this.activationPromise.reject = reject;

      if (process.env.NODE_ENV !== 'production') {
        console.log('Waiting for activate() to be called...');
      }
    }
    return this.activationPromise;
  }
}

/**
 * Run hook function on an cached fetch query after an insert, update, or
 * delete operation. Return true when query is changed.
 *
 * @param  {Object} query
 * @param  {String} hookName
 * @param  {Array<Object>|Object} input
 * @param  {String} defaultBehavior
 *
 * @return {Boolean}
 */
function runHook(query, hookName, input, defaultBehavior) {
  let hookFunc = (query.options) ? query.options[hookName] : null;
  if (!hookFunc) {
    hookFunc = defaultBehavior;
  }
  if (typeof(hookFunc) === 'string') {
    switch (hookFunc) {
      case 'refresh':
        hookFunc = refreshQuery;
        break;
      case 'ignore':
        hookFunc = ignoreChange;
        break;
      default:
        switch (query.type + '::' + hookFunc) {
          case 'object::replace':
            hookFunc = replaceObject;
            break;
          case 'list::replace':
          case 'page::replace':
            hookFunc = replaceObjects;
            break;
          case 'list::unshift':
          case 'page::unshift':
            hookFunc = unshiftObjects;
            break;
          case 'list::push':
          case 'page::push':
            hookFunc = pushObjects;
            break;
          case 'object::remove':
            hookFunc = removeObject;
            break;
          case 'list::remove':
          case 'page::remove':
            hookFunc = removeObjects;
            break;
          default:
            if (process.env.NODE_ENV !== 'production') {
              console.warn('Unknown hook "' + hookFunc + '"');
            }
            hookFunc = refreshQuery;
        }
    }
  }
  if (query.type === 'object') {
    // refresh the query if anything is amiss
    let impact = true;
    if (query.object && input) {
      try {
        impact = hookFunc(query.object, input);
      } catch (err) {
        console.error(err);
      }
    }
    if (impact === false) {
      return false;
    }
    if (impact instanceof Object) {
      query.object = impact;
      query.promise = Promise.resolve(impact);
    } else {
      query.expired = true;
    }
    return true;
  } else if (query.type === 'page' || query.type === 'list') {
    let impact = true;
    if (query.objects && input.every(Boolean)) {
      // sort list by ID or URL
      sortObjects(input);
      try {
        impact = hookFunc(query.objects, input);
      } catch (err) {
        console.error(err);
      }
    }
    if (impact === false) {
      return false;
    }
    if (impact instanceof Array) {
      const objects = impact;
      if (query.type === 'list') {
        // update the total
        const diff = objects.length - query.objects.length;
        objects.total = query.objects.total + diff;

        if (query.type === 'list') {
          // restore more function
          objects.more = query.objects.more;
        }
      }
      query.objects = objects;
      query.promise = Promise.resolve(objects);
    } else {
      query.expired = true;
    }
    return true;
  }
}

/**
 * Return false to indicate that change should be ignored
 *
 * @return {false}
 */
function ignoreChange() {
  return false;
}

/**
 * Return true to indicate that query should be rerun
 *
 * @return {true}
 */
function refreshQuery() {
  return true;
}

/**
 * Return the new object
 *
 * @param  {Object} object
 * @param  {Object} newObject
 *
 * @return {Object|false}
 */
function replaceObject(object, newObject) {
  if (!matchObject(newObject, object)) {
    return newObject;
  }
  return false;
}

/**
 * Replace old version of objects with new ones
 *
 * @param  {Array<Object>]} objects
 * @param  {Array<Object>} newObjects
 *
 * @return {Array<Object>|false}
 */
function replaceObjects(objects, newObjects) {
  let changed = false;
  const newList = [];
  for (let object of objects) {
    const newObject = findObject(newObjects, object);
    if (newObject) {
      if (!matchObject(newObject, object)) {
        changed = true;
        object = newObject;
      }
    }
    newList.push(object);
  }
  return (changed) ? newList : false;
}

/**
 * Add new objects at beginning of list
 *
 * @param  {Array<Object>} objects
 * @param  {Array<Object>} newObjects
 *
 * @return {Array<Object>|false}
 */
function unshiftObjects(objects, newObjects) {
  const newList = objects.slice();
  for (let object of newObjects) {
    newList.unshift(object);
  }
  return newList;
}

/**
 * Add new objects at end of list
 *
 * @param  {Array<Object>} objects
 * @param  {Array<Object>} newObjects
 *
 * @return {Array<Object>|false}
 */
function pushObjects(objects, newObjects) {
  const newList = objects.slice();
  for (let object of newObjects) {
    newList.push(object);
  }
  return newList;
}

/**
 * Return true to indicate that query should be removed
 *
 * @param  {Object} object
 * @param  {Object} deletedObject
 *
 * @return {true}
 */
function removeObject(object, deletedObject) {
  return true;
}

/**
 * Remove objects from list
 *
 * @param  {Array<Object>} objects
 * @param  {Array<Object>} deletedObjects
 *
 * @return {Array<Object>|false}
 */
function removeObjects(objects, deletedObjects) {
  let changed = false;
  const newList = [];
  for (let object of objects) {
    if (findObjectIndex(deletedObjects, object) === -1) {
      newList.push(object);
    } else {
      changed = true;
    }
  }
  return (changed) ? newList : false;
}

/**
 * See if a query has the given properties
 *
 * @param  {Object} query
 * @param  {Object} props
 *
 * @return {Boolean}
 */
function matchQuery(query, props) {
  for (let name in props) {
    if (!matchObject(query[name], props[name])) {
      return false;
    }
  }
  return true;
}

/**
 * See if two objects are identical
 *
 * @param  {*} object1
 * @param  {*} object2
 *
 * @return {Boolean}
 */
function matchObject(object1, object2) {
  if (object1 !== object2) {
    if (object1 instanceof Object && object2 instanceof Object) {
      if (object1.constructor !== object2.constructor) {
        return false;
      }
      if (object1 instanceof Array) {
        if (object1.length !== object2.length) {
          return false;
        }
        for (let i = 0; i < object1.length; i++) {
          if (!matchObject(object1[i], object2[i])) {
            return false;
          }
        }
      } else if (object1 instanceof Function) {
        if (object1.toString() !== object2.toString()) {
          return false;
        }
      } else {
        for (let name in object1) {
          if (!matchObject(object1[name], object2[name])) {
            return false;
          }
        }
        for (let name in object2) {
          if (!(name in object1)) {
            return false;
          }
        }
      }
    } else {
      return false;
    }
  }
  return true;
}

/**
 * Remove trailing slash from URL
 *
 * @param  {String} url
 *
 * @return {String}
 */
function removeTrailingSlash(url) {
  const lc = url.charAt(url.length - 1);
  if (lc === '/') {
    url = url.substr(0, url.length - 1);
  }
  return url;
}

/**
 * Add leading slash to URL
 *
 * @param  {String} url
 *
 * @return {String}
 */
function addLeadingSlash(url) {
  const fc = url.charAt(0);
  if (fc !== '/') {
    url = '/' + url;
  }
  return url;
}

function addTrailingSlash(url) {
  const qi = url.indexOf('?');
  let query;
  if (qi !== -1) {
    query = url.substr(qi);
    url = url.substr(0, qi);
  }
  const lc = url.charAt(url.length - 1);
  if (lc !== '/') {
    url += '/';
  }
  if (query) {
    url += query;
  }
  return url;
}

/**
 * Return the URL of the parent folder
 *
 * @param  {String} url
 *
 * @return {String|undefined}
 */
function getFolderURL(url) {
  let ei = url.lastIndexOf('/');
  if (ei === url.length - 1) {
    ei = url.lastIndexOf('/', ei - 1);
  }
  if (ei !== -1) {
    return url.substr(0, ei + 1);
  }
}

/**
 * Append the variable "page" to a URL's query, unless page equals 1.
 *
 * @param  {String} url
 * @param  {Number} page
 *
 * @return {String}
 */
function attachPageNumber(url, page) {
  return attachURLParameter(url, 'page', page || 1);
}

function attachURLParameter(url, name, value) {
  const qi = url.indexOf('?');
  const sep = (qi === -1) ? '?' : '&';
  let assignments;
  if (value instanceof Array && value.length === 1) {
    value = value[0];
  }
  if (value instanceof Array) {
    assignments = value.map((value) => `${name}[]=${encodeURI(value)}`).join('&');
  } else {
    assignments = `${name}=${encodeURI(value)}`;
  }
  return url + sep + assignments;
}

function omitSearchString(url) {
  const qi = url.lastIndexOf('?');
  if (qi !== -1) {
    url = url.substr(0, qi);
  }
  return url;
}

/**
 * Find the position of an object in an array based on id or URL. Return -1 if
 * the object is not there.
 *
 * @param  {Array<Object>} list
 * @param  {Object} object
 *
 * @return {Number}
 */
function findObjectIndex(list, object) {
  const keyA = object.id;
  for (var i = 0; i < list.length; i++) {
    const keyB = list[i].id;
    if (keyA === keyB) {
      return i;
    }
  }
  return -1;
}

/**
 * Find an object in a list based on id or URL
 *
 * @param  {Array<Object>} list
 * @param  {Object} object
 * @param  {Boolean|undefined} different
 *
 * @return {Object|undefined}
 */
function findObject(list, object, different) {
  if (object) {
    const index = findObjectIndex(list, object);
    if (index !== -1) {
      const objectFound = list[index];
      if (different) {
        // allow object to have fewer properties than those in
        // the list
        for (let name in object) {
          if (!matchObject(object[name], objectFound[name])) {
            return objectFound;
          }
        }
      } else {
        return objectFound;
      }
    }
  }
}

/**
 * Find objects in a list
 *
 * @param  {Array<Object>} list
 * @param  {Array<Object>} objects
 * @param  {Boolean|undefined} different
 *
 * @return {Array<Object>|undefined}
 */
function findObjects(list, objects, different) {
  if (objects) {
    const found = [];
    for (let object of objects) {
      const objectFound = findObject(list, object, different);
      if (objectFound) {
        found.push(objectFound);
      }
    }
    if (found.length > 0) {
      return found;
    }
  }
}

/**
 * Clone an object
 *
 * @param  {*} src
 *
 * @return {*}
 */
function cloneObject(src) {
  if (src instanceof Array) {
    return src.map(obj => cloneObject(obj));
  } else if (src instanceof Object) {
    const dst = {};
    for (let name in src) {
      dst[name] = cloneObject(src[name]);
    }
    return dst;
  } else {
    return src;
  }
}

/**
 * Sort a list of objects based on ID or URL
 *
 * @param  {Array<Object>} list
 */
function sortObjects(list) {
  list.sort((a, b) => {
    const keyA = a.id;
    const keyB = b.id;
    if (keyA < keyB) {
      return -1;
    } else if (keyA > keyB) {
      return +1;
    } else {
      return 0;
    }
  });
}

/**
 * Append objects to a list, removing any duplicates first
 *
 * @param  {Array<Object>} list
 * @param  {Array<Object>} objects
 *
 * @return {Array<Object>}
 */
function appendObjects(list, objects) {
  if (!list) {
    return objects;
  } else {
    const duplicates = [];
    for (let object of objects) {
      if (findObjectIndex(list, object) !== -1) {
        duplicates.push(object);
      }
    }
    pullObjects(list, duplicates);
    return list.concat(objects);
  }
}

/**
 * Replace objects in newList that are identical to their counterpart in oldList.
 * Return objects that are not found in the old list or undefined if there are
 * no change
 *
 * @param  {Array<Object>} newList
 * @param  {Array<Object>} oldList
 *
 * @return {Array<Object>|undefined}
 */
function replaceIdentificalObjects(newList, oldList) {
  const freshObjects = [];
  let changed = false;
  for (let i = 0; i < newList.length; i++) {
    const oldIndex = findObjectIndex(oldList, newList[i]);
    if (oldIndex !== -1) {
      if (matchObject(newList[i], oldList[oldIndex])) {
        newList[i] = oldList[oldIndex];
        if (i !== oldIndex) {
          changed = true;
        }
      } else {
        freshObjects.push(newList[i]);
        changed = true;
      }
    } else {
      freshObjects.push(newList[i]);
      changed = true;
    }
  }
  if (changed) {
    return freshObjects;
  }
}

/**
 * Attach objects from an older list to a new list that's being retrieved.
 *
 * @param  {Array<Object>} newList
 * @param  {Array<Object>} oldList
 *
 * @return {Array<Object>}
 */
function joinObjectLists(newList, oldList) {
  // find point where the two list intersect
  let startIndex = 0;
  for (let i = newList.length - 1; i >= 0; i--) {
    const newObject = newList[i];
    const oldIndex = findObjectIndex(oldList, newObject);
    if (oldIndex !== -1) {
      startIndex = oldIndex + 1;
      break;
    }
  }
  // don't add objects ahead of the intersection from the old list or
  // objects that are present in the new list (due to change in order)
  const oldObjects = [];
  for (let [ index, object ] of oldList) {
    if (index >= startIndex) {
      if (findObjectIndex(newList, object) === -1) {
        oldObjects.push(object);
      }
    }
  }
  return newList.concat(oldObjects);
}

/**
 * Get parameter 'minimum' from options. If it's a percent, then calculate the
 * minimum object count based on total. If it's negative, substract the value
 * from the total.
 *
 * @param  {Object} options
 * @param  {Number} total
 * @param  {Number} def
 *
 * @return {Number}
 */
function getMinimum(options, total, def) {
  let minimum = (options) ? options.minimum : undefined;
  if (typeof(minimum) === 'string') {
    minimum = minimum.trim();
    if (minimum.charAt(minimum.length - 1) === '%') {
      const percent = parseInt(minimum);
      minimum = Math.ceil(total * (percent / 100));
    }
  }
  if (minimum < 0) {
    minimum = total + minimum;
    if (minimum < 1) {
      minimum = 1;
    }
  }
  return minimum || def;
}

/**
 * Return the current time in ISO format, adding a delta optionally
 *
 * @param  {Number|undefined} delta
 *
 * @return {String}
 */
function getTime(delta) {
  let date = new Date;
  if (delta) {
    date = new Date(date.getTime() + delta);
  }
  return date.toISOString();
}

/**
 * Remove objects from the given array
 *
 * @param  {Array} list
 * @param  {Array} objects
 */
function pullObjects(list, objects) {
  if (objects instanceof Array) {
    for (let object of objects) {
      const index = list.indexOf(object);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }
  }
}

export {
  RelaksWordpressDataSource,
  RelaksWordpressDataSource as DataSource,
};
