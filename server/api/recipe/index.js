import express from 'express';
import asyncHandler from 'express-async-handler';
import responseHandler from '../responseHandler/index.js';
import Recipe from './recipeModel.js';
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  try {
    const recipes = await Recipe.find();
    responseHandler.success(res, 'All recipes fetched successfully', recipes);
  } catch (err) {
    responseHandler.error(res, 'Error fetching recipes');
  }
}));

router.get('/length', asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findOne().sort({ id: -1 });
    if (recipe) {
      responseHandler.success(res, 'Successfully fetched length.', recipe.id);
    } else {
      responseHandler.notFound(res, 'No recipe found.');
    }
  } catch (err) {
    responseHandler.error(res, 'Error fetching recipes id');
  }
}));

router.get('/:recipeId', asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ id: req.params.recipeId });
    if (recipe) {
      responseHandler.success(res, 'Recipe fetched successfully', recipe);
    } else {
      responseHandler.notFound(res, 'Recipe not found');
    }
  } catch (err) {
    responseHandler.error(res, 'Error fetching recipe');
  }
}));

router.post('/', asyncHandler(async (req, res) => {
  try {
    const lastRecipe = await Recipe.findOne().sort({ id: -1 });
    const nextId = lastRecipe ? lastRecipe.id + 1 : 1;

    const recipe = new Recipe({ ...req.body, id: nextId, user: req.body.id });
    await recipe.save();
    responseHandler.success(res, 'Recipe created successfully', { nextId });
  } catch (err) {
    responseHandler.badRequest(res, 'Error creating recipe');
  }
}));

router.put('/:recipeId', asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  const recipe = await Recipe.findOne({ id: req.params.recipeId });
  if (recipe) {
    Object.assign(recipe, req.body);
    try {
      await recipe.save();
      responseHandler.success(res, 'Recipe updated successfully', { recipe });
    } catch (err) {
      responseHandler.badRequest(res, 'Update failed');
    }
  } else {
    responseHandler.notFound(res, 'Recipe not found');
  }
}));

router.delete('/:recipeId', asyncHandler(async (req, res) => {
  const recipe = await Recipe.findOne({ id: req.params.recipeId });
  if (recipe) {
    await recipe.remove();
    responseHandler.success(res, 'Recipe deleted successfully');
  } else {
    responseHandler.notFound(res, 'Recipe not found');
  }
}));

export default router;