"use client"
import { useEffect } from "react";
import { useParams } from "next/navigation";
import useRecipeStore from "@/app/store/useStore";
import axios from "axios";
import DOMPurify from "dompurify";

export default function RecipeDetails() {
  const params = useParams();
  const { id } = params;
  const { recipeDetails, setRecipeDetails } = useRecipeStore();

  useEffect(() => {
    if (id && !recipeDetails[id]) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
          );
          setRecipeDetails(id, response.data);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };
      fetchRecipe();
    }
  }, [id, recipeDetails, setRecipeDetails]);

  const recipe = recipeDetails[id];

  if (!recipe)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{recipe.title}</h1>
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <div className="w-full sm:w-1/3">
            <img
              src={recipe.image || "/images/placeholder-recipe.jpg"}
              alt={recipe.title}
              className="w-full h-auto object-cover rounded-md shadow-md"
            />
          </div>
          <div className="flex-1 mt-6 sm:mt-0">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Ingredients</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Instructions</h2>
          <div
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                recipe.instructions || "No instructions available."
              ),
            }}
          ></div>
        </div>
        <button
          onClick={() => window.history.back()}
          className="block mt-4 text-center bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
