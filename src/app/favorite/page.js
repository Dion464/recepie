"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">Favorite Recipes</h1>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                <p className="text-gray-500 mb-4">{recipe.readyInMinutes} min</p>
                <Link
                  href={`/recepie/${recipe.id}`}
                  className="inline-block bg-orange-500 text-white text-center py-2 px-6 rounded-full hover:bg-orange-600 transition duration-200"
                >
                  View Recipe
                </Link>
              </div>
              
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500 col-span-full">You have no favorite recipes yet.</p>
        )}
      </div>
      <button
          onClick={() => window.history.back()}
          className="block mt-4 text-center bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition"
        >
          Go Back
        </button>
    </div>
  );
};

export default FavoritesPage;
