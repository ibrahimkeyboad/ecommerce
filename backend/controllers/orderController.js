const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    cartShip,
    cartPayment,
    orderItems,
    shippingPrice,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (!orderItems) {
    return next(new AppError('No item found', 400));
  }
  const order = new Order({
    orderItems,
    shippingAddress: cartShip,
    paymentMethod: cartPayment,
    user: req.user._id,
    shippingPrice,
    orderPrice: itemsPrice,
    taxPrice,
    totalPrice,
  });

  const createOrder = await order.save();

  res.status(201).json(createOrder);
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: 'user',
    select: 'name email',
  });

  if (!order) {
    return next(new AppError('order not found', 404));
  }

  res.status(200).json(order);
});
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('order not found', 404));
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: re.body.update_time,
    email_address: req.body.payer.email_address,
  };
  const upOrder = await order.save();
  res.status(200).json(upOrder);
});

exports.userOrder = catchAsync(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id });

  res.status(200).json(order);
});
