import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecipeStore = create(
  persist(
    (set) => ({
      favorites: [],
      recipeDetails: {},
      toggleFavorite: (recipe) =>
        set((state) => {
          const isFavorited = state.favorites.some((fav) => fav.id === recipe.id);
          if (isFavorited) {
            return {
              favorites: state.favorites.filter((fav) => fav.id !== recipe.id),
            };
          } else {
            return {
              favorites: [...state.favorites, recipe],
            };
          }
        }),
      isFavorite: (id) =>
        set((state) => state.favorites.some((recipe) => recipe.id === id)),
      setRecipeDetails: (id, details) =>
        set((state) => ({
          recipeDetails: { ...state.recipeDetails, [id]: details },
        })),
    }),
    {
      name: 'recipe-storage',
    }
  )
);

export default useRecipeStore;
