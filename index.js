var EventEmitter = require('relaks-event-emitter');
var GenericEvent = EventEmitter.GenericEvent;

var defaultOptions = {
    baseURL: '',
    permalinks: true,
    refreshInterval: 0,
    authorizationKeyword: 'Token',
    abbreviatedFolderContents: false,
    fetchFunc: null,
};

function RelaksWordpressDataSource(options) {
    EventEmitter.call(this);
    this.active = false;
    this.activationPromise = null;
    this.queries = [];
    this.authentications = [];
    this.authorizations = [];
    this.options = {};
    for (var name in defaultOptions) {
        if (options && options[name] !== undefined) {
            this.options[name] = options[name];
        } else {
            this.options[name] = defaultOptions[name];
        }
    }
}

var prototype = RelaksWordpressDataSource.prototype = Object.create(EventEmitter.prototype)

/**
 * Activate the component
 */
prototype.activate = function() {
    if (!this.active) {
        this.active = true;
        if (this.activationPromise) {
            var resolve = this.activationPromise.resolve;
            this.activationPromise = null;
            resolve();
        }
        this.startExpirationCheck();
        this.checkExpiration();
    }
};

/**
 * Activate the component
 */
prototype.deactivate = function() {
    if (this.active) {
        this.stopExpirationCheck();
        this.active = false;
    }
};

/**
 * Add baseURL to relative URL
 *
 * @param  {String} url
 *
 * @return {String}
 */
prototype.resolveURL = function(url) {
    if (typeof(url) !== 'string') {
        return url;
    }
    var baseURL = this.options.baseURL;
    if (baseURL && !/^https?:/.test(url)) {
        if (!/^https?:/.test(baseURL)) {
            if (typeof(location) === 'object') {
                baseURL = location.protocol + '//' + location.host + baseURL;
            } else {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn('Base URL is not absolute');
                }
            }
        }

        var permalinks = this.options.permalinks;
        if (permalinks) {
            url = removeTrailingSlash(baseURL) + addLeadingSlash(url);
        } else {
            url = baseURL + '?rest_route=' + encodeURI(url);
        }
    }
    return addTrailingSlash(url);
};

/**
 * Resolve a list of URLs
 *
 * @param  {Array<String>} urls
 *
 * @return {Array<String>}
 */
prototype.resolveURLs = function(urls) {
    var _this = this;
    return urls.map(function(url) {
        return _this.resolveURL(url);
    });
};

/**
 * Trigger a 'change' event unless changed is false
 *
 * @param  {Boolean} changed
 *
 * @return {Boolean}
 */
prototype.notifyChanges = function(changed) {
    if (changed === false) {
        return false;
    }
    this.triggerEvent(new RelaksWordpressDataSourceEvent('change', this));
    return true;
};

/**
 * Fetch one object at the URL.
 *
 * @param  {String} url
 * @param  {Number|String|undefined} id
 * @param  {Object|undefined} options
 *
 * @return {Promise<Object>}
 */
prototype.fetchOne = function(url, id, options) {
    if (id) {
        return this.fetchMultiple(url, [ id ], options).then(function(objects) {
            return objects[0] || null;
        });
    } else {
        var _this = this;
        var absURL = this.resolveURL(url);
        var props = {
            type: 'object',
            url: absURL,
            options: options || {},
        };
        var query = this.findQuery(props);
        if (!query) {
            var time = getTime();
            query = props;
            query.promise = this.get(absURL).then(function(response) {
                var object = response;
                query.object = object;
                query.time = time;
                _this.processFreshObject(object, absURL, query, true);
                return object;
            });
            this.queries.unshift(query);
        }
        return query.promise.then(function(object) {
            if (query.expired)  {
                _this.refreshOne(query);
            }
            return object;
        });
    }
};

/**
 * Fetch a page of objects
 *
 * @param  {String} url
 * @param  {Number} page
 * @param  {Object|undefined} options
 *
 * @return {Promise<Array>}
 */
prototype.fetchPage = function(url, page, options) {
    var _this = this;
    var absURL = this.resolveURL(url);
    var props = {
        type: 'page',
        url: absURL,
        page: page,
        options: options || {},
    };
    var query = this.findQuery(props);
    if (!query) {
        var pageURL = attachPageNumber(absURL, page);
        var time = getTime();
        query = props;
        query.promise = this.get(pageURL).then(function(response) {
            var objects = response;
            query.objects = objects;
            query.time = time;
            _this.processFreshObjects(objects, pageURL, query, true);
            return objects;
        });
        this.queries.push(query);
    }
    return query.promise.then(function(objects) {
        if (query.expired)  {
            _this.refreshPage(query);
        }
        return objects;
    });
};

/**
 * Fetch a list of objects at the given URL.
 *
 * @param  {String} url
 * @param  {Object} options
 *
 * @return {Promise<Array>}
 */
prototype.fetchList = function(url, options) {
    var _this = this;
    var absURL = this.resolveURL(url);
    var props = {
        type: 'list',
        url: absURL,
        options: options || {},
    };
    var query = this.findQuery(props);
    if (!query) {
        query = props;
        query.promise = this.fetchNextPage(query, true);
        this.queries.push(query);
    }
    return query.promise.then(function(objects) {
        if (query.expired)  {
            _this.refreshList(query);
        }
        return objects;
    });
};

/**
 * Return what has been fetched. Used by fetchList().
 *
 * @param  {Object} query
 *
 * @return {Promise<Array>}
 */
prototype.fetchNoMore = function(query) {
    return query.promise;
};

/**
 * Initiate fetching of the next page. Used by fetchList().
 *
 * @param  {Object} query
 * @param  {Boolean} initial
 *
 * @return {Promise<Array>}
 */
prototype.fetchNextPage = function(query, initial) {
    if (query.nextPromise) {
        return query.nextPromise;
    }
    var _this = this;
    var time = getTime();
    var nextURL = attachPageNumber(query.url, query.nextPage);
    var nextPromise = this.get(nextURL).then(function(response) {
        // append retrieved objects to list
        var total = response.total;
        var freshObjects = response;
        var objects = appendObjects(query.objects, freshObjects);
        query.objects = objects;
        query.promise = nextPromise;
        query.nextPromise = null;
        query.nextPage = (query.nextPage || 1) + 1;
        if (initial) {
            query.time = time;
        }
        _this.processFreshObjects(freshObjects, nextURL, query, initial);

        // attach function to results so caller can ask for more results
        if (objects.length < total && freshObjects.length > 0) {
            objects.more = _this.fetchNextPage.bind(_this, query, false);
            objects.total = total;

            // if minimum is provide, fetch more if it's not met
            var minimum = getMinimum(query.options, total, NaN);
            if (objects.length < minimum) {
                // fetch the next page
                return _this.fetchNextPage(query, false);
            }
        } else {
            objects.more = _this.fetchNoMore.bind(_this, query);
            objects.total = objects.length;
        }

        // inform parent component that more data is available
        _this.notifyChanges(!initial);
        return objects;
    }).catch(function(err) {
        if (!initial) {
            query.nextPromise = null;
        }
        throw err;
    });
    if (!initial) {
        query.nextPromise = nextPromise;
    }
    return nextPromise;
};

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
prototype.fetchMultiple = function(url, ids, options) {
    var _this = this;
    var absURL = this.resolveURL(url);
    var byID = {
        ids: [],
        objects: [],
        expired: false,
        urlParam: 'include',
    };
    var bySlug = {
        ids: [],
        objects: [],
        expired: false,
        urlParam: 'slug',
    };
    // look for cached objects from among existing queries
    var cachedObjectHash = {};
    var remaining = ids.slice().filter(Boolean);
    this.scanCachedObjects(absURL, function(object, query) {
        var index = remaining.indexOf(object.id);
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
    var cached = 0;
    var cachedResults = ids.map(function(id) {
        var cachedObject = cachedObjectHash[id];
        var byX;
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
    var listPromises = [ byID, bySlug ].map(function(byX) {
        if (byX.ids.length === 0) {
            return null;
        }
        var listURL = attachURLParameter(absURL, byX.urlParam, byX.ids);
        var listOptions = {
            pageSize: Math.min(100, byX.ids.length),
            minimum: '100%',
            afterInsert: 'ignore',
            afterUpdate: 'replace',
            afterDelete: 'remove',
        };
        for (var key in options) {
            listOptions[key] = options[key];
        }
        var props = {
            type: 'list',
            url: listURL,
            options: listOptions,
        };
        var query = _this.findQuery(props);
        if (!query) {
            query = props;
            if (byX.ids.length === byX.objects.length) {
                // no wait if we have all the objects
                query.promise = Promise.resolve(byX.objects);
                query.expired = byX.expired;
                if (query.expired) {
                    _this.refreshList(query);
                }
            } else {
                // fetch the first page
                query.promise = _this.fetchNextPage(query, true);
            }
            _this.queries.push(query);
        }
        return query.promise;
    });

    // create a promise that's fulfiled when the list queries are done
    var completeListPromise = Promise.all(listPromises).then(function(lists) {
        var objectHash = {};
        lists.forEach(function(list) {
            if (list) {
                list.forEach(function(object) {
                    objectHash[object.id] = object;
                    if (object.slug) {
                        objectHash[object.slug] = object;
                    }
                });
            }
        });
        return ids.map(function(id) {
            return objectHash[id] || null;
        });
    });

    // see whether partial result set should be immediately returned
    var minimum = getMinimum(options, ids.length, ids.length);
    if (cached < minimum) {
        return completeListPromise;
    } else {
        // return partial list--the list query will issue change event
        return Promise.resolve(cachedResults);
    }
};

prototype.scanCachedObjects = function(absURL, cb) {
    for (var i = 0; i < this.queries.length; i++) {
        var query = this.queries[i];
        if (query.type === 'page' || query.type === 'list') {
            var url = omitSearchString(query.url);
            if (url === absURL && query.objects) {
                for (var j = 0; j < query.objects.length; j++) {
                    var object = query.objects[j];
                    var ret = cb(object, query);
                    if (ret === false) {
                        return;
                    }
                }
            }
        }
    }
};

/**
 * Reperform an query for an object, triggering an onChange event if the
 * object has changed.
 *
 * @param  {Object} query
 */
prototype.refreshOne = function(query) {
    if (query.refreshing) {
        return;
    }
    query.refreshing = true;

    var _this = this;
    var time = getTime();
    this.get(query.url).then(function(response) {
        var object = response;
        query.time = time;
        query.refreshing = false;
        query.expired = false;
        if (!matchObject(object, query.object)) {
            query.object = object;
            query.promise = Promise.resolve(object);
            _this.processFreshObject(object, query.url, query, false);
            _this.notifyChanges();
        }
    }).catch(function(err) {
        query.refreshing = false;
    });
};

/**
 * Reperform an query for a page of objects, triggering an onChange event if
 * the list is different from the one fetched previously.
 *
 * @param  {Object} query
 */
prototype.refreshPage = function(query) {
    if (query.refreshing) {
        return;
    }
    query.refreshing = true;

    var _this = this;
    var time = getTime();
    var pageURL = attachPageNumber(query.url, query.page);
    this.get(pageURL).then(function(response) {
        var objects = response;
        var total = response.total;

        // remove other pages (unless they're refreshing)
        var otherQueries = [];
        _this.queries = _this.queries.filter(function(otherQuery) {
            if (otherQuery.url === query.url) {
                if (otherQuery.page !== query.page) {
                    if (otherQuery.expired && !otherQuery.refreshing) {
                        otherQueries.push(otherQuery);
                        return false;
                    }
                }
            }
            return true;
        });
        setTimeout(function() {
            otherQueries.forEach(function(otherQuery) {
                _this.fetchPage(otherQuery.url, otherQuery.page, otherQuery.options);
            });
        }, 1000);

        query.time = time;
        query.refreshing = false;
        query.expired = false;
        var freshObjects = replaceIdentificalObjects(objects, query.objects);
        if (freshObjects) {
            objects.total = total;
            query.objects = objects;
            query.promise = Promise.resolve(objects);
            _this.processFreshObjects(freshObjects, pageURL, query, false);
            _this.notifyChanges();
        }
    }).catch(function(err) {
        query.refreshing = false;
    });
};

/**
 * Reperform an query for a list of objects, triggering an onChange event if
 * the list is different from the one fetched previously.
 *
 * @param  {Object} query
 */
prototype.refreshList = function(query) {
    if (query.refreshing) {
        return;
    }
    query.refreshing = true;

    var _this = this;
    // updating paginated list
    // wait for any call to more() to finish first
    (query.nextPromise || Promise.resolve()).then(function() {
        // suppress fetching of additional pages for the time being
        var oldObjects = query.objects;
        var morePromise, moreResolve, moreReject;
        var fetchMoreAfterward = function() {
            if (!morePromise) {
                morePromise = new Promise(function(resolve, reject) {
                    moreResolve = resolve;
                    moreReject = reject;
                });
            }
            return morePromise;
        };
        oldObjects.more = fetchMoreAfterward;

        var refreshedObjects;
        var pageRemaining = query.nextPage - 1;
        var nextURL = query.url;
        var nextPage = 1;

        var refreshNextPage = function() {
            return _this.get(nextURL).then(function(response) {
                pageRemaining--;
                nextPage++;
                nextURL = attachPageNumber(query.url, nextPage);
                if (pageRemaining === 0) {
                    // set query.nextPage to the URL given by the server
                    // in the event that new pages have become available
                    query.nextPage = nextPage;
                }
                refreshedObjects = appendObjects(refreshedObjects, response);

                var total = response.total;
                var objects = joinObjectLists(refreshedObjects, oldObjects);
                var freshObjects = replaceIdentificalObjects(objects, query.objects);
                if (freshObjects) {
                    objects.total = total;
                    objects.more = fetchMoreAfterward;
                    query.objects = objects;
                    query.promise = Promise.resolve(objects);
                    _this.processFreshObjects(freshObjects, query.url, query, false);
                    _this.notifyChanges();
                }

                // keep going until all pages have been updated
                if (query.nextPage !== nextPage) {
                    return refreshNextPage();
                }
            });
        };

        var time = getTime();
        refreshNextPage().then(function() {
            // we're done
            query.time = time;
            query.refreshing = false;
            query.expired = false;

            // reenable fetching of additional pages
            if (query.objects.length < query.objects.total) {
                query.objects.more = _this.fetchNextPage.bind(_this, query, false);
            } else {
                query.objects.more = _this.fetchNoMore.bind(_this, query);
            }

            // trigger it if more() had been called
            if (morePromise) {
                query.objects.more().then(moreResolve, moreReject);
            }
        }).catch(function(err) {
            query.refreshing = false;
        });
    });
};

prototype.processFreshObject = function(object, objectURL, excludeQuery, notify) {
    var op = {
        url: getFolderURL(objectURL),
        results: [ object ],
        rejects: [],
        query: excludeQuery,
    };
    var changed = this.runUpdateHooks(op);
    if (notify)  {
        this.notifyChanges(changed);
    }
    return changed;
};

prototype.processFreshObjects = function(objects, folderURL, excludeQuery, notify) {
    var op = {
        url: omitSearchString(folderURL),
        results: objects,
        rejects: [],
        query: excludeQuery,
    };
    var changed = this.runUpdateHooks(op);
    if (notify)  {
        this.notifyChanges(changed);
    }
    return changed;
};

/**
 * Run afterUpdate hooks
 *
 * @param  {Object} op
 *
 * @return {Boolean}
 */
prototype.runUpdateHooks = function(op) {
    var _this = this;
    var changed = false;
    this.queries.forEach(function(query) {
        if (query !== op.query) {
            if (_this.runUpdateHook(query, op)) {
                changed = true;
            }
        }
    });
    return changed;
};

/**
 * Run a query's afterUpdate hook if its URL matches
 *
 * @param  {Object} query
 * @param  {Object} op
 *
 * @return {Boolean}
 */
prototype.runUpdateHook = function(query, op) {
    if (query.type === 'object') {
        var defaultBehavior = 'replace';
        var queryFolderURL = getFolderURL(query.url);
        if (queryFolderURL === op.url) {
            if (op.rejects) {
                var rejectedObject = findObject(op.rejects, query.object);
                if (rejectedObject) {
                    query.expired = true;
                    return true;
                }
            }
            if (op.results) {
                var modifiedObject = findObject(op.results, query.object, true);
                if (modifiedObject) {
                    return runHook(query, 'afterUpdate', modifiedObject, defaultBehavior);
                }
            }
        }
    } else if (query.type === 'page' || query.type === 'list') {
        var defaultBehavior = 'refresh';
        var queryFolderURL = omitSearchString(query.url);
        if (queryFolderURL === op.url) {
            if (op.rejects) {
                var rejectedObjects = findObjects(op.rejects, query.objects);
                if (rejectedObjects) {
                    query.expired = true;
                    return true;
                }
            }
            if (op.results) {
                var modifiedObjects = findObjects(op.results, query.objects, true);
                if (modifiedObjects) {
                    return runHook(query, 'afterUpdate', modifiedObjects, defaultBehavior);
                }
            }
        }
    }
    return false;
};

/**
 * Mark matching queries as expired
 *
 * @param  {String|Date} time
 *
 * @return {Boolean}
 */
prototype.invalidate = function(time) {
    if (time instanceof Date) {
        time = time.toISOString();
    }
    var changed = false;
    this.queries.forEach(function(query) {
        if (query.expired) {
            return;
        }
        if (!time || query.time <= time) {
            query.expired = true;
            changed = true;
        }
    });
    return this.notifyChanges(changed);
};

/**
 * Find an existing query
 *
 * @param  {Object} props
 *
 * @return {Object|undefined}
 */
prototype.findQuery = function(props) {
    return this.queries.find(function(query) {
        return matchQuery(query, props);
    });
};

/**
 * Start expiration checking
 */
prototype.startExpirationCheck = function() {
    var refreshInterval = this.options.refreshInterval;
    if (refreshInterval > 0) {
        if (!this.expirationCheckInterval) {
            var _this = this;
            this.expirationCheckInterval = setInterval(function() {
                _this.checkExpiration();
            }, Math.min(100, refreshInterval / 10));
        }
    }
};

/**
 * Stop expiration checking
 */
prototype.stopExpirationCheck = function() {
    if (this.expirationCheckInterval) {
        clearInterval(this.expirationCheckInterval);
        this.expirationCheckInterval = 0;
    }
};

/**
 * Mark queries as expired and trigger onChange event when enough time has passed
 */
prototype.checkExpiration = function() {
    var interval = Number(this.options.refreshInterval);
    if (!interval) {
        return;
    }
    var time = getTime(-interval);
    this.invalidate(time);
};

/**
 * Perform an HTTP GET operation
 *
 * @param  {String} url
 *
 * @return {Promise<Object>}
 */
prototype.get = function(url) {
    var options = {
        method: 'GET',
    };
    return this.request(url, options);
};

/**
 * Perform an HTTP request
 *
 * @param  {String} url
 * @param  {Object} options
 *
 * @return {Promise}
 */
prototype.request = function(url, options) {
    var _this = this;
    if (!options) {
        options = {};
    }
    return this.fetch(url, options).then(function(response) {
        if (response.status < 400) {
            if (response.status == 204) {
                return null;
            }
            var total = parseInt(response.headers.get('X-WP-Total'));
            return response.json().then(function(objects) {
                if (objects instanceof Array && total === total) {
                    objects.total = total;
                }
                return objects;
            });
        } else {
            throw new RelaksWordpressDataSourceError(response.status, response.statusText);
        }
    });
};

/**
 * Wait for active to become true then run fetch()
 *
 * @type {Promise<Response>}
 */
prototype.fetch = function(url, options) {
    var _this = this;
    return this.waitForActivation().then(function() {
        var f = _this.options.fetchFunc;
        if (!f) {
            f = fetch;
        }
        return f(url, options).catch(function(err) {
            // try again if the data source was deactivated in the middle of
            // an operation
            if (!_this.active) {
                return _this.fetch(url, options);
            } else {
                throw err;
            }
        });
    });
};

/**
 * If this.active is false, wait for it to become true
 *
 * @return {Promise}
 */
prototype.waitForActivation = function() {
    if (this.active) {
        return Promise.resolve();
    }
    if (!this.activationPromise) {
        var r1, r2;
        this.activationPromise = new Promise(function(resolve, reject) {
            r1 = resolve;
            r2 = reject;
        });
        this.activationPromise.resolve = r1;
        this.activationPromise.reject = r2;

        if (process.env.NODE_ENV !== 'production') {
            console.log('Waiting for activate() to be called...');
        }
    }
    return this.activationPromise;
};

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
    var hookFunc = (query.options) ? query.options[hookName] : null;
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
        var impact = true;
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
            var object = impact;
            query.object = object;
            query.promise = Promise.resolve(object);
        } else {
            query.expired = true;
        }
        return true;
    } else if (query.type === 'page' || query.type === 'list') {
        var impact = true;
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
            var objects = impact;
            if (query.type === 'list') {
                // update the total
                var diff = objects.length - query.objects.length;
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
    var changed = false;
    var newList = objects.map(function(object) {
        var newObject = findObject(newObjects, object);
        if (newObject) {
            if (!matchObject(newObject, object)) {
                changed = true;
                return newObject;
            }
        }
        return object;
    });
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
    var newList = objects.slice();
    newObjects.forEach(function(object) {
        newList.unshift(object);
    });
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
    var newList = objects.slice();
    newObjects.forEach(function(object) {
        newList.push(object);
    });
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
    var changed = false;
    var newList = objects.filter(function(object) {
        if (findObjectIndex(deletedObjects, object) !== -1) {
            changed = true;
            return false;
        } else {
            return true;
        }
    });
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
    for (var name in props) {
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
                for (var i = 0; i < object1.length; i++) {
                    if (!matchObject(object1[i], object2[i])) {
                        return false;
                    }
                }
            } else if (object1 instanceof Function) {
                if (object1.toString() !== object2.toString()) {
                    return false;
                }
            } else {
                for (var name in object1) {
                    if (!matchObject(object1[name], object2[name])) {
                        return false;
                    }
                }
                for (var name in object2) {
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
    var lc = url.charAt(url.length - 1);
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
    var fc = url.charAt(0);
    if (fc !== '/') {
        url = '/' + url;
    }
    return url;
}

function addTrailingSlash(url) {
    var qi = url.indexOf('?');
    var query;
    if (qi !== -1) {
        query = url.substr(qi);
        url = url.substr(0, qi);
    }
    var lc = url.charAt(url.length - 1);
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
    var ei = url.lastIndexOf('/');
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
    return (page > 1) ? attachURLParameter(url, 'page', page) : url;
}

function attachURLParameter(url, name, value) {
    var qi = url.indexOf('?');
    var sep = (qi === -1) ? '?' : '&';
    var assignments;
    if (value instanceof Array && value.length === 1) {
        value = value[0];
    }
    if (value instanceof Array) {
        assignments = value.map(function(value) {
            return name + '[]=' + encodeURI(value);
        }).join('&');
    } else {
        assignments = name + '=' + encodeURI(value)
    }
    return url + sep + assignments;
}

function omitSearchString(url) {
    var qi = url.lastIndexOf('?');
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
    var keyA = object.id;
    for (var i = 0; i < list.length; i++) {
        var keyB = list[i].id;
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
        var index = findObjectIndex(list, object);
        if (index !== -1) {
            var objectFound = list[index];
            if (different) {
                // allow object to have fewer properties than those in
                // the list
                for (var name in object) {
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
        var found = [];
        for (var i = 0; i < objects.length; i++) {
            var objectFound = findObject(list, objects[i], different);
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
    var dst;
    if (src instanceof Array) {
        dst = [];
        for (var i = 0; i < src.length; i++) {
            dst.push(cloneObject(src[i]));
        }
        return dst;
    } else if (src instanceof Object) {
        dst = {};
        for (var name in src) {
            dst[name] = cloneObject(src[name]);
        }
    } else {
        dst = src;
    }
    return dst;
}

/**
 * Sort a list of objects based on ID or URL
 *
 * @param  {Array<Object>} list
 */
function sortObjects(list) {
    list.sort(function(a, b) {
        var keyA = a.id;
        var keyB = b.id;
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
 * Append objects to a list, making sure duplicates aren't added
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
        objects = objects.filter(function(object) {
            return findObjectIndex(list, object) === -1;
        });
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
    var freshObjects = [];
    var changed = false;
    for (var i = 0; i < newList.length; i++) {
        var oldIndex = findObjectIndex(oldList, newList[i]);
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
    var startIndex = 0;
    for (var i = newList.length - 1; i >= 0; i--) {
        var newObject = newList[i];
        var oldIndex = findObjectIndex(oldList, newObject);
        if (oldIndex !== -1) {
            startIndex = oldIndex + 1;
            break;
        }
    }
    // remove objects ahead of the intersection from the old list, as well
    // as any object that is present in the new list (due to change in order)
    var oldObjects = oldList.filter(function(object, index) {
        if (index >= startIndex) {
            return findObjectIndex(newList, object) === -1;
        }
    });
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
    var minimum = (options) ? options.minimum : undefined;
    if (typeof(minimum) === 'string') {
        minimum = minimum.trim();
        if (minimum.charAt(minimum.length - 1) === '%') {
            var percent = parseInt(minimum);
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
    var date = new Date;
    if (delta) {
        date = new Date(date.getTime() + delta);
    }
    return date.toISOString();
}

function RelaksWordpressDataSourceEvent(type, target, props) {
    GenericEvent.call(this, type, target, props);
}

RelaksWordpressDataSourceEvent.prototype = Object.create(GenericEvent.prototype)

function RelaksWordpressDataSourceError(status, message) {
    this.status = status;
    this.message = message;
}

RelaksWordpressDataSourceError.prototype = Object.create(Error.prototype)

module.exports = RelaksWordpressDataSource;
module.exports.RelaksWordpressDataSource = RelaksWordpressDataSource;
module.exports.RelaksWordpressDataSourceEvent = RelaksWordpressDataSourceEvent;
module.exports.RelaksWordpressDataSourceError = RelaksWordpressDataSourceError;
