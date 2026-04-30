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

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalChefs,
      totalAdmins,
      suspendedUsers,
      totalRecipes,
      pendingRecipes,
      approvedRecipes,
      rejectedRecipes,
      totalCategories,
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: 'chef' }),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ isSuspended: true }),
      Recipe.countDocuments({}),
      Recipe.countDocuments({ status: 'Pending' }),
      Recipe.countDocuments({ status: 'Approved' }),
      Recipe.countDocuments({ status: 'Rejected' }),
      Category.countDocuments({}),
    ]);

    res.json({
      users: {
        total: totalUsers,
        chefs: totalChefs,
        admins: totalAdmins,
        suspended: suspendedUsers,
      },
      recipes: {
        total: totalRecipes,
        pending: pendingRecipes,
        approved: approvedRecipes,
        rejected: rejectedRecipes,
      },
      categories: {
        total: totalCategories,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      res.status(400);
      throw new Error('Admins cannot delete their own account');
    }

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

// @desc    Suspend or unsuspend a user
// @route   PATCH /api/admin/users/:id/suspension
// @access  Private/Admin
const updateUserSuspension = async (req, res, next) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      res.status(400);
      throw new Error('Admins cannot suspend their own account');
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.isSuspended = req.body.isSuspended;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isSuspended: updatedUser.isSuspended,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { role } = req.body;

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user._id.toString() === req.user._id.toString() && role !== 'admin') {
      res.status(400);
      throw new Error('Admins cannot remove their own admin role');
    }

    user.role = role;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isSuspended: updatedUser.isSuspended,
    });
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

// @desc    Update a category
// @route   PUT /api/admin/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    category.name = req.body.name !== undefined ? req.body.name : category.name;
    category.description =
      req.body.description !== undefined ? req.body.description : category.description;
    category.image = req.body.image !== undefined ? req.body.image : category.image;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a category
// @route   DELETE /api/admin/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    await Recipe.updateMany({ category: category._id }, { $unset: { category: '' } });
    await category.deleteOne();

    res.json({ message: 'Category removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
