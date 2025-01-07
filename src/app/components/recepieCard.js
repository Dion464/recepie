import { useState } from "react";
import Link from "next/link";
import useRecipeStore from "@/app/store/useStore";

const RecipeCard = ({ recipe }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const { toggleFavorite, isFavorite } = useRecipeStore();

  if (!recipe) return null;

  const handleImageError = () => {
    setHasImageError(true);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={hasImageError ? "/default-recipe-big.png" : recipe.image}
          alt={recipe.title}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
        <div className="absolute top-4 right-4">
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md backdrop-filter bg-white/30 hover:bg-white/50 transition-all duration-300 ${
              isFavorite(recipe.id) ? "text-pink-500" : "text-gray-600"
            }`}
            onClick={() => toggleFavorite(recipe)}
          >
            <svg
              className={`w-6 h-6 ${
                isFavorite(recipe.id) ? "fill-pink-500" : "fill-gray-600"
              } transition-colors duration-300`}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
          {recipe.title}
        </h3>

        <div className="flex flex-wrap gap-4 mb-4">
          {recipe.readyInMinutes && (
            <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full">
              <span className="mr-2">⏱️</span>
              <span className="text-sm text-orange-700">
                {recipe.readyInMinutes} min
              </span>
            </div>
          )}
          {(recipe.nutrition?.nutrients?.[0]?.amount || recipe.calories) && (
            <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
              <span className="mr-2">🔥</span>
              <span className="text-sm text-green-700">
                {recipe.nutrition?.nutrients?.[0]?.amount || recipe.calories}{" "}
                cal
              </span>
            </div>
          )}
        </div>

        <Link
          href={`/recepie/${recipe.id}`}
          className="block w-full text-center bg-orange-500 text-white py-2.5 px-6 rounded-xl hover:bg-orange-600 transition duration-300 font-medium"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
