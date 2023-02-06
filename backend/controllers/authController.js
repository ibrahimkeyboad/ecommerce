const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // console.log(token);

    return next(
      new AppError('Your are not logged in! please login to access'),
      401
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded);
  req.user = await User.findById(decoded.id).select('-password');
  next();
});

exports.admin = (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin) {
    return next(new AppError('Your not allowed', 401));
  }
  next();
};
