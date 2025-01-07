import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar({ setGridRecipes }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { icon: "🍝", name: "pasta", displayName: "Pasta" },
    { icon: "🥗", name: "salad", displayName: "Salad" },
    { icon: "🍖", name: "main course", displayName: "Main Course" },
    { icon: "🥘", name: "soup", displayName: "Soup" },
    { icon: "🍰", name: "dessert", displayName: "Dessert" },
    { icon: "🥪", name: "sandwich", displayName: "Sandwich" },
  ];

  const handleSearch = async () => {
    if (!query.trim() && !selectedCategory) return;

    setIsSearching(true);
    try {
      let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;

      // Add query parameter if there's a search term
      if (query.trim()) {
        url += `&query=${encodeURIComponent(query.trim())}`;
      }

      // Add type parameter if there's a selected category
      if (selectedCategory) {
        url += `&type=${encodeURIComponent(selectedCategory)}`;
      }

      // Add additional parameters for better results
      url += "&number=10&addRecipeInformation=true";

      const response = await axios.get(url);
      setSearchResults(response.data.results);
      setGridRecipes(response.data.results); // Update the main grid with search results
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(
      selectedCategory === categoryName ? null : categoryName
    );
  };

  // Debounced search effect
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query, selectedCategory]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-24">
      {" "}
      {/* Added mt-24 to fix header overlap */}
      {/* Search Container */}
      <div className="relative bg-white rounded-2xl shadow-lg p-6">
        {/* Main Search Input */}
        <div className="relative flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-l-full 
                focus:outline-none focus:border-orange-500 transition-colors
                text-lg placeholder-gray-400"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white px-8 py-4 rounded-r-full font-semibold
              hover:bg-orange-600 transition-colors flex items-center space-x-2
              disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Searching</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mt-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategorySelect(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                flex items-center space-x-2 hover:transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.displayName}</span>
            </button>
          ))}
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && query && (
          <div
            className="absolute left-0 right-0 bg-white shadow-xl rounded-2xl mt-2 overflow-hidden z-50
            border border-gray-100 max-h-96 overflow-y-auto"
          >
            <ul className="divide-y divide-gray-100">
              {searchResults.map((recipe) => (
                <li
                  key={recipe.id}
                  onClick={() => {
                    setGridRecipes([recipe]);
                    setQuery("");
                    setSearchResults([]);
                  }}
                  className="flex items-center space-x-4 p-4 hover:bg-orange-50 cursor-pointer transition-colors"
                >
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {recipe.readyInMinutes && (
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {recipe.readyInMinutes} min
                        </span>
                      )}
                      {recipe.cuisines?.length > 0 && (
                        <span>{recipe.cuisines[0]}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* No Results Message */}
      {query && searchResults.length === 0 && !isSearching && (
        <div className="text-center mt-4 p-6 bg-white rounded-lg shadow-md">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600">
            No recipes found. Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}
