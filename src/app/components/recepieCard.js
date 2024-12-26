"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Utility to save favorites in localStorage
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

  // Check localStorage for favorite status
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

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-full sm:w-72 mx-auto hover:scale-105 transition duration-300 ease-in-out">
      {/* Image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover"
      />
      

      <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition duration-300"
      >

        {isFavorite ? (
          <Image
            src="/bookmark.svg" 
            alt="Save"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/bookmark-save.svg" 
            alt="Saved"
            width={24}
            height={24}
          />
        )}
      </button>

      <div className="p-4">

        <h3 className="text-lg font-medium text-gray-800 mb-2">{recipe.title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{recipe.readyInMinutes} min</span>
        </div>

        <Link
          href={`/recepie/${recipe.id}`} // Ensure this matches your routing
          className="block mt-4 text-center bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
