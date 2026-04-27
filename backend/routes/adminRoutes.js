const express = require('express');
const router = express.Router();
const {
  getUsers,
  deleteUser,
  getPendingRecipes,
  updateRecipeStatus,
  createCategory,
  getCategories
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// User Management
router.route('/users')
  .get(protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);

// Recipe Approval
router.get('/recipes/pending', protect, admin, getPendingRecipes);
router.patch('/recipes/:id/status', protect, admin, updateRecipeStatus);

// Category Management
router.route('/categories')
  .get(getCategories) // Make it public to fetch options
  .post(protect, admin, createCategory);

module.exports = router;
