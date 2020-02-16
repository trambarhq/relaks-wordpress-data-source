class RelaksWordpressDataSourceProxy {
  fetchOne(url, id, options) {
    return this.dataSource.fetchOne(url, id, options);
  }

  fetchList(url, options) {
    return this.dataSource.fetchList(url, options);
  }

  fetchMultiple(url, ids, options) {
    return this.dataSource.fetchMultiple(url, ids, options);
  }

  fetchPage(url, page, options) {
    return this.dataSource.fetchPage(url, page, options);
  }
}

export {
  RelaksWordpressDataSourceProxy,
  RelaksWordpressDataSourceProxy as DataSourceProxy,
};
