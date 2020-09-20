//This is the global error class which is inheriting from the in-built
// Error class in JS

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;

    this.isOperational = true; // Operational error are those which occurs due to users

    Error.captureStackTrace(this, this.constructor); // This will capture the stack trace of the error
  }
}

module.exports = AppError;
