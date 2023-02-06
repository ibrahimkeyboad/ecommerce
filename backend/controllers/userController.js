const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const token = require('../utils/token');

exports.registerUser = catchAsync(async (req, res, next) => {
  const { email, name, password } = req.body;
  const userExist = await User.findOne({ email });
  // console.log(email, name, password);
  if (userExist) {
    // console.log(userExist);
    return next(new AppError('User already exist', 400));
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  // console.log(user);

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token(user._id),
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(email, password);

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      status: 'success',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token(user._id),
      },
    });
  } else {
    next(new AppError('Invalid email or password', 401));
  }
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  // console.log(users);
  if (!users) {
    return next(AppError('not found', 404));
  }
  res.status(200).json({
    users,
  });
});
exports.UpdateUserProfile = catchAsync(async (req, res, next) => {
  const user = User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = user.body.email || user.email;
    if (req.body.password) {
      user.password = user.body.password;
    }
  }
  if (!user) {
    // console.log(user);

    return next(new AppError('No user Found!', 404));
  }
  const updateUser = await user.save();
  res.status(200).json(updateUser);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('User not found!', 404));
  }

  res.status(204).json({ message: `User ${user.name} was deleted ` });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  console.log(user);
  if (!user) {
    return next(new AppError('User not fount', 404));
  }
  res.status(200).json(user);
});

exports.UpdateUser = catchAsync(async (req, res, next) => {
  const user = User.findById(req.params.id);
  if (!user) {
    return next(new AppError('No user Found!', 404));
  }
  if (user) {
    user.isAdmin = req.body.isAdmin;
  }
  const updateUser = await user.save();
  res.status(200).json(updateUser);
});
