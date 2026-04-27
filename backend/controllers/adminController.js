const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Category = require('../models/Category');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all pending recipes
// @route   GET /api/admin/recipes/pending
// @access  Private/Admin
const getPendingRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ status: 'Pending' }).populate('author', 'name');
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

// @desc    Update recipe status (Approve/Reject)
// @route   PATCH /api/admin/recipes/:id/status
// @access  Private/Admin
const updateRecipeStatus = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    const { status } = req.body;

    if (recipe) {
      recipe.status = status;
      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe);
    } else {
      res.status(404);
      throw new Error('Recipe not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a category
// @route   POST /api/admin/categories
// @access  Private/Admin
const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
// @route   GET /api/admin/categories
// @access  Public (can be used in frontend forms)
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getPendingRecipes,
  updateRecipeStatus,
  createCategory,
  getCategories
};
