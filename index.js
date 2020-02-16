(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.RelaksWordpressDataSource = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
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
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof$1 = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof$1 = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof$1(obj);
  }

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  var RelaksEventEmitter =
  /*#__PURE__*/
  function () {
    function RelaksEventEmitter() {
      _classCallCheck$1(this, RelaksEventEmitter);

      this.listeners = [];
      this.promises = [];
    }
    /**
     * Attach an event handler
     *
     * @param  {String} type
     * @param  {Function} handler
     * @param  {Boolean|undefined} beginning
     */


    _createClass$1(RelaksEventEmitter, [{
      key: "addEventListener",
      value: function addEventListener(type, handler, beginning) {
        if (typeof type !== 'string') {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Invalid event type passed to addEventListener()');
          }

          return;
        }

        if (!(handler instanceof Function) && handler != null) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Non-function passed to addEventListener()');
          }

          return;
        }

        if (beginning) {
          this.listeners.unshift({
            type: type,
            handler: handler
          });
        } else {
          this.listeners.push({
            type: type,
            handler: handler
          });
        }
      }
      /**
       * Remove an event handler
       *
       * @param  {String} type
       * @param  {Function} handler
       */

    }, {
      key: "removeEventListener",
      value: function removeEventListener(type, handler) {
        this.listeners = this.listeners.filter(function (listener) {
          return !(listener.type === type && listener.handler === handler);
        });
      }
      /**
       * Return a promise that will be fulfilled when the specified event occurs
       *
       * @param  {String} type
       * @param  {Number|undefined} timeout
       *
       * @return {Promise<Event>}
       */

    }, {
      key: "waitForEvent",
      value: function waitForEvent(type, timeout) {
        var promise = this.promises[type];

        if (!promise) {
          var resolve, reject;
          promise = new Promise(function (f1, f2) {
            resolve = f1;
            reject = f2;
          });
          promise.resolve = resolve;
          promise.reject = reject;
          this.promises[type] = promise;

          if (timeout) {
            setTimeout(function () {
              if (promise.reject) {
                promise.reject(new Error("No '".concat(type, "' event within ").concat(timeout, "ms")));
              }
            }, timeout);
          }
        }

        return promise;
      }
      /**
       * Send event to event listeners, return true or false depending on whether
       * there were any listeners
       *
       * @param  {RelaksDjangoDataSourceEvent} evt
       *
       * @return {Boolean}
       */

    }, {
      key: "triggerEvent",
      value: function triggerEvent(evt) {
        var promise = this.promises[evt.type];

        if (promise) {
          delete this.promises[evt.type];
        }

        var listeners = this.listeners.filter(function (listener) {
          return listener.type === evt.type;
        });

        if (listeners.length === 0) {
          if (promise) {
            promise.reject = null;
            promise.resolve(evt);
            return true;
          } else {
            return false;
          }
        }

        evt.decisionPromise = this.dispatchEvent(evt, listeners).then(function () {
          if (promise) {
            promise.reject = null;
            promise.resolve(evt);
          }
        });
        return true;
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(evt, listeners) {
        var _this = this;

        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          listener.handler.call(evt.target, evt);

          if (evt.defaultPostponed) {
            var _ret = function () {
              var remainingListeners = listeners.slice(i + 1);
              return {
                v: evt.defaultPostponed.then(function (decision) {
                  if (decision === false) {
                    evt.preventDefault();
                    evt.stopImmediatePropagation();
                  }

                  if (!evt.propagationStopped) {
                    return _this.dispatchEvent(evt, remainingListeners);
                  }
                })
              };
            }();

            if (_typeof$1(_ret) === "object") return _ret.v;
          }

          if (evt.propagationStopped) {
            break;
          }
        }

        return Promise.resolve();
      }
    }]);

    return RelaksEventEmitter;
  }();

  var RelaksGenericEvent =
  /*#__PURE__*/
  function () {
    function RelaksGenericEvent(type, target, props) {
      _classCallCheck$1(this, RelaksGenericEvent);

      this.type = type;
      this.target = target;
      this.defaultPrevented = false;
      this.defaultPostponed = null;
      this.propagationStopped = false;
      this.decisionPromise = null;
      Object.assign(this, props);
    }

    _createClass$1(RelaksGenericEvent, [{
      key: "preventDefault",
      value: function preventDefault() {
        this.defaultPrevented = true;
      }
    }, {
      key: "postponeDefault",
      value: function postponeDefault(promise) {
        if (promise instanceof Function) {
          promise = promise();
        }

        if (!promise || !(promise.then instanceof Function)) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Non-promise passed to postponeDefault()');
          }

          return;
        }

        this.defaultPostponed = promise;
      }
    }, {
      key: "stopImmediatePropagation",
      value: function stopImmediatePropagation() {
        this.propagationStopped = true;
      }
    }, {
      key: "waitForDecision",
      value: function waitForDecision() {
        return Promise.resolve(this.decisionPromise);
      }
    }]);

    return RelaksGenericEvent;
  }();

  var RelaksWordpressDataSourceError =
  /*#__PURE__*/
  function (_Error) {
    _inherits(RelaksWordpressDataSourceError, _Error);

    function RelaksWordpressDataSourceError(status, message) {
      var _this;

      _classCallCheck(this, RelaksWordpressDataSourceError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(RelaksWordpressDataSourceError).call(this, message));
      _this.status = status;
      _this.message = message;
      return _this;
    }

    return RelaksWordpressDataSourceError;
  }(_wrapNativeSuper(Error));

  var RelaksWordpressDataSourceEvent =
  /*#__PURE__*/
  function (_GenericEvent) {
    _inherits(RelaksWordpressDataSourceEvent, _GenericEvent);

    function RelaksWordpressDataSourceEvent() {
      _classCallCheck(this, RelaksWordpressDataSourceEvent);

      return _possibleConstructorReturn(this, _getPrototypeOf(RelaksWordpressDataSourceEvent).apply(this, arguments));
    }

    return RelaksWordpressDataSourceEvent;
  }(RelaksGenericEvent);

  var defaultOptions = {
    baseURL: '',
    permalinks: true,
    refreshInterval: 0,
    fetchFunc: null
  };

  var RelaksWordpressDataSource =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(RelaksWordpressDataSource, _EventEmitter);

    function RelaksWordpressDataSource(options) {
      var _this;

      _classCallCheck(this, RelaksWordpressDataSource);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(RelaksWordpressDataSource).call(this));
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
            }
          }
        } // create a promise that's fulfiled when the list queries are done


        var completeListPromise = Promise.all(listPromises).then(function (lists) {
          var objectHash = {};
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var list = _step.value;
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var object = _step2.value;
                  objectHash[object.id] = object;

                  if (object.slug) {
                    objectHash[object.slug] = object;
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return ids.map(function (id) {
            return objectHash[id] || null;
          });
        }); // see whether partial result set should be immediately returned

        var minimum = getMinimum(options, ids.length, ids.length);

        if (cached < minimum) {
          return completeListPromise;
        } else {
          // return partial list--the list query will issue change event
          return Promise.resolve(cachedResults);
        }
      }
    }, {
      key: "scanCachedObjects",
      value: function scanCachedObjects(absURL, cb) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.queries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var query = _step3.value;

            if (query.type === 'page' || query.type === 'list') {
              var url = omitSearchString(query.url);

              if (url === absURL && query.objects) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                  for (var _iterator4 = query.objects[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var object = _step4.value;
                    var ret = cb(object, query);

                    if (ret === false) {
                      return;
                    }
                  }
                } catch (err) {
                  _didIteratorError4 = true;
                  _iteratorError4 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                      _iterator4["return"]();
                    }
                  } finally {
                    if (_didIteratorError4) {
                      throw _iteratorError4;
                    }
                  }
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
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
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = _this8.queries[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
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
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                _iterator5["return"]();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          pullObjects(_this8.queries, otherQueries);
          setTimeout(function () {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = otherQueries[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var _step6$value = _step6.value,
                    url = _step6$value.url,
                    page = _step6$value.page,
                    options = _step6$value.options;

                _this8.fetchPage(url, page, options);
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                  _iterator6["return"]();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
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
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this.queries[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var query = _step7.value;

            if (query !== op.query) {
              if (this.runUpdateHook(query, op)) {
                changed = true;
              }
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
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
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = this.queries[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var query = _step8.value;

            if (!query.expired) {
              if (!time || query.time <= time) {
                query.expired = true;
                changed = true;
              }
            }
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
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
      })
      /**
       * If this.active is false, wait for it to become true
       *
       * @return {Promise}
       */

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
  }(RelaksEventEmitter);
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
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = objects[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
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
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
          _iterator9["return"]();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
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
    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
      for (var _iterator10 = newObjects[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
        var object = _step10.value;
        newList.unshift(object);
      }
    } catch (err) {
      _didIteratorError10 = true;
      _iteratorError10 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
          _iterator10["return"]();
        }
      } finally {
        if (_didIteratorError10) {
          throw _iteratorError10;
        }
      }
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
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
      for (var _iterator11 = newObjects[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
        var object = _step11.value;
        newList.push(object);
      }
    } catch (err) {
      _didIteratorError11 = true;
      _iteratorError11 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
          _iterator11["return"]();
        }
      } finally {
        if (_didIteratorError11) {
          throw _iteratorError11;
        }
      }
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
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
      for (var _iterator12 = objects[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
        var object = _step12.value;

        if (findObjectIndex(deletedObjects, object) === -1) {
          newList.push(object);
        } else {
          changed = true;
        }
      }
    } catch (err) {
      _didIteratorError12 = true;
      _iteratorError12 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
          _iterator12["return"]();
        }
      } finally {
        if (_didIteratorError12) {
          throw _iteratorError12;
        }
      }
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
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = objects[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var object = _step13.value;
          var objectFound = findObject(list, object, different);

          if (objectFound) {
            found.push(objectFound);
          }
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
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
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = objects[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var object = _step14.value;

          if (findObjectIndex(list, object) !== -1) {
            duplicates.push(object);
          }
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
            _iterator14["return"]();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
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
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
      for (var _iterator15 = oldList[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
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
      _didIteratorError15 = true;
      _iteratorError15 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
          _iterator15["return"]();
        }
      } finally {
        if (_didIteratorError15) {
          throw _iteratorError15;
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

  var RelaksWordpressDataSourceProxy =
  /*#__PURE__*/
  function () {
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

  exports.DataSource = RelaksWordpressDataSource;
  exports.DataSourceError = RelaksWordpressDataSourceError;
  exports.DataSourceEvent = RelaksWordpressDataSourceEvent;
  exports.DataSourceProxy = RelaksWordpressDataSourceProxy;
  exports.RelaksWordpressDataSource = RelaksWordpressDataSource;
  exports.RelaksWordpressDataSourceError = RelaksWordpressDataSourceError;
  exports.RelaksWordpressDataSourceEvent = RelaksWordpressDataSourceEvent;
  exports.RelaksWordpressDataSourceProxy = RelaksWordpressDataSourceProxy;
  exports.default = RelaksWordpressDataSource;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
