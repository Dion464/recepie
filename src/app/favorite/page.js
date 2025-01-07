"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [imageError, setImageError] = useState({});
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
    }
  }, []);

  const handleImageError = (recipeId) => {
    setImageError((prev) => ({ ...prev, [recipeId]: true }));
  };

  const categories = [
    "all",
    ...new Set(favorites.map((recipe) => recipe.category || "uncategorized")),
  ];

  const filteredRecipes =
    filterCategory === "all"
      ? favorites
      : favorites.filter((recipe) => recipe.category === filterCategory);

  const removeFavorite = (recipeId) => {
    const updatedFavorites = favorites.filter(
      (recipe) => recipe.id !== recipeId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative text-center mb-12">
        <div className="absolute inset-0 bg-orange-500/10 -skew-y-3 z-0"></div>
        <div className="relative z-10 py-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Your <span className="text-orange-500">Favorite</span> Recipes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal collection of culinary inspiration
          </p>
        </div>
      </div>

      {favorites.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-3xl font-bold text-orange-500">
              {favorites.length}
            </p>
            <p className="text-gray-600">Saved Recipes</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-3xl font-bold text-orange-500">
              {Math.min(...favorites.map((r) => r.readyInMinutes || 0))}
            </p>
            <p className="text-gray-600">Quickest Recipe</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-3xl font-bold text-orange-500">
              {categories.length - 1}
            </p>
            <p className="text-gray-600">Categories</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-3xl font-bold text-orange-500">★</p>
            <p className="text-gray-600">Collection</p>
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  filterCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative group">
                <img
                  src={
                    imageError[recipe.id]
                      ? "/default-recipe-big.png"
                      : recipe.image
                  }
                  alt={recipe.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  onError={() => handleImageError(recipe.id)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={`/recepie/${recipe.id}`}
                    className="bg-white text-gray-800 px-6 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {recipe.title}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 flex items-center">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {recipe.readyInMinutes} min
                  </span>
                  <button
                    onClick={() => removeFavorite(recipe.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="text-center py-12 px-4 bg-gray-50 rounded-xl">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start exploring and save your favorite recipes!
              </p>
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition-colors"
              >
                Discover Recipes
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
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
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FavoritesPage;
