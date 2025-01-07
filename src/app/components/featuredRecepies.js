import Link from "next/link";
import useRecipeStore from "@/app/store/useStore";
import { useState, useEffect } from "react";

const FeaturedRecipe = ({ recipe }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite, setImageError } =
    useRecipeStore();
  const [imageError, setImageErrorState] = useState(false); // Local state for image errors

  // Add console.log to see the recipe data
  useEffect(() => {
    console.log("Recipe data:", recipe);
    console.log("Recipe nutrition:", recipe?.nutrition);
  }, [recipe]);

  // Handle image loading errors
  const handleImageError = () => {
    setImageErrorState(true);
    setImageError(recipe.id); // Update the store when an image fails to load
  };

  useEffect(() => {
    if (isFavorite(recipe.id)) {
      setImageErrorState(false); // Reset image error if it's a favorite
    }
  }, [recipe.id, isFavorite]);

  return (
    <section className="bg-white p-8 md:p-16 rounded-lg shadow-xl flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 animate-fadeIn">
      <div className="flex flex-col w-full md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          {recipe.title}
        </h1>

        {/* Recipe quick info */}
        <div className="flex items-center space-x-6 text-gray-500">
          {recipe.readyInMinutes && (
            <div className="flex items-center">
              <span className="mr-2">⏱️</span>
              <span>Ready in {recipe.readyInMinutes} min</span>
            </div>
          )}
          {(recipe.nutrition?.nutrients?.[0]?.amount ||
            recipe.calories ||
            recipe.nutrition?.calories) && (
            <div className="flex items-center">
              <span className="mr-2">🔥</span>
              <span>
                {recipe.nutrition?.nutrients?.[0]?.amount ||
                  recipe.calories ||
                  recipe.nutrition?.calories}{" "}
                calories
              </span>
            </div>
          )}
        </div>

        <p className="text-lg text-gray-600">
          Discover a delightful culinary experience with this recipe!{" "}
          {recipe.description}
        </p>
        <div className="text-gray-500 text-sm">
          <p>
            <strong>What you'll need:</strong>
          </p>
          <ul className="list-disc pl-6">
            <li>Fresh ingredients</li>
            <li>A pinch of creativity</li>
            <li>Simple cooking tools</li>
          </ul>
        </div>

        <p className="text-gray-700 mt-4">
          This recipe is designed to be simple, flavorful, and enjoyable for
          both beginners and experienced cooks alike.
        </p>

        <div className="flex items-center space-x-4 mt-4">
          <button
            className="inline-block text-white p-2 rounded-full "
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
            className="mblock text-center bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition duration-200"
          >
            View Recipe Details
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6 rounded-lg overflow-hidden shadow-md animate-slideInFromRight">
        <img
          src={imageError ? "/default-recipe-big.png" : recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
          onError={handleImageError}
        />
      </div>
    </section>
  );
};

export default FeaturedRecipe;
