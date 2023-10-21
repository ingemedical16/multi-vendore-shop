import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;
  const authorization = req.headers.authorization;
  if(authorization){
    token = authorization.slice(7, authorization.length); // Bearer XXXXXX 
  }else if(req.cookies.jwt){
    token = req.cookies.jwt
  }
 
 /*  */

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const isAdmin = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401);
      throw new Error(`${req.user.role} can not access this resources!`);
    }
    next();
  };
};

const isSeller = asyncHandler(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    res.status(401);
    throw new Error('Please login to continue');
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});

export { isAuthenticated, isAdmin, isSeller };
