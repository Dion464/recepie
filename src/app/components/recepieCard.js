"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const saveFavorite = (recipe) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some((item) => item.id === recipe.id)) {
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

const removeFavorite = (recipeId) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const updatedFavorites = favorites.filter((item) => item.id !== recipeId);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export default function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((item) => item.id === recipe.id));
  }, [recipe.id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      saveFavorite(recipe);
    }
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-full sm:w-72 mx-auto hover:scale-105 transition duration-300 ease-in-out">
      {/* Image Section with Fallback */}
      <img
        src={imageError ? "/default-image.jpg" : recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover"
        onError={handleImageError}
      />

      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition duration-300"
      >
        {isFavorite ? (
          <Image
            src="/favorite.png"
            alt="Unfavorite"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/favorite (1).png"
            alt="Favorite"
            width={24}
            height={24}
          />
        )}
      </button>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">{recipe.title}</h3>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div>
            <span className="text-yellow-500 mr-1">★</span>
            <span>{recipe.readyInMinutes} min</span>
          </div>
          <div className="text-gray-600 italic">Servings: {recipe.servings}</div>
        </div>

        {/* Summary */}
        <div
          className="text-gray-600 text-sm mb-4"
          dangerouslySetInnerHTML={{
            __html: recipe.summary
              ? `${recipe.summary.substring(0, 60)}...`
              : "No description available.",
          }}
        ></div>

        {/* View Details Link */}
        <Link
          href={`/recepie/${recipe.id}`}
          className="block mt-4 text-center bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
