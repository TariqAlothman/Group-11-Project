const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const {
  addFavorite,
  getFavorites,
  removeFavorite,
  getShoppingList,
  addToShoppingList,
  updateShoppingListItem,
  addCookingHistory,
  getCookingHistory
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

router.route('/favorites')
  .get(protect, getFavorites)
  .post(
    protect,
    [
      body('recipeId').isMongoId().withMessage('A valid recipeId is required'),
      handleValidationErrors,
    ],
    addFavorite
  );

router.delete(
  '/favorites/:recipeId',
  protect,
  [
    param('recipeId').isMongoId().withMessage('A valid recipeId is required'),
    handleValidationErrors,
  ],
  removeFavorite
);

router.route('/shopping-list')
  .get(protect, getShoppingList)
  .post(
    protect,
    [
      body('item').trim().notEmpty().withMessage('Item is required'),
      body('quantity').trim().notEmpty().withMessage('Quantity is required'),
      handleValidationErrors,
    ],
    addToShoppingList
  );

router.put(
  '/shopping-list/:itemId',
  protect,
  [
    param('itemId').isMongoId().withMessage('A valid itemId is required'),
    body('status').optional().isBoolean().withMessage('Status must be true or false'),
    handleValidationErrors,
  ],
  updateShoppingListItem
);

router.route('/history')
  .get(protect, getCookingHistory)
  .post(
    protect,
    [
      body('recipeId').isMongoId().withMessage('A valid recipeId is required'),
      handleValidationErrors,
    ],
    addCookingHistory
  );

module.exports = router;
