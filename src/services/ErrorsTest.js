class ResponseError extends Error {
  constructor(response = {}) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(response);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError);
    }

    this.name = 'ResponseError';
    // Custom debugging information
    this.message = response;
  }
}

module.exports = {ResponseError};
