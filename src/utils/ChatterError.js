/**
 * @description Custom error class for handling errors in Chatter API
 */
class ChatterError extends Error {
  /**
   *
   * @param {number} statusCode
   * @param {string} message
   * @param {string} stack
   */
  constructor(statusCode, message = 'Something went wrong', stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ChatterError;
