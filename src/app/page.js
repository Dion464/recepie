"use client";
import { useState, useEffect } from "react";
import Header from "../app/components/header";
import SearchBar from "../app/components/searchBar";
import FeaturedRecipe from "../app/components/featuredRecepies";
import RecipeList from "../app/components/recepieList";
import axios from "axios";
import Footer from "../app/components/footer";

export default function Home() {
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [gridRecipes, setGridRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  // Function to handle filtering of recipes by selected cuisine
  const handleCuisineFilter = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  useEffect(() => {
    const fetchFeaturedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
        );
        setFeaturedRecipe(response.data.recipes[0]);
      } catch (error) {
        console.error("Error fetching featured recipe:", error);
      }
    };
    fetchFeaturedRecipe();
  }, []);

  useEffect(() => {
    const fetchGridRecipes = async () => {
      try {
        let url = `https://api.spoonacular.com/recipes/random?number=9&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;
        if (selectedCuisine) {
          url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${selectedCuisine}&number=9&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;
        }
        const response = await axios.get(url);
        setGridRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching grid recipes:", error);
      }
    };
    fetchGridRecipes();
  }, [selectedCuisine]);

  if (!featuredRecipe || gridRecipes.length === 0) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header />
      <div className="container mx-auto px-6 lg:px-16 flex-1">
        <SearchBar setGridRecipes={setGridRecipes} />
        <section className="mt-8">
          <h1 className="text-4xl font-bold text-gray-800">Discover Recipes</h1>
          <p className="text-lg text-gray-600 mt-2">
            Explore delicious meals curated just for you.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-700">Featured Recipe</h2>
          <FeaturedRecipe recipe={featuredRecipe} />
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700">Additional Recipes</h2>
          <RecipeList recipes={gridRecipes} />
        </section>
      </div>
      <Footer />
    </div>
  );
}
