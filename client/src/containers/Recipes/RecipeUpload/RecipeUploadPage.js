import React, { useState, useContext } from 'react';
import { CloudUpload } from '@material-ui/icons';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import UserContext from '../../../context/UserContext/UserContext';
import { createRecipe, fetchRecipeLength } from '../../../api';

const RecipeUploadPage = () => {
  const { userInfo, updateUserInPage } = useContext(UserContext);

  const [recipe, setRecipe] = useState({
    title: '',
    image: null,
    ingredients: [{ name: '', quantity: '' }],
    instructions: '',
    videoUrl: ''
  });

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;

    if (name.startsWith('ingredient')) {
      const updatedIngredients = [...recipe.ingredients];
      if (name.includes('name')) {
        updatedIngredients[index].name = value;
      } else {
        updatedIngredients[index].quantity = value;
      }
      setRecipe({ ...recipe, ingredients: updatedIngredients });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: '', quantity: '' }]
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRecipe((prevRecipe) => ({ ...prevRecipe, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const length = await fetchRecipeLength();
    const recipeToSend = { ...recipe, id: length.data + 1 };
    const result = await createRecipe(recipeToSend);
    if (result.success) {
      const updatedUserInfo = { ...userInfo, publish: [...userInfo.publish, result.data.nextId] };
      updateUserInPage(updatedUserInfo)
      alert("Upload the Recipe Successfully!")
    } else {
      alert("Fail to upload.")
    }
    return;
  };

  return (
    <>
      <NavBar />
      {userInfo.username !== ""
        ?
        (<div className="container mx-auto p-4">
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
            <div className="md:flex">
              <div className="w-full p-4">
                <h1 className="text-center text-2xl font-semibold mb-4">
                  Upload Recipe
                </h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Recipe Title"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={recipe.title}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  {/* Image Upload with Preview */}
                  <div className="mt-4">
                    <label htmlFor="image-upload" className="flex items-center cursor-pointer text-blue-500">
                      <CloudUpload className="h-5 w-5 mr-2" /> Upload Recipe Image (Optional)
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {recipe.image && (
                      <img src={recipe.image} alt="Preview" className="mt-4 w-full h-2/3" />
                    )}
                  </div>
                  {/* Ingredients */}
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center mt-4">
                      <input
                        type="text"
                        name={`ingredient-name-${index}`}
                        placeholder="Ingredient Name"
                        className="w-2/3 p-2 border border-gray-300 rounded-md mr-2"
                        value={ingredient.name}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                      <input
                        type="text"
                        name={`ingredient-quantity-${index}`}
                        placeholder="Quantity"
                        className="w-1/3 p-2 border border-gray-300 rounded-md"
                        value={ingredient.quantity}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="mt-2 text-sm text-blue-500"
                  >
                    Add another ingredient
                  </button>
                  {/* Instructions */}
                  <textarea
                    name="instructions"
                    placeholder="Instructions"
                    className="w-full p-2 border border-gray-300 rounded-md mt-4"
                    rows={4}
                    value={recipe.instructions}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  {/* Video URL */}
                  <input
                    type="text"
                    name="videoUrl"
                    placeholder="Video URL (Optional)"
                    className="w-full p-2 border border-gray-300 rounded-md mt-4"
                    value={recipe.videoUrl}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full p-2 rounded-md mt-4"
                    style={{ backgroundColor: "#333", color: "#fff" }}
                  >
                    Upload Recipe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        )
        :
        <div className="flex justify-center items-center h-screen">
          No User Info. Please Login.
        </div>
      }
      <Footer />
    </>
  );
};

export default RecipeUploadPage;
