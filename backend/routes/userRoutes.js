const express = require('express');
const router = express.Router();
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

router.route('/favorites')
  .get(protect, getFavorites)
  .post(protect, addFavorite);

router.delete('/favorites/:recipeId', protect, removeFavorite);

router.route('/shopping-list')
  .get(protect, getShoppingList)
  .post(protect, addToShoppingList);

router.put('/shopping-list/:itemId', protect, updateShoppingListItem);

router.route('/history')
  .get(protect, getCookingHistory)
  .post(protect, addCookingHistory);

module.exports = router;
