import express from 'express';
import asyncHandler from 'express-async-handler';
import responseHandler from '../responseHandler/index.js';
import Comment from './commentModel.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const comments = await Comment.find();
  responseHandler.success(res, 'Recipe comments got suc', comments);
}))

// Get comments by recipeId
router.get('/:recipeId', asyncHandler(async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const comments = await Comment.find();
    const commentsById = comments.filter(comment => comment.recipeId == recipeId);
    responseHandler.success(res, 'Recipe comments got successfully.', commentsById);
  } catch (error) {
    responseHandler.notFound(res, 'Comments not found.');
    console.log('Failed to find comment:', error);
  }
}));

// Add one comment
router.post('/', asyncHandler(async (req, res) => {
  const newComment = req.body;
  try {
    const addedComment = await Comment.create(newComment);
    responseHandler.success(res, 'Comment created successfully.', addedComment);
  } catch (error) {
    responseHandler.error(res, 'Failed to create comment.');
    console.log("Failed to add one comment:", error);
  }
}));

// Edit one comment
router.put('/:commentId', asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const updatedComment = req.body;
  try {
    const editedComment = await Comment.findByIdAndUpdate(commentId, updatedComment, { new: true });
    responseHandler.success(res, 'Comment edited successfully.', editedComment)
  } catch (error) {
    responseHandler.error(res, 'Failed to edit comment.');
    console.log("Failed to edit one comment:", error);
  }
}));

// Delete one comment
router.delete('/:commentId', asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  try {
    await Comment.findByIdAndDelete(commentId);
    responseHandler.success(res, 'Comment deleted successfully.');
  } catch (error) {
    responseHandler.error(res, 'Failed to delete comment.');
    console.log("Failed to delete one comment:", error);
  }
}));

export default router;