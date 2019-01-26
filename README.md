Relaks Wordpress Data Source
============================
This module lets you access a Wordpress server from a React app that use [Relaks](https://github.com/trambarhq/relaks).

* [Installation](#installation)
* [Usage](#usage)
* [Options](#options)
* [Methods](#methods)
* [Hooks](#hooks)
* [Events](#events)
* [Examples](#examples)

## Installation

```sh
npm --save-dev install relaks-wordpress-data-source
```

## Usage

```javascript
import WordpressDataSource from 'relaks-wordpress-data-source';

let options = {
    baseURL: 'http://localhost/wp-json',
    refreshInterval: 60 * 1000,
};
let dataSource = new WordpressDataSource(options);
dataSource.activate();
```

```javascript
/* Root-level React component */
class FrontEnd extends PureComponent {
    constructor(props) {
        super(props);
        let { dataSource } = props;
        this.state = {
            database: new Database(dataSource);
        }
    }

    componentDidMount() {
        let { dataSource } = this.props;
        dataSource.addEventListener('change', this.handleDataSourceChange);
    }

    /* ... */

    handleDataSourceChange = (evt) => {
        let { dataSource } = this.props;
        let database = new Database(dataSource);
        this.setState({ database });
    }
}
```

Components are expected to access functionalities of the data source through a proxy object--`Database` in the sample code above. See the documentation of Relaks for an [explanation](https://github.com/trambarhq/relaks#proxy-objects). A [default implementation](https://github.com/trambarhq/relaks-wordpress-data-source/blob/master/proxy.js) is provided for reference purpose. It's recommended that you create your own.

## Options

* [baseURL](#baseurl)
* [fetchFunc](#fetchfunc)
* [permalinks](#permalinks)
* [refreshInterval](#refreshinterval)

### baseURL

The base URL of the remote server. It'll be added to any URL that isn't absolute.

### fetchFunc

An alternative function to be used in place of the browser's built-in `fetch()`.

### permalinks

A boolean indicating whether the server is using permalinks.

Default: `true`

### refreshInterval

The amount of time, in milliseconds, to wait before rerunning data queries to ensure freshness. The data source caches all queries. When a query matches one that was performed before, the results obtained earlier will be returned immediately. If the amount of time elapsed since exceeds `refreshInterval`, the data source will rerun the query. If the results differ in anyway, a `change` event will occur.

You can also manually flag queries as out-of-date by calling [invalidate()](#invalidate).

## Methods

**Event listeners:**

* [addEventListener()](#addeventlistener)
* [removeEventListener()](#removeeventlistener)
* [waitForEvent()](#waitforevent)

**Activation**

* [activate()](#activate)
* [deactivate()](#deactivate)

**Data retrieval:**

* [fetchList()](#fetchlist)
* [fetchMultiple()](#fetchmultiple)
* [fetchOne()](#fetchone)
* [fetchPage()](#fetchpage)

**Cache invalidation:**

* [invalidate()](#invalidate)

**HTTP request:**

* [get()](#get)

### addEventListener()

```typescript
function addEventListener(name: string, handler: function, beginning?:boolean): void
```

Attach an event listener to the data source. `handler` will be called whenever events of `type` occur. When `beginning` is true, the listener will be place before any existing listeners. It's otherwise added at the end of the list.

Inherited from [relaks-event-emitter](https://github.com/trambarhq/relaks-event-emitter).

### removeEventListener()

```typescript
function removeEventListener(name: string, handler: function): void
```

Detach an event listener from the data source. `handler` and `type` must match what were given to `addEventListener()`.

Inherited from [relaks-event-emitter](https://github.com/trambarhq/relaks-event-emitter).

### waitForEvent()

```typescript
async function waitForEvent(type: string): Event
```

Return a promise that is fulfilled when an event of the specified type occurs.

Inherited from [relaks-event-emitter](https://github.com/trambarhq/relaks-event-emitter).

### activate()

```typescript
function activate(): void
```

Activate the data source, allowing it to fetch data from a remote server.

### deactivate()

```typescript
function deactivate(): void
```

Deactivate the data source, keeping it from performing data requests. Operations that require accessing a remote server will be on hold indefinitely, until `activate()` is called.

The data source will continue to return cached data after its deactivation.

### fetchList()

```typescript
async function fetchList(url: string, options?: object): object[]
```

Conceptually, fetch all objects in a directory. In actuality, the method will only return the first page of results initially (when pagination is enabled). Attached to the returned array will be a method called `more()`. When it's called, an additional page will be fetched and appended to the list.

This method is designed for handling large result sets with continuous scrolling (as opposed to traditional pagination).

In addition to `more()`, the returned array will also have the property `total`. It's the number of objects in the directory on the server. The standard property `length` gives the number of objects already retrieved.

`more()` and `total` are always present, even when pagination is not available. A call to `more()` does nothing when there are no more pages.

By default, `fetchList()` will return as soon as it has one page of results. Specifying the option `minimum` forces it to wait until a certain number of objects have become available. When `minimum` is a negative number, that's interpreted as the difference from the total. When `minimum` is a string, it's expected to hold a percentage of the total. For example, `100%` means the complete data set.

**Options:**

* `minimum` - the minimum number of objects to fetch (default: any)

### fetchMultiple()

```typescript
async function fetchMultiple(urls: string[], ids: number[], options?: object): object[]
```

```typescript
async function fetchMultiple(urls: string[], slugs: string[], options?: object): object[]
```

Fetch multiple objects in a single call.

By default, the promise returned by `fetchMultiple()` is not fulfilled until every object is retrieved from the remote server. When the option `minimum` is specified, the promise will fulfill immediately when the number of cached objects meets the requirement. `null` will appear in place of an object in the array when it's uncached. When the uncached objects eventually arrive, the data source emits a `change` event. Subsequent calls to `fetchMultiple()` will then return all requested objects.

**Options:**

* `minimum` - the minimum number of objects to fetch (default: all)

### fetchOne()

```typescript
async function fetchOne(url: string, id: number, options?: object): object
```

```typescript
async function fetchOne(url: string, slug: string, options?: object): object
```

Fetch an object from the server. This method will check the results of calls to [fetchPage()](#fetchpage) and [fetchList()](#fetchlist) to see if the object in question hasn't been fetched already.

**Options:**

* `afterUpdate` - see [afterUpdate](#afterupdate) (default: "replace")
* `afterDelete` - see [afterDelete](#afterdelete) (default: "remove")

### fetchPage()

```typescript
async function fetchPage(url: string, page: number, options?: object): object[]
```

Fetch a single page of a directory listing. All objects will be returned if the server doesn't support pagination.

**Options:**

* `abbreviated` - indicates that the objects found at `url` do not have all their properties and they should not be used to fulfill calls to `fetchOne()`
* `afterInsert` - see [afterInsert](#afterinsert) (default: `"refresh"`)
* `afterUpdate` - see [afterUpdate](#afterupdate) (default: `"refresh"`)
* `afterDelete` - see [afterDelete](#afterdelete) (default: `"refresh"`)

### invalidate()

```typescript
function invalidate(time: string): boolean
```

Flag matching data queries performed before the specified time as out-of-date. `time` should be an ISO timestamp (a `Date` object is also acceptable). The methods returns `true` when queries have been invalidated and `false` otherwise.

The data source emits a `change` event when queries are invalidated.

### get()

```typescript
async function get(url: string): object
```

Low-level function that performs an HTTP GET operation.

## Events

* [change](#change)

### change

A `change` event is emitted whenever rerunning queries might yield new result sets.

**Properties:**

* `propagationStopped` - whether `stopImmediatePropagation()` was called
* `target` - the data source
* `type` - `"change"`

**Methods:**

* `stopImmediatePropagation()` - stop other listeners from receiving the event

## Examples

* [Zero-latency WordPress FrontEnd](https://github.com/trambarhq/relaks-wordpress-example)

## License

This project is licensed under the MIT License - see the [LICENSE](#LICENSE) file for details
