import express from 'express';
import asyncHandler from 'express-async-handler';
import responseHandler from '../responseHandler/index.js';
import User from '../user/userModel.js';

const router = express.Router();

// Get favorites
router.get('/:userId', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    id: req.params.userId,
  });
  if (!user) {
    responseHandler.notFound(res, 'Favorites not found. User not found.');
  } else {
    responseHandler.success(res, 'Favorites retrieved successfully.', user.likes);
  }
}));

// Add to favorites
router.put('/:userId/:recipeId', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    id: req.params.userId,
  });
  if (!user) {
    responseHandler.notFound(res, 'Update failed. User not found.');
  } else {
    try {
      user.likes.push(req.params.recipeId);
      await user.save();
      responseHandler.success(res, 'Recipe added to favorites', null);
    } catch (error) {
      responseHandler.error(res, 'Opps, something is wrong...');
    }
  }
}));

// Remove from favorites
router.delete('/:userId/:recipeId', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    id: req.params.userId,
  });
  if (!user) {
    responseHandler.notFound(res, 'Update failed. User not found.');
  } else {
    try {
      user.likes = user.likes.filter((recipe) => recipe != req.params.recipeId);
      await user.save();
      responseHandler.success(res, 'Recipe removed from favorites', null);
    } catch (error) {
      responseHandler.error(res, 'Opps, something is wrong...');
    }
  }
}));

export default router;