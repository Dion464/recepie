"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML

export default function RecipeDetails() {
  const params = useParams(); // Get the `id` from the route
  const { id } = params;
  const [recipe, setRecipe] = useState(null);

  // Placeholder image for fallback
  const placeholderImage = "/images/placeholder-recipe.jpg";

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
          );
          console.log(response.data); // Log the response data to debug
          setRecipe(response.data);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (!recipe)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          {recipe.title}
        </h1>

        {/* Image and Ingredients */}
        <div className="flex flex-col sm:flex-row sm:gap-8">
          {/* Recipe Image with Fallback */}
          <div className="w-full sm:w-1/3">
            <img
              src={recipe.image || placeholderImage}
              alt={recipe.title || "Recipe"}
              onError={(e) => {
                e.target.src = placeholderImage; // Set fallback image on error
              }}
              className="w-full h-auto object-cover rounded-md shadow-md"
            />
          </div>

          {/* Ingredients */}
          <div className="flex-1 mt-6 sm:mt-0">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Ingredients
            </h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Instructions
          </h2>
          <div
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                recipe.instructions || "No instructions available."
              ),
            }}
          ></div>
        </div>

        {/* Go Back Button */}
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
