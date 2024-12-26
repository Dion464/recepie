import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar({ setGridRecipes }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle input change to update query and trigger live search
  const handleSearch = async () => {
    if (!query.trim()) return; // Avoid search if the query is empty

    setIsSearching(true); // Set loading state while fetching data

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false); // Reset loading state after fetch
    }
  };

  // Debounced search function to avoid too many API calls
  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const debounceTimeout = setTimeout(handleSearch, 500); // Delay to avoid excessive API calls
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <div className="relative flex items-center justify-center my-8">
      <div className="w-full sm:w-2/3 lg:w-1/2 flex">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border-2 border-gray-300 p-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-6 py-3 rounded-r-full font-semibold hover:bg-orange-600 transition"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Results List */}
      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg max-h-60 overflow-y-auto z-10 mt-1 rounded-md">
          <ul>
            {searchResults.map((recipe) => (
              <li
                key={recipe.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setGridRecipes([recipe]); // Display the clicked recipe
                  setQuery(""); // Clear input after selection
                  setSearchResults([]); // Clear the suggestions list
                }}
              >
                {recipe.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
