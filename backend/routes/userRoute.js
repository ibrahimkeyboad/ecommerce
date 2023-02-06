const express = require('express');
const { protect, admin } = require('../controllers/authController');
const {
  loginUser,
  registerUser,
  UpdateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.route('/').get(protect, admin, getUsers);

router.put('/profile', protect, UpdateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById);
module.exports = router;
