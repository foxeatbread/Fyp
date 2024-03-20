import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    recipeId: Number,
    username: String,
    content: String,
    date: Date
})

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
