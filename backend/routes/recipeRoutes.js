const express = require('express');
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');
const { protect, chef, admin } = require('../middleware/authMiddleware');

// Public route to get all recipes, will just not pass user context if not logged in
router.get('/', getRecipes);

// Public or private depending on status
router.get('/:id', getRecipeById);

// Chef/Admin routes
router.post('/', protect, chef, createRecipe);
router.put('/:id', protect, chef, updateRecipe);
router.delete('/:id', protect, chef, deleteRecipe);

module.exports = router;
