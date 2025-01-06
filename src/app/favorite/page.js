"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Ensure localStorage access is safe
    if (typeof window !== "undefined") {
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
    }
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-500 mb-2">
          Your Favorite Recipes
        </h1>
        <p className="text-lg text-gray-600">
          Explore your saved recipes and create magic in the kitchen!
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <img
                src={imageError ? "/default-recipe-big.png" : recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
                onError={handleImageError}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-500 mb-4">
                  Ready in {recipe.readyInMinutes} min
                </p>
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
          <div className="col-span-full text-center">
            <p className="text-lg text-gray-500 mb-4">
              You haven't added any favorites yet. Start exploring and save your
              favorite recipes!
            </p>
            <Link
              href="/recipes"
              className="inline-block bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition"
            >
              Browse Recipes
            </Link>
          </div>
        )}
      </div>

      <section className="mt-12 text-center bg-gray-50 py-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Save Favorites?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Save recipes you love, revisit them anytime, and create a personalized
          collection of go-to dishes. Your favorites make meal planning easier
          and more fun!
        </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition"
        >
          Discover More Recipes
        </Link>
      </section>

      <button
        onClick={() => window.history.back()}
        className="block mx-auto mt-8 bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-900 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default FavoritesPage;
