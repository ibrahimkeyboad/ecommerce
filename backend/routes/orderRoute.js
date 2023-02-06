const express = require('express');
const { protect } = require('../controllers/authController');
const {
  createOrder,
  getOrder,
  updateOrder,
  userOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/get', protect, userOrder);
router.route('/:id').get(protect, getOrder).put(protect, updateOrder);

module.exports = router;
