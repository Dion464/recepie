// src/app/recipes/[id]/page.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecipeDetails({ params }) {
  const { id } = params;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
          );
          setRecipe(response.data);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-primary">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-auto my-4 rounded-lg shadow-lg" />
      <h2 className="text-2xl font-semibold text-secondary mt-6">Ingredients</h2>
      <ul className="list-disc pl-5 text-dark">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold text-secondary mt-6">Instructions</h2>
      <p className="text-lg text-dark leading-relaxed mt-2">{recipe.instructions}</p>
    </div>
  );
}