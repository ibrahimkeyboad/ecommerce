const express = require('express');
const { getProducts, getProduct } = require('../controllers/productController');
const reviewRouter = require('./reviewRoute');

const router = express.Router();
router.use('/:productId/review', reviewRouter);
router.route('/').get(getProducts);
router.route('/:id').get(getProduct);

module.exports = router;
