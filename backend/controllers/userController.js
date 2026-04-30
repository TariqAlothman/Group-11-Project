const User = require('../models/User');
const Recipe = require('../models/Recipe');

// @desc    Add to favorites
// @route   POST /api/users/favorites
// @access  Private
const addFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { recipeId } = req.body;
    const recipe = await Recipe.findOne({ _id: recipeId, status: 'Approved' });

    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }

    if (!user.favorites.some((id) => id.toString() === recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }
    res.json(user.favorites);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove from favorites
// @route   DELETE /api/users/favorites/:recipeId
// @access  Private
const removeFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.params.recipeId
    );
    await user.save();
    res.json(user.favorites);
  } catch (error) {
    next(error);
  }
};

// @desc    Get shopping list
// @route   GET /api/users/shopping-list
// @access  Private
const getShoppingList = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.shoppingList);
  } catch (error) {
    next(error);
  }
};

// @desc    Add to shopping list
// @route   POST /api/users/shopping-list
// @access  Private
const addToShoppingList = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { item, quantity } = req.body;
    
    user.shoppingList.push({ item: item.trim(), quantity: quantity.trim() });
    await user.save();
    res.json(user.shoppingList);
  } catch (error) {
    next(error);
  }
};

// @desc    Update shopping list item status
// @route   PUT /api/users/shopping-list/:itemId
// @access  Private
const updateShoppingListItem = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const listItem = user.shoppingList.id(req.params.itemId);
    
    if (listItem) {
      listItem.status = req.body.status !== undefined ? req.body.status : listItem.status;
      await user.save();
      res.json(user.shoppingList);
    } else {
      res.status(404);
      throw new Error('Item not found in shopping list');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Remove shopping list item
// @route   DELETE /api/users/shopping-list/:itemId
// @access  Private
const removeShoppingListItem = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const listItem = user.shoppingList.id(req.params.itemId);

    if (!listItem) {
      res.status(404);
      throw new Error('Item not found in shopping list');
    }

    user.shoppingList.pull({ _id: req.params.itemId });
    await user.save();
    res.json(user.shoppingList);
  } catch (error) {
    next(error);
  }
};

// @desc    Clear completed shopping list items
// @route   DELETE /api/users/shopping-list/completed
// @access  Private
const clearCompletedShoppingList = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.shoppingList = user.shoppingList.filter((item) => !item.status);
    await user.save();
    res.json(user.shoppingList);
  } catch (error) {
    next(error);
  }
};

// @desc    Add to cooking history
// @route   POST /api/users/history
// @access  Private
const addCookingHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { recipeId } = req.body;
    const recipe = await Recipe.findOne({ _id: recipeId, status: 'Approved' });

    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }
    
    user.cookingHistory.push({ recipeId });
    await user.save();
    res.json(user.cookingHistory);
  } catch (error) {
    next(error);
  }
};

// @desc    Get cooking history
// @route   GET /api/users/history
// @access  Private
const getCookingHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('cookingHistory.recipeId');
    res.json(user.cookingHistory);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
  getShoppingList,
  addToShoppingList,
  updateShoppingListItem,
  removeShoppingListItem,
  clearCompletedShoppingList,
  addCookingHistory,
  getCookingHistory
};
