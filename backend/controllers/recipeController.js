const Recipe = require('../models/Recipe');

// @desc    Get all approved recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ status: 'Approved' }).populate('author', 'name').populate('category', 'name');
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
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name').populate('category', 'name');
    
    if (recipe) {
      // Only return if it's approved OR user is the author OR user is admin/chef
      if (recipe.status === 'Approved' || 
         (req.user && (req.user.role === 'admin' || req.user.role === 'chef' || recipe.author._id.toString() === req.user._id.toString()))) {
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

      recipe = Object.assign(recipe, req.body);
      
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
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
