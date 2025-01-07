"use client"
import { useEffect } from "react";
import { useParams } from "next/navigation";
import useRecipeStore from "@/app/store/useStore";
import axios from "axios";
import DOMPurify from "dompurify";

export default function RecipeDetails() {
  const params = useParams();
  const { id } = params;
  
  const { 
    recipeDetails, 
    setRecipeDetails, 
    toggleFavorite, 
    isFavorite 
  } = useRecipeStore();

  const recipe = recipeDetails[id];
  const isRecipeFavorited = isFavorite(id);

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

  if (!recipe)
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-50">
        <div className="p-8 rounded-lg bg-white shadow-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Loading your delicious recipe...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100/50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">
          {/* Hero Section */}
          <div className="relative h-[450px] group">
            <img
              src={recipe.image || "/images/placeholder-recipe.jpg"}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="absolute bottom-0 p-8 w-full">
                <div className="flex justify-between items-start gap-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                    {recipe.title}
                  </h1>
                  <button
                    onClick={() => toggleFavorite(recipe)}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all hover:scale-110"
                  >
                    <svg
                      className={`w-8 h-8 ${
                        isRecipeFavorited ? 'text-red-500 fill-current' : 'text-white'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap gap-6 text-white/90 text-lg items-center">
                  <span className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {recipe.readyInMinutes} minutes
                  </span>
                  <span className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {recipe.servings} servings
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Recipe Quick Info */}
            <div className="flex flex-wrap gap-4 mb-10">
              {recipe.vegetarian && (
                <div className="bg-green-50 px-6 py-2.5 rounded-full text-center transform hover:scale-105 transition-all duration-300 border border-green-100 shadow-sm">
                  <span className="text-green-700 font-medium">🥬 Vegetarian</span>
                </div>
              )}
              {recipe.glutenFree && (
                <div className="bg-yellow-50 px-6 py-2.5 rounded-full text-center transform hover:scale-105 transition-all duration-300 border border-yellow-100 shadow-sm">
                  <span className="text-yellow-700 font-medium">🌾 Gluten Free</span>
                </div>
              )}
              {recipe.dairyFree && (
                <div className="bg-blue-50 px-6 py-2.5 rounded-full text-center transform hover:scale-105 transition-all duration-300 border border-blue-100 shadow-sm">
                  <span className="text-blue-700 font-medium">🥛 Dairy Free</span>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
              {/* Ingredients Section */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-sm border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.extendedIngredients.map((ingredient, index) => (
                    <li 
                      key={`${ingredient.id}-${index}`} 
                      className="flex items-center gap-3 p-3 bg-white/70 rounded-xl hover:bg-white transition-all duration-300 border border-orange-100/50"
                    >
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded-lg border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                      />
                      <span className="text-gray-700">{ingredient.original}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-2xl">👩‍🍳</span>
                  Instructions
                </h2>
                <div
                  className="prose prose-lg prose-orange max-w-none text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      recipe.instructions || "No instructions available."
                    ),
                  }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-12">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-700 
                hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow-md 
                border-2 border-orange-100 font-medium"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Recipes
              </button>
              <button
                onClick={() => toggleFavorite(recipe)}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl
                transition-all duration-300 shadow-sm hover:shadow-md font-medium
                ${isRecipeFavorited 
                  ? 'bg-red-500 hover:bg-red-600 text-white border-2 border-red-400' 
                  : 'bg-white hover:bg-red-50 text-gray-700 border-2 border-red-200'
                }`}
              >
                {isRecipeFavorited ? (
                  <>
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Saved to Favorites
                  </>
                ) : (
                  <>
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Save to Favorites
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
