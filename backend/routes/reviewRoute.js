const express = require('express');
const { protect } = require('../controllers/authController');
const {
  createReview,
  getAllreview,
  setProductDetails,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllreview)
  .post(protect, setProductDetails, createReview);

module.exports = router;
