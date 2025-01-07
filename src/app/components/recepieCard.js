import { useState, useEffect } from "react";
import Link from "next/link";
import useRecipeStore from "@/app/store/useStore";

const RecipeCard = ({ recipe }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite, imageErrors } =
    useRecipeStore();

  const isImageErrored = !!imageErrors[recipe.id];

  const handleImageError = () => {
    useRecipeStore.setState((state) => ({
      imageErrors: { ...state.imageErrors, [recipe.id]: true },
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
      <img
        src={isImageErrored ? "/default-recipe-big.png" : recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
        onError={handleImageError}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {recipe.title}
        </h3>
        <div className="flex items-center space-x-6 text-gray-500">
          {recipe.readyInMinutes && (
            <div className="flex items-center">
              <span className="mr-2">⏱️</span>
              <span>Ready in {recipe.readyInMinutes} min</span>
            </div>
          )}
          {(recipe.nutrition?.nutrients?.[0]?.amount || recipe.calories) && (
            <div className="flex items-center">
              <span className="mr-2">🔥</span>
              <span>
                {recipe.nutrition?.nutrients?.[0]?.amount || recipe.calories}{" "}
                calories
              </span>
            </div>
          )}
        </div>

        {/* Favorite button */}
        <button
          className="inline-block text-white p-2 rounded-full"
          onClick={() =>
            isFavorite(recipe.id)
              ? removeFavorite(recipe.id)
              : addFavorite(recipe)
          }
        >
          <img
            src={isFavorite(recipe.id) ? "/favorite2.webp" : "/favorit.jpg"}
            alt="Favorite"
            className="w-8 h-8"
          />
        </button>

        {/* View recipe button */}
        <Link
          href={`/recepie/${recipe.id}`}
          className="inline-block bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition duration-200 mt-4"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
