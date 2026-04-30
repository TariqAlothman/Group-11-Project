const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const {
  getUsers,
  getAdminStats,
  deleteUser,
  updateUserSuspension,
  updateUserRole,
  getPendingRecipes,
  updateRecipeStatus,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

router.get('/stats', protect, admin, getAdminStats);

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
router.patch(
  '/users/:id/suspension',
  protect,
  admin,
  [
    param('id').isMongoId().withMessage('A valid user id is required'),
    body('isSuspended').isBoolean().withMessage('isSuspended must be true or false'),
    handleValidationErrors,
  ],
  updateUserSuspension
);
router.patch(
  '/users/:id/role',
  protect,
  admin,
  [
    param('id').isMongoId().withMessage('A valid user id is required'),
    body('role')
      .isIn(['user', 'chef', 'admin'])
      .withMessage('Role must be user, chef, or admin'),
    handleValidationErrors,
  ],
  updateUserRole
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

router.put(
  '/categories/:id',
  protect,
  admin,
  [
    param('id').isMongoId().withMessage('A valid category id is required'),
    body('name').optional().trim().notEmpty().withMessage('Category name cannot be empty'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('image').optional().trim().notEmpty().withMessage('Image cannot be empty'),
    handleValidationErrors,
  ],
  updateCategory
);

router.delete(
  '/categories/:id',
  protect,
  admin,
  [
    param('id').isMongoId().withMessage('A valid category id is required'),
    handleValidationErrors,
  ],
  deleteCategory
);

module.exports = router;
