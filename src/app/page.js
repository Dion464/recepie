"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './components/recepieCard';
import SearchBar from './components/searchBar';
import FeaturedRecipe from './components/featuredRecepies';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);

  useEffect(() => {
    const fetchInitialRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&number=9`
        );
        setRecipes(response.data.recipes);
        setFeaturedRecipe(response.data.recipes[0]);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchInitialRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar setGridRecipes={setRecipes} />
        
        {featuredRecipe && (
          <div className="mt-8">
            <FeaturedRecipe recipe={featuredRecipe} />
          </div>
        )}

        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
