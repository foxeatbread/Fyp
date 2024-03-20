import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String
});

const RecipeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  ingredients: [ingredientSchema],
  instructions: String,
  videoUrl: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

export default Recipe;

