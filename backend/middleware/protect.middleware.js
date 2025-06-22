
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Admin } from '../models/admin.models.js';

export const protect = asyncHandler(async (req, res, next) => {
  // 1) grab token
  const token =
    req.cookies.accessToken ||
    (req.headers.authorization?.startsWith('Bearer')
      && req.headers.authorization.split(' ')[1]);

  if (!token) {
    throw new ApiError(401, 'Not authenticated');
  }

  // 2) verify & attach user
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, 'Invalid token');
  }

  const user = await Admin.findById(decoded._id).select('-password -refreshToken');
  if (!user) throw new ApiError(401, 'User not found');

  req.user = user;
  next();
});