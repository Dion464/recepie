import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipeDetails: {},
      favorites: [],
      
      setRecipeDetails: (id, details) => 
        set((state) => ({
          recipeDetails: { ...state.recipeDetails, [id]: details }
        })),

      toggleFavorite: (recipe) => 
        set((state) => {
          const isFavorited = state.favorites.some(fav => fav.id === recipe.id);
          
          if (isFavorited) {
            return {
              favorites: state.favorites.filter(fav => fav.id !== recipe.id)
            };
          } else {
            return {
              favorites: [...state.favorites, recipe]
            };
          }
        }),

      isFavorite: (id) => {
        const state = get();
        return state.favorites.some(recipe => recipe.id.toString() === id.toString());
      }
    }),
    {
      name: 'recipe-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useRecipeStore;
