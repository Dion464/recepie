"use client";
import { useState, useEffect } from "react";
import Header from "../app/components/header";
import SearchBar from "../app/components/searchBar";
import FeaturedRecipe from "../app/components/featuredRecepies";
import RecipeList from "../app/components/recepieList";
import axios from "axios";

export default function Home() {
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [gridRecipes, setGridRecipes] = useState([]);

  useEffect(() => {
    const fetchFeaturedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
        );
        setFeaturedRecipe(response.data.recipes[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeaturedRecipe();
  }, []);

  useEffect(() => {
    const fetchGridRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=9&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
        );
        setGridRecipes(response.data.recipes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGridRecipes();
  }, []);

  if (!featuredRecipe || gridRecipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <SearchBar setGridRecipes={setGridRecipes} />
        <h1 className="text-4xl font-bold text-primary mt-8">Discover Recipes</h1>
        <p className="text-lg text-dark mt-4">Explore delicious meals curated just for you.</p>
        <h2 className="text-2xl font-bold text-secondary mt-6">Featured Recipe</h2>
        <FeaturedRecipe recipe={featuredRecipe} />
        <h2 className="text-2xl font-bold text-secondary mt-10">Additional Recipes</h2>
        <RecipeList recipes={gridRecipes} />
      </div>
    </div>
  );
}
