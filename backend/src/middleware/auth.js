import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import AppError from '../utils/AppError.js';

export const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AppError('Authentication required', 401));
  }
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }
};