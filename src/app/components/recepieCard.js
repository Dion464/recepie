import { useState, useEffect } from "react";
import Link from "next/link";
import useRecipeStore from "@/app/store/useStore";

const RecipeCard = ({ recipe }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite, setImageError } = useRecipeStore();
  const [imageError, setImageErrorState] = useState(false); // Local state for image errors

  // Handle image loading errors
  const handleImageError = () => {
    setImageErrorState(true);
    setImageError(recipe.id);  // Update the store when an image fails to load
  };

  useEffect(() => {
    if (isFavorite(recipe.id)) {
      setImageErrorState(false); // Reset image error if it's a favorite
    }
  }, [recipe.id, isFavorite]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
      <img
        src={imageError ? "/default-recipe-big.png/" : recipe.image} // Use fallback image if error occurs
        alt={recipe.title}
        className="w-full h-48 object-cover"
        onError={handleImageError} // Trigger error handling on image load failure
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
        <p className="text-gray-500 mb-4">Ready in {recipe.readyInMinutes} min</p>
        
        {/* Favorite button */}
        <button
          className="inline-block text-white p-2 rounded-full"
          onClick={() => isFavorite(recipe.id) ? removeFavorite(recipe.id) : addFavorite(recipe)}
        >
          <img
            src={isFavorite(recipe.id) ? "/favorite.png" : "/favorite (1).png"} // Toggle between favorite and not favorite images
            alt="Favorite"
            className="w-6 h-6"
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
