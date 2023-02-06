const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('colors');
const mogarn = require('morgan');
const AppError = require('./utils/appError');
const globalError = require('./utils/errorController');
const reviewRouters = require('./routes/reviewRoute');
const productRouters = require('./routes/ProductRoute');
const userRouters = require('./routes/userRoute');
const orderRouters = require('./routes/orderRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(mogarn('dev'));
}
app.use(express.json());
app.use(cors());

app.use('/api/products', productRouters);
app.use('/api/reviews', reviewRouters);
app.use('/api/user', userRouters);
app.use('/api/order', orderRouters);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalError);

module.exports = app;
