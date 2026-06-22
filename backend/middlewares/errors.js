//@ts-nocheck
const ErrorHandler = require('../utils/errorHandler');
module.exports = (err, req, res, next) => {
  // Default Error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Invalid MongoDB ObjectId
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found. Invalid: ${err.path}`;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const errors = {};

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    message = `${Object.keys(err.keyValue)[0]} already exists`;
  }

  // Invalid JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid Token. Please login again.';
  }

  // Expired JWT
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired. Please login again.';
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
