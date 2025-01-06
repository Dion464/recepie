"use client";

import { useEffect } from "react";
import useRecipeStore from "@/app/store/useStore";

const FavoritesPage = () => {
  const { favorites, initializeFavorites, addFavorite } = useRecipeStore();

  useEffect(() => {
    initializeFavorites(); // Load favorites after component mounts
  }, [initializeFavorites]);

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
