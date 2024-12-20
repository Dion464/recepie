import { useState } from "react";
import axios from "axios";

export default function SearchBar({ setGridRecipes }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
      );
      setGridRecipes(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center my-8">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-2/3 lg:w-1/2 border-2 border-gray-300 p-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        onClick={handleSearch}
        className="bg-primary text-white px-6 py-3 rounded-r-full font-semibold hover:bg-secondary transition"
      >
        Search
      </button>
    </div>
  );
}
