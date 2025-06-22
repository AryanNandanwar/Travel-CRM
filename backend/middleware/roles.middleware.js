
import { ApiError } from '../utils/ApiError.js';

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    throw new ApiError(403, 'Forbidden: insufficient privileges');
  }
  next();
};