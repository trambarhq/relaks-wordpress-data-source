class RelaksWordpressDataSourceError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export {
  RelaksWordpressDataSourceError,
  RelaksWordpressDataSourceError as DataSourceError,
};
