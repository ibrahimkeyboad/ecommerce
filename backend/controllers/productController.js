const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');

exports.getProducts = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(limit)
    .skip(skip);
  res.status(200).json({
    products,
    pages: Math.ceil(count / limit),
    page,
  });
});
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('reviews');
  res.status(200).json({
    status: 'success',
    product,
  });
});
