function RelaksWordpressDataSourceProxy(dataSource) {
    this.dataSource = dataSource;
}

var prototype = RelaksWordpressDataSourceProxy.prototype;

prototype.fetchOne = function(url, id, options) {
    return this.dataSource.fetchOne(url, id, options);
};

prototype.fetchList = function(url, options) {
    return this.dataSource.fetchList(url, options);
};

prototype.fetchMultiple = function(url, ids, options) {
    return this.dataSource.fetchMultiple(url, ids, options);
};

prototype.fetchPage = function(url, page, options) {
    return this.dataSource.fetchPage(url, page, options);
};

module.exports = RelaksWordpressDataSourceProxy;
