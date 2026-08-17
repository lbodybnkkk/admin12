import AppError from '../utils/AppError.js';

export const notFound = (req, res, next) => {
  next(new AppError(`Not found - ${req.originalUrl}`, 404));
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'PrismaClientKnownRequestError') {
    statusCode = 400;
    message = 'Database error';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${message}`);
  res.status(statusCode).json({ error: message });
};