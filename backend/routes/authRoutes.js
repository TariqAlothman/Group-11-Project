const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    handleValidationErrors,
  ],
  registerUser
);

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors,
  ],
  loginUser
);

router.post(
  '/forgot-password',
  [
    body('email').trim().isEmail().withMessage('Valid email is required'),
    handleValidationErrors,
  ],
  forgotPassword
);

router.post(
  '/reset-password/:token',
  [
    param('token')
      .isLength({ min: 64, max: 64 })
      .withMessage('A valid reset token is required')
      .isHexadecimal()
      .withMessage('A valid reset token is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    handleValidationErrors,
  ],
  resetPassword
);

router.get('/profile', protect, getUserProfile);
router.put(
  '/profile',
  protect,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().trim().isEmail().withMessage('Valid email is required'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('currentPassword')
      .optional()
      .notEmpty()
      .withMessage('Current password cannot be empty'),
    handleValidationErrors,
  ],
  updateUserProfile
);

module.exports = router;
