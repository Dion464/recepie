import { create } from "zustand";

const useRecipeStore = create((set) => ({
  // Initial state
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  imageErrors: {},

  // Actions for favorites
  addFavorite: (recipe) => {
    set((state) => {
      const updatedFavorites = [...state.favorites, recipe];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  removeFavorite: (recipeId) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter(
        (recipe) => recipe.id !== recipeId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  // Check if a recipe is in the favorites
  isFavorite: (recipeId) => {
    const { favorites } = useRecipeStore.getState();
    return favorites.some((recipe) => recipe.id === recipeId);
  },

  // Actions for image error handling
  setImageError: (recipeId) => {
    set((state) => ({
      imageErrors: { ...state.imageErrors, [recipeId]: true },
    }));
  },

  resetImageError: (recipeId) => {
    set((state) => {
      const { [recipeId]: _, ...remainingErrors } = state.imageErrors;
      return { imageErrors: remainingErrors };
    });
  },

  // Handling recipe details
  recipeDetails: {},

  setRecipeDetails: (id, recipe) => {
    set((state) => ({
      recipeDetails: {
        ...state.recipeDetails,
        [id]: recipe,
      },
    }));
  },
}));

export default useRecipeStore;
