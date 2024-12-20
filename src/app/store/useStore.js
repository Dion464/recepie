import create from 'zustand';

const useStore = create((set) => ({
  favorites: [],
  addFavorite: (recipe) => set((state) => ({ favorites: [...state.favorites, recipe] })),
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((recipe) => recipe.id !== recipeId),
  })),
}));
export default useStore;