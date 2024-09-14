import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ChatterError from '../utils/ChatterError.js';

dotenv.config();
mongoose.Error.ValidationError;
/**
 *
 * @param {Error | ChatterError | mongoose.Error} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 *
 * description: This function is an error handler middleware
 * that will be used to handle errors throwen in the application.
 */
function errorHandler(err, req, res, next) {
  let error = err;
  // check if error is an instance of ChatterError to keep the error structure consistent
  if (!(error instanceof ChatterError)) {
    const statusCode =
      error instanceof mongoose.Error.ValidationError ? 400 : 500;
    const message = error.message || 'Something went wrong';
    error = new ChatterError(statusCode, message, err.stack);
  }
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  const stack =
    process.env.NODE_ENV === 'development' ? error.stack : undefined;
  res.status(status).json({
    success: false,
    message,
    stack,
    ...error,
  });
}

export default errorHandler;
