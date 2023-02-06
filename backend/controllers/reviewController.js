const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.setProductDetails = (req, res, next) => {
  console.log(req.params.productId);
  //Allow nested routers
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;

  next();
};

exports.createReview = catchAsync(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json({
    review,
  });
});

exports.getAllreview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  console.log(reviews);

  if (!reviews) {
    return next(new AppError('No review Found!', 404));
  }

  res.status(200).json(reviews);
});
