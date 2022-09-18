import { GenericEvent, EventEmitter } from 'relaks-event-emitter';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var RelaksWordpressDataSourceError = /*#__PURE__*/function (_Error) {
  _inherits(RelaksWordpressDataSourceError, _Error);

  var _super = _createSuper(RelaksWordpressDataSourceError);

  function RelaksWordpressDataSourceError(status, message) {
    var _this;

    _classCallCheck(this, RelaksWordpressDataSourceError);

    _this = _super.call(this, message);
    _this.status = status;
    _this.message = message;
    return _this;
  }

  return _createClass(RelaksWordpressDataSourceError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

var RelaksWordpressDataSourceEvent = /*#__PURE__*/function (_GenericEvent) {
  _inherits(RelaksWordpressDataSourceEvent, _GenericEvent);

  var _super = _createSuper(RelaksWordpressDataSourceEvent);

  function RelaksWordpressDataSourceEvent() {
    _classCallCheck(this, RelaksWordpressDataSourceEvent);

    return _super.apply(this, arguments);
  }

  return _createClass(RelaksWordpressDataSourceEvent);
}(GenericEvent);

var defaultOptions = {
  baseURL: '',
  permalinks: true,
  refreshInterval: 0,
  fetchFunc: null
};

var RelaksWordpressDataSource = /*#__PURE__*/function (_EventEmitter) {
  _inherits(RelaksWordpressDataSource, _EventEmitter);

  var _super = _createSuper(RelaksWordpressDataSource);

  function RelaksWordpressDataSource(options) {
    var _this;

    _classCallCheck(this, RelaksWordpressDataSource);

    _this = _super.call(this);
    _this.active = false;
    _this.activationPromise = null;
    _this.queries = [];
    _this.authentications = [];
    _this.authorizations = [];
    _this.options = {};

    for (var name in defaultOptions) {
      if (options && options[name] !== undefined) {
        _this.options[name] = options[name];
      } else {
        _this.options[name] = defaultOptions[name];
      }
    }

    return _this;
  }
  /**
   * Activate the component
   */


  _createClass(RelaksWordpressDataSource, [{
    key: "activate",
    value: function activate() {
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
    }
    /**
     * Activate the component
     */

  }, {
    key: "deactivate",
    value: function deactivate() {
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

  }, {
    key: "resolveURL",
    value: function resolveURL(url) {
      if (typeof url !== 'string') {
        return url;
      }

      var baseURL = this.options.baseURL;

      if (baseURL && !/^https?:/.test(url)) {
        if (!/^https?:/.test(baseURL)) {
          if ((typeof location === "undefined" ? "undefined" : _typeof(location)) === 'object') {
            var _location = location,
                protocol = _location.protocol,
                host = _location.host;
            baseURL = "".concat(protocol, "//").concat(host).concat(baseURL);
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

  }, {
    key: "resolveURLs",
    value: function resolveURLs(urls) {
      var _this2 = this;

      return urls.map(function (url) {
        return _this2.resolveURL(url);
      });
    }
    /**
     * Trigger a 'change' event unless changed is false
     *
     * @param  {Boolean} changed
     *
     * @return {Boolean}
     */

  }, {
    key: "notifyChanges",
    value: function notifyChanges(changed) {
      if (changed === false) {
        return false;
      }

      this.triggerEvent(new RelaksWordpressDataSourceEvent('change', this));
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

  }, {
    key: "fetchOne",
    value: function fetchOne(url, id, options) {
      var _this3 = this;

      if (id) {
        return this.fetchMultiple(url, [id], options).then(function (objects) {
          return objects[0] || null;
        });
      } else {
        var absURL = this.resolveURL(url);
        var props = {
          type: 'object',
          url: absURL,
          options: options || {}
        };
        var query = this.findQuery(props);

        if (!query) {
          var time = getTime();
          query = props;
          query.promise = this.get(absURL).then(function (response) {
            var object = response;
            query.object = object;
            query.time = time;

            _this3.processFreshObject(object, absURL, query, true);

            return object;
          });
          this.queries.unshift(query);
        }

        return query.promise.then(function (object) {
          if (query.expired) {
            _this3.refreshOne(query);
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

  }, {
    key: "fetchPage",
    value: function fetchPage(url, page, options) {
      var _this4 = this;

      var absURL = this.resolveURL(url);
      var props = {
        type: 'page',
        url: absURL,
        page: page,
        options: options || {}
      };
      var query = this.findQuery(props);

      if (!query) {
        var pageURL = attachPageNumber(absURL, page);
        var time = getTime();
        query = props;
        query.promise = this.get(pageURL).then(function (response) {
          var objects = response;
          query.objects = objects;
          query.time = time;

          _this4.processFreshObjects(objects, pageURL, query, true);

          return objects;
        });
        this.queries.push(query);
      }

      return query.promise.then(function (objects) {
        if (query.expired) {
          _this4.refreshPage(query);
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

  }, {
    key: "fetchList",
    value: function fetchList(url, options) {
      var _this5 = this;

      var absURL = this.resolveURL(url);
      var props = {
        type: 'list',
        url: absURL,
        options: options || {}
      };
      var query = this.findQuery(props);

      if (!query) {
        query = props;
        query.promise = this.fetchNextPage(query, true);
        this.queries.push(query);
      }

      return query.promise.then(function (objects) {
        if (query.expired) {
          _this5.refreshList(query);
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

  }, {
    key: "fetchNoMore",
    value: function fetchNoMore(query) {
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

  }, {
    key: "fetchNextPage",
    value: function fetchNextPage(query, initial) {
      var _this6 = this;

      if (query.nextPromise) {
        return query.nextPromise;
      }

      var time = getTime();
      var perPage = 10;
      var page = query.nextPage || 1;
      var expectedCount = perPage * page;
      var nextURL = attachPageNumber(query.url, page);
      var nextPromise = this.get(nextURL).then(function (response) {
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

        _this6.processFreshObjects(freshObjects, nextURL, query, initial); // attach function to results so caller can ask for more results


        if (expectedCount < total && freshObjects.length > 0) {
          objects.more = _this6.fetchNextPage.bind(_this6, query, false);
          objects.total = total; // if minimum is provide, fetch more if it's not met

          var minimum = getMinimum(query.options, total, NaN);

          if (objects.length < minimum) {
            // fetch the next page
            return _this6.fetchNextPage(query, false);
          }
        } else {
          objects.more = _this6.fetchNoMore.bind(_this6, query);
          objects.total = objects.length;
        } // inform parent component that more data is available


        _this6.notifyChanges(!initial);

        return objects;
      })["catch"](function (err) {
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

  }, {
    key: "fetchMultiple",
    value: function fetchMultiple(url, ids, options) {
      var absURL = this.resolveURL(url);
      var byID = {
        ids: [],
        objects: [],
        expired: false,
        urlParam: 'include'
      };
      var bySlug = {
        ids: [],
        objects: [],
        expired: false,
        urlParam: 'slug'
      }; // look for cached objects from among existing queries

      var cachedObjectHash = {};
      var remaining = ids.slice().filter(Boolean);
      this.scanCachedObjects(absURL, function (object, query) {
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
      }); // map ids to cached objects, remembering which one is found by numeric id
      // and which one is found by slug

      var cached = 0;
      var cachedResults = ids.map(function (id) {
        var cachedObject = cachedObjectHash[id];
        var byX;

        if (typeof id === 'number') {
          byX = byID;
        } else if (typeof id === 'string') {
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
      }); // create list queries (one usually; two if ids contains a mix of strings and numbers)

      var listPromises = [];
      var retrievalAttempted = false;

      for (var _i = 0, _arr = [byID, bySlug]; _i < _arr.length; _i++) {
        var byX = _arr[_i];

        if (byX.ids.length > 0) {
          var listURL = attachURLParameter(absURL, byX.urlParam, byX.ids);
          var listOptions = {
            pageSize: Math.min(100, byX.ids.length),
            minimum: '100%',
            afterInsert: 'ignore',
            afterUpdate: 'replace',
            afterDelete: 'remove'
          };

          for (var key in options) {
            listOptions[key] = options[key];
          }

          var props = {
            type: 'list',
            url: listURL,
            options: listOptions
          };
          var query = this.findQuery(props);

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
          } else {
            retrievalAttempted = true;
          }
        }
      } // create a promise that's fulfiled when the list queries are done


      var completeListPromise = Promise.all(listPromises).then(function (lists) {
        var objectHash = {};

        var _iterator = _createForOfIteratorHelper(lists),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var list = _step.value;

            var _iterator2 = _createForOfIteratorHelper(list),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var object = _step2.value;
                objectHash[object.id] = object;

                if (object.slug) {
                  objectHash[object.slug] = object;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return ids.map(function (id) {
          return objectHash[id] || null;
        });
      }); // see whether partial result set should be immediately returned

      var minimum = getMinimum(options, ids.length, ids.length);

      if (cached < minimum && !retrievalAttempted) {
        return completeListPromise;
      } else {
        // return partial list--the list query will issue change event
        return Promise.resolve(cachedResults);
      }
    }
  }, {
    key: "scanCachedObjects",
    value: function scanCachedObjects(absURL, cb) {
      var _iterator3 = _createForOfIteratorHelper(this.queries),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var query = _step3.value;

          if (query.type === 'page' || query.type === 'list') {
            var url = omitSearchString(query.url);

            if (url === absURL && query.objects) {
              var _iterator4 = _createForOfIteratorHelper(query.objects),
                  _step4;

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var object = _step4.value;
                  var ret = cb(object, query);

                  if (ret === false) {
                    return;
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    /**
     * Reperform an query for an object, triggering an onChange event if the
     * object has changed.
     *
     * @param  {Object} query
     */

  }, {
    key: "refreshOne",
    value: function refreshOne(query) {
      var _this7 = this;

      if (query.refreshing) {
        return;
      }

      query.refreshing = true;
      var time = getTime();
      this.get(query.url).then(function (response) {
        var object = response;
        query.time = time;
        query.refreshing = false;
        query.expired = false;

        if (!matchObject(object, query.object)) {
          query.object = object;
          query.promise = Promise.resolve(object);

          _this7.processFreshObject(object, query.url, query, false);

          _this7.notifyChanges();
        }
      })["catch"](function (err) {
        query.refreshing = false;
      });
    }
    /**
     * Reperform an query for a page of objects, triggering an onChange event if
     * the list is different from the one fetched previously.
     *
     * @param  {Object} query
     */

  }, {
    key: "refreshPage",
    value: function refreshPage(query) {
      var _this8 = this;

      if (query.refreshing) {
        return;
      }

      query.refreshing = true;
      var time = getTime();
      var pageURL = attachPageNumber(query.url, query.page);
      this.get(pageURL).then(function (response) {
        var objects = response;
        var total = response.total; // remove other pages (unless they're refreshing)

        var otherQueries = [];

        var _iterator5 = _createForOfIteratorHelper(_this8.queries),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var otherQuery = _step5.value;

            if (otherQuery.url === query.url) {
              if (otherQuery.page !== query.page) {
                if (otherQuery.expired && !otherQuery.refreshing) {
                  otherQueries.push(otherQuery);
                }
              }
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        pullObjects(_this8.queries, otherQueries);
        setTimeout(function () {
          var _iterator6 = _createForOfIteratorHelper(otherQueries),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _step6$value = _step6.value,
                  url = _step6$value.url,
                  page = _step6$value.page,
                  options = _step6$value.options;

              _this8.fetchPage(url, page, options);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }, 1000);
        query.time = time;
        query.refreshing = false;
        query.expired = false;
        var freshObjects = replaceIdentificalObjects(objects, query.objects);

        if (freshObjects) {
          objects.total = total;
          query.objects = objects;
          query.promise = Promise.resolve(objects);

          _this8.processFreshObjects(freshObjects, pageURL, query, false);

          _this8.notifyChanges();
        }
      })["catch"](function (err) {
        query.refreshing = false;
      });
    }
    /**
     * Reperform an query for a list of objects, triggering an onChange event if
     * the list is different from the one fetched previously.
     *
     * @param  {Object} query
     */

  }, {
    key: "refreshList",
    value: function refreshList(query) {
      var _this9 = this;

      if (query.refreshing) {
        return;
      }

      query.refreshing = true; // updating paginated list
      // wait for any call to more() to finish first

      Promise.resolve(query.nextPromise).then(function () {
        // suppress fetching of additional pages for the time being
        var oldObjects = query.objects || [];
        var morePromise, moreResolve, moreReject;

        var fetchMoreAfterward = function fetchMoreAfterward() {
          if (!morePromise) {
            morePromise = new Promise(function (f1, f2) {
              moreResolve = f1;
              moreReject = f2;
            });
          }

          return morePromise;
        };

        oldObjects.more = fetchMoreAfterward;
        var refreshedObjects;
        var pageRemaining = query.nextPage - 1;
        var nextPage = 1;
        var nextURL = attachPageNumber(query.url, nextPage);

        var refreshNextPage = function refreshNextPage() {
          return _this9.get(nextURL).then(function (response) {
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

              _this9.processFreshObjects(freshObjects, query.url, query, false);

              _this9.notifyChanges();
            } // keep going until all pages have been updated


            if (query.nextPage !== nextPage) {
              return refreshNextPage();
            }
          });
        };

        var time = getTime();
        refreshNextPage().then(function () {
          // we're done
          query.time = time;
          query.refreshing = false;
          query.expired = false; // reenable fetching of additional pages

          if (query.objects.length < query.objects.total) {
            query.objects.more = _this9.fetchNextPage.bind(_this9, query, false);
          } else {
            query.objects.more = _this9.fetchNoMore.bind(_this9, query);
          } // trigger it if more() had been called


          if (morePromise) {
            query.objects.more().then(moreResolve, moreReject);
          }
        })["catch"](function (err) {
          query.refreshing = false;
        });
      });
    }
  }, {
    key: "processFreshObject",
    value: function processFreshObject(object, objectURL, excludeQuery, notify) {
      var op = {
        url: getFolderURL(objectURL),
        results: [object],
        rejects: [],
        query: excludeQuery
      };
      var changed = this.runUpdateHooks(op);

      if (notify) {
        this.notifyChanges(changed);
      }

      return changed;
    }
  }, {
    key: "processFreshObjects",
    value: function processFreshObjects(objects, folderURL, excludeQuery, notify) {
      var op = {
        url: omitSearchString(folderURL),
        results: objects,
        rejects: [],
        query: excludeQuery
      };
      var changed = this.runUpdateHooks(op);

      if (notify) {
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

  }, {
    key: "runUpdateHooks",
    value: function runUpdateHooks(op) {
      var changed = false;

      var _iterator7 = _createForOfIteratorHelper(this.queries),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var query = _step7.value;

          if (query !== op.query) {
            if (this.runUpdateHook(query, op)) {
              changed = true;
            }
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
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

  }, {
    key: "runUpdateHook",
    value: function runUpdateHook(query, op) {
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
        var _defaultBehavior = 'refresh';

        var _queryFolderURL = omitSearchString(query.url);

        if (_queryFolderURL === op.url) {
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
              return runHook(query, 'afterUpdate', modifiedObjects, _defaultBehavior);
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

  }, {
    key: "invalidate",
    value: function invalidate(time) {
      if (time instanceof Date) {
        time = time.toISOString();
      }

      var changed = false;

      var _iterator8 = _createForOfIteratorHelper(this.queries),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var query = _step8.value;

          if (!query.expired) {
            if (!time || query.time <= time) {
              query.expired = true;
              changed = true;
            }
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
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

  }, {
    key: "findQuery",
    value: function findQuery(props) {
      return this.queries.find(function (query) {
        return matchQuery(query, props);
      });
    }
    /**
     * Start expiration checking
     */

  }, {
    key: "startExpirationCheck",
    value: function startExpirationCheck() {
      var _this10 = this;

      var refreshInterval = this.options.refreshInterval;

      if (refreshInterval > 0) {
        if (!this.expirationCheckInterval) {
          this.expirationCheckInterval = setInterval(function () {
            _this10.checkExpiration();
          }, Math.min(100, refreshInterval / 10));
        }
      }
    }
    /**
     * Stop expiration checking
     */

  }, {
    key: "stopExpirationCheck",
    value: function stopExpirationCheck() {
      if (this.expirationCheckInterval) {
        clearInterval(this.expirationCheckInterval);
        this.expirationCheckInterval = 0;
      }
    }
    /**
     * Mark queries as expired and trigger onChange event when enough time has passed
     */

  }, {
    key: "checkExpiration",
    value: function checkExpiration() {
      var interval = Number(this.options.refreshInterval);

      if (interval) {
        var time = getTime(-interval);
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

  }, {
    key: "get",
    value: function get(url) {
      var options = {
        method: 'GET'
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

  }, {
    key: "request",
    value: function request(url, options) {
      if (!options) {
        options = {};
      }

      return this.fetch(url, options).then(function (response) {
        var status = response.status,
            statusText = response.statusText;

        if (status < 400) {
          if (status == 204) {
            return null;
          }

          var total = parseInt(response.headers.get('X-WP-Total'));
          return response.json().then(function (objects) {
            if (objects instanceof Array && total === total) {
              objects.total = total;
            }

            return objects;
          });
        } else {
          throw new RelaksWordpressDataSourceError(status, statusText);
        }
      });
    }
    /**
     * Wait for active to become true then run fetch()
     *
     * @type {Promise<Response>}
     */

  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (url, options) {
      var _this11 = this;

      return this.waitForActivation().then(function () {
        var fetchFunc = _this11.options.fetchFunc;

        if (!fetchFunc) {
          fetchFunc = fetch;
        }

        return fetchFunc(url, options)["catch"](function (err) {
          // try again if the data source was deactivated in the middle of
          // an operation
          if (!_this11.active) {
            return _this11.fetch(url, options);
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
    )
  }, {
    key: "waitForActivation",
    value: function waitForActivation() {
      if (this.active) {
        return Promise.resolve();
      }

      if (!this.activationPromise) {
        var resolve, reject;
        this.activationPromise = new Promise(function (f1, f2) {
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
  }]);

  return RelaksWordpressDataSource;
}(EventEmitter);
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
  var hookFunc = query.options ? query.options[hookName] : null;

  if (!hookFunc) {
    hookFunc = defaultBehavior;
  }

  if (typeof hookFunc === 'string') {
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
      query.object = impact;
      query.promise = Promise.resolve(impact);
    } else {
      query.expired = true;
    }

    return true;
  } else if (query.type === 'page' || query.type === 'list') {
    var _impact = true;

    if (query.objects && input.every(Boolean)) {
      // sort list by ID or URL
      sortObjects(input);

      try {
        _impact = hookFunc(query.objects, input);
      } catch (err) {
        console.error(err);
      }
    }

    if (_impact === false) {
      return false;
    }

    if (_impact instanceof Array) {
      var objects = _impact;

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
  var newList = [];

  var _iterator9 = _createForOfIteratorHelper(objects),
      _step9;

  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var object = _step9.value;
      var newObject = findObject(newObjects, object);

      if (newObject) {
        if (!matchObject(newObject, object)) {
          changed = true;
          object = newObject;
        }
      }

      newList.push(object);
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }

  return changed ? newList : false;
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

  var _iterator10 = _createForOfIteratorHelper(newObjects),
      _step10;

  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var object = _step10.value;
      newList.unshift(object);
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
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
  var newList = objects.slice();

  var _iterator11 = _createForOfIteratorHelper(newObjects),
      _step11;

  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var object = _step11.value;
      newList.push(object);
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
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
  var changed = false;
  var newList = [];

  var _iterator12 = _createForOfIteratorHelper(objects),
      _step12;

  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var object = _step12.value;

      if (findObjectIndex(deletedObjects, object) === -1) {
        newList.push(object);
      } else {
        changed = true;
      }
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }

  return changed ? newList : false;
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

        for (var _name in object2) {
          if (!(_name in object1)) {
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
  return attachURLParameter(url, 'page', page || 1);
}

function attachURLParameter(url, name, value) {
  var qi = url.indexOf('?');
  var sep = qi === -1 ? '?' : '&';
  var assignments;

  if (value instanceof Array && value.length === 1) {
    value = value[0];
  }

  if (value instanceof Array) {
    assignments = value.map(function (value) {
      return "".concat(name, "[]=").concat(encodeURI(value));
    }).join('&');
  } else {
    assignments = "".concat(name, "=").concat(encodeURI(value));
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

    var _iterator13 = _createForOfIteratorHelper(objects),
        _step13;

    try {
      for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
        var object = _step13.value;
        var objectFound = findObject(list, object, different);

        if (objectFound) {
          found.push(objectFound);
        }
      }
    } catch (err) {
      _iterator13.e(err);
    } finally {
      _iterator13.f();
    }

    if (found.length > 0) {
      return found;
    }
  }
}
/**
 * Sort a list of objects based on ID or URL
 *
 * @param  {Array<Object>} list
 */


function sortObjects(list) {
  list.sort(function (a, b) {
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
    var duplicates = [];

    var _iterator14 = _createForOfIteratorHelper(objects),
        _step14;

    try {
      for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
        var object = _step14.value;

        if (findObjectIndex(list, object) !== -1) {
          duplicates.push(object);
        }
      }
    } catch (err) {
      _iterator14.e(err);
    } finally {
      _iterator14.f();
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
  } // don't add objects ahead of the intersection from the old list or
  // objects that are present in the new list (due to change in order)


  var oldObjects = [];

  var _iterator15 = _createForOfIteratorHelper(oldList),
      _step15;

  try {
    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
      var _step15$value = _slicedToArray(_step15.value, 2),
          index = _step15$value[0],
          object = _step15$value[1];

      if (index >= startIndex) {
        if (findObjectIndex(newList, object) === -1) {
          oldObjects.push(object);
        }
      }
    }
  } catch (err) {
    _iterator15.e(err);
  } finally {
    _iterator15.f();
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
  var minimum = options ? options.minimum : undefined;

  if (typeof minimum === 'string') {
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
  var date = new Date();

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
    var _iterator16 = _createForOfIteratorHelper(objects),
        _step16;

    try {
      for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
        var object = _step16.value;
        var index = list.indexOf(object);

        if (index !== -1) {
          list.splice(index, 1);
        }
      }
    } catch (err) {
      _iterator16.e(err);
    } finally {
      _iterator16.f();
    }
  }
}

var RelaksWordpressDataSourceProxy = /*#__PURE__*/function () {
  function RelaksWordpressDataSourceProxy() {
    _classCallCheck(this, RelaksWordpressDataSourceProxy);
  }

  _createClass(RelaksWordpressDataSourceProxy, [{
    key: "fetchOne",
    value: function fetchOne(url, id, options) {
      return this.dataSource.fetchOne(url, id, options);
    }
  }, {
    key: "fetchList",
    value: function fetchList(url, options) {
      return this.dataSource.fetchList(url, options);
    }
  }, {
    key: "fetchMultiple",
    value: function fetchMultiple(url, ids, options) {
      return this.dataSource.fetchMultiple(url, ids, options);
    }
  }, {
    key: "fetchPage",
    value: function fetchPage(url, page, options) {
      return this.dataSource.fetchPage(url, page, options);
    }
  }]);

  return RelaksWordpressDataSourceProxy;
}();

export default RelaksWordpressDataSource;
export { RelaksWordpressDataSource as DataSource, RelaksWordpressDataSourceError as DataSourceError, RelaksWordpressDataSourceEvent as DataSourceEvent, RelaksWordpressDataSourceProxy as DataSourceProxy, RelaksWordpressDataSource, RelaksWordpressDataSourceError, RelaksWordpressDataSourceEvent, RelaksWordpressDataSourceProxy };
