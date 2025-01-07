import Link from "next/link";
import useRecipeStore from "@/app/store/useStore";
import { useState, useEffect } from "react";

const FeaturedRecipe = ({ recipe }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite, setImageError } =
    useRecipeStore();
  const [imageError, setImageErrorState] = useState(false);

  const handleImageError = () => {
    setImageErrorState(true);
    setImageError(recipe.id);
  };

  useEffect(() => {
    if (isFavorite(recipe.id)) {
      setImageErrorState(false);
    }
  }, [recipe.id, isFavorite]);

  return (
    <section className="relative bg-gradient-to-br from-orange-50/50 to-white p-8 md:p-12 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Content Section */}
        <div className="flex flex-col w-full lg:w-1/2 space-y-6 animate-slideInFromLeft">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              {recipe.title}
            </h1>

            {/* Recipe quick info */}
            <div className="flex flex-wrap items-center gap-4">
              {recipe.readyInMinutes && (
                <div className="flex items-center bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="mr-2 animate-pulse">⏱️</span>
                  <span className="text-orange-700 font-medium">
                    {recipe.readyInMinutes} min
                  </span>
                </div>
              )}
              {(recipe.nutrition?.nutrients?.[0]?.amount ||
                recipe.calories ||
                recipe.nutrition?.calories) && (
                <div className="flex items-center bg-green-100/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="mr-2 animate-pulse">🔥</span>
                  <span className="text-green-700 font-medium">
                    {recipe.nutrition?.nutrients?.[0]?.amount ||
                      recipe.calories ||
                      recipe.nutrition?.calories}{" "}
                    calories
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">
            Discover a delightful culinary experience with this recipe!{" "}
            {recipe.description}
          </p>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <p className="font-semibold text-gray-800 mb-4">
              What you'll need:
            </p>
            <ul className="grid grid-cols-2 gap-3">
              <li className="flex items-center text-gray-600">
                <span className="mr-2">🥘</span>Fresh ingredients
              </li>
              <li className="flex items-center text-gray-600">
                <span className="mr-2">✨</span>A pinch of creativity
              </li>
              <li className="flex items-center text-gray-600">
                <span className="mr-2">🔪</span>Simple cooking tools
              </li>
              <li className="flex items-center text-gray-600">
                <span className="mr-2">💝</span>Love for cooking
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                isFavorite(recipe.id)
                  ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } shadow-sm`}
              onClick={() =>
                isFavorite(recipe.id)
                  ? removeFavorite(recipe.id)
                  : addFavorite(recipe)
              }
            >
              <svg
                className={`w-6 h-6 ${
                  isFavorite(recipe.id) ? "fill-pink-500" : "fill-gray-400"
                } transition-colors duration-300`}
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{isFavorite(recipe.id) ? "Saved" : "Save Recipe"}</span>
            </button>

            <Link
              href={`/recepie/${recipe.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              View Recipe
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 animate-slideInFromRight">
          <div className="relative group rounded-2xl overflow-hidden shadow-xl">
            <img
              src={imageError ? "/default-recipe-big.png" : recipe.image}
              alt={recipe.title}
              className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipe;
