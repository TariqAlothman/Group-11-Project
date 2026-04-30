const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');
const { protect, chef } = require('../middleware/authMiddleware');
const { optionalProtect } = require('../middleware/optionalAuthMiddleware');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

// Public route to get all recipes, will just not pass user context if not logged in
router.get(
  '/',
  [
    query('category').optional().isMongoId().withMessage('Category must be a valid id'),
    query('difficulty')
      .optional()
      .isIn(['Easy', 'Medium', 'Hard'])
      .withMessage('Difficulty must be Easy, Medium, or Hard'),
    query('search').optional().trim().notEmpty().withMessage('Search cannot be empty'),
    handleValidationErrors,
  ],
  getRecipes
);

// Public or private depending on status
router.get(
  '/:id',
  optionalProtect,
  [
    param('id').isMongoId().withMessage('A valid recipe id is required'),
    handleValidationErrors,
  ],
  getRecipeById
);

// Chef/Admin routes
router.post(
  '/',
  protect,
  chef,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('prepTime').isInt({ min: 0 }).withMessage('Prep time must be a non-negative integer'),
    body('cookTime').isInt({ min: 0 }).withMessage('Cook time must be a non-negative integer'),
    body('servings').isInt({ min: 1 }).withMessage('Servings must be at least 1'),
    body('difficulty')
      .optional()
      .isIn(['Easy', 'Medium', 'Hard'])
      .withMessage('Difficulty must be Easy, Medium, or Hard'),
    body('category').optional({ values: 'falsy' }).isMongoId().withMessage('Category must be a valid id'),
    body('ingredients').isArray({ min: 1 }).withMessage('At least one ingredient is required'),
    body('instructions').isArray({ min: 1 }).withMessage('At least one instruction is required'),
    handleValidationErrors,
  ],
  createRecipe
);

router.put(
  '/:id',
  protect,
  chef,
  [
    param('id').isMongoId().withMessage('A valid recipe id is required'),
    body('difficulty')
      .optional()
      .isIn(['Easy', 'Medium', 'Hard'])
      .withMessage('Difficulty must be Easy, Medium, or Hard'),
    body('category').optional({ values: 'falsy' }).isMongoId().withMessage('Category must be a valid id'),
    handleValidationErrors,
  ],
  updateRecipe
);

router.delete(
  '/:id',
  protect,
  chef,
  [
    param('id').isMongoId().withMessage('A valid recipe id is required'),
    handleValidationErrors,
  ],
  deleteRecipe
);

module.exports = router;
