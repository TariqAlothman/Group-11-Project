const Recipe = require('../models/Recipe');

// @desc    Get all approved recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res, next) => {
  try {
    const filters = { status: 'Approved' };

    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.difficulty) {
      filters.difficulty = req.query.difficulty;
    }

    if (req.query.search) {
      filters.title = { $regex: req.query.search.trim(), $options: 'i' };
    }

    const recipes = await Recipe.find(filters)
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get recipes created by the logged-in chef/admin
// @route   GET /api/recipes/my-recipes
// @access  Private (Chef/Admin)
const getMyRecipes = async (req, res, next) => {
  try {
    const filters = { author: req.user._id };

    if (req.query.status) {
      filters.status = req.query.status;
    }

    const recipes = await Recipe.find(filters)
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'name')
      .populate('category', 'name');
    
    if (recipe) {
      const isAuthor =
        req.user && recipe.author && recipe.author._id.toString() === req.user._id.toString();
      const isPrivileged =
        req.user && (req.user.role === 'admin' || req.user.role === 'chef');

      // Only return if it's approved OR user is the author OR user is admin/chef
      if (recipe.status === 'Approved' || isAuthor || isPrivileged) {
        res.json(recipe);
      } else {
        res.status(403);
        throw new Error('Not authorized to view this pending recipe');
      }
    } else {
      res.status(404);
      throw new Error('Recipe not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private (Chef)
const createRecipe = async (req, res, next) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      author: req.user._id,
      status: 'Pending' // Requires admin approval
    });

    const createdRecipe = await recipe.save();
    res.status(201).json(createdRecipe);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Private (Chef author or Admin)
const updateRecipe = async (req, res, next) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      // Check if user is author or admin
      if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to update this recipe');
      }

      const updates = { ...req.body };
      delete updates.author;
      delete updates.comments;
      delete updates.likes;

      if (req.user.role !== 'admin') {
        delete updates.status;
      }

      recipe = Object.assign(recipe, updates);
      
      // If chef edits, it goes back to pending unless admin edits
      if (req.user.role !== 'admin') {
         recipe.status = 'Pending';
      }

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

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private (Chef author or Admin)
const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to delete this recipe');
      }

      await recipe.deleteOne();
      res.json({ message: 'Recipe removed' });
    } else {
      res.status(404);
      throw new Error('Recipe not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecipes,
  getMyRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
