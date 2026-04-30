const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const {
  getUsers,
  deleteUser,
  getPendingRecipes,
  updateRecipeStatus,
  createCategory,
  getCategories
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

// User Management
router.route('/users')
  .get(protect, admin, getUsers);
router.delete(
  '/users/:id',
  protect,
  admin,
  [
    param('id').isMongoId().withMessage('A valid user id is required'),
    handleValidationErrors,
  ],
  deleteUser
);

// Recipe Approval
router.get('/recipes/pending', protect, admin, getPendingRecipes);
router.patch(
  '/recipes/:id/status',
  protect,
  admin,
  [
    param('id').isMongoId().withMessage('A valid recipe id is required'),
    body('status')
      .isIn(['Pending', 'Approved', 'Rejected'])
      .withMessage('Status must be Pending, Approved, or Rejected'),
    handleValidationErrors,
  ],
  updateRecipeStatus
);

// Category Management
router.route('/categories')
  .get(getCategories) // Make it public to fetch options
  .post(
    protect,
    admin,
    [
      body('name').trim().notEmpty().withMessage('Category name is required'),
      body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
      handleValidationErrors,
    ],
    createCategory
  );

module.exports = router;
