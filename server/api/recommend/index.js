import express from 'express';
import asyncHandler from 'express-async-handler';
import responseHandler from '../responseHandler/index.js';
import axios from 'axios';

const router = express.Router();

// Calculate cosine similarity between two vectors
function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((acc, val) => acc + val ** 2, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((acc, val) => acc + val ** 2, 0));

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}

// Combine recipes based on your recommendation algorithm
function combineRecipes(areaRecipes, categoryRecipes) {
  const combinedRecipes = [];
  areaRecipes.forEach(areaRecipe => {
    if (categoryRecipes.some(categoryRecipe => categoryRecipe.idMeal === areaRecipe.idMeal)) {
      combinedRecipes.push(areaRecipe);
    }
  });
  return combinedRecipes;
}

// Get recipe recommendations based on user input
async function getRecommendations(area, category) {
  try {
    const areaResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const areaRecipes = areaResponse.data.meals;

    const categoryResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const categoryRecipes = categoryResponse.data.meals;

    // Combine recipes based on your recommendation algorithm
    const combinedRecipes = combineRecipes(areaRecipes, categoryRecipes);

    // Calculate similarity scores for each recipe
    const similarityScores = combinedRecipes.map(recipe => {
      const areaVector = areaRecipes.map(r => r.idMeal === recipe.idMeal ? 1 : 0);
      const categoryVector = categoryRecipes.map(r => r.idMeal === recipe.idMeal ? 1 : 0);
      return cosineSimilarity(areaVector, categoryVector);
    });

    // Sort recipes by similarity score in descending order
    const sortedRecipes = combinedRecipes.map((recipe, i) => ({ ...recipe, similarity: similarityScores[i] }))
      .sort((a, b) => b.similarity - a.similarity);

    return sortedRecipes;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw new Error('Internal Server Error');
  }
}

router.post('/', asyncHandler(async (req, res) => {
  const area = req.body.area;
  const category = req.body.category;
  try {
    const recommendations = await getRecommendations(area, category);
    const limitedRecommendations = recommendations.slice(0, 5);
    responseHandler.success(res, 'Recommended recipes fetched successfully', limitedRecommendations);
  } catch (err) {
    responseHandler.error(res, 'Error fetching recommended recipes');
  }
}));

export default router;
