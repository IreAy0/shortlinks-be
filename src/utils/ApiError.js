class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '', errorObject = null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    if (errorObject) {
      console.log('this.constructor', this.constructor);
      this.error = errorObject;
    }
  }
}

module.exports = ApiError;
