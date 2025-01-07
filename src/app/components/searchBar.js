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

      if (query.trim()) {
        url += `&query=${encodeURIComponent(query.trim())}`;
      }

      if (selectedCategory) {
        url += `&type=${encodeURIComponent(selectedCategory)}`;
      }

      url += "&number=10&addRecipeInformation=true";

      const response = await axios.get(url);
      setSearchResults(response.data.results);
      setGridRecipes(response.data.results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query, selectedCategory]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-20 sm:mt-8">
      <div className="relative bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 border border-white/30">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm
                border border-white/40 rounded-xl
                focus:outline-none focus:border-orange-400/50 focus:ring-2 focus:ring-orange-100/30
                text-base placeholder-gray-500"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-orange-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium
              hover:bg-orange-600/90 transition-all duration-200 flex items-center justify-center space-x-2
              disabled:bg-gray-400/50 disabled:cursor-not-allowed
              hover:shadow-lg"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Searching</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>

        <div className="mt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategorySelect(category.name)}
                className={`flex-none px-4 py-2 rounded-xl text-sm font-medium transition-all
                  flex items-center space-x-2 backdrop-blur-sm whitespace-nowrap
                  ${selectedCategory === category.name
                    ? "bg-orange-500/80 text-white shadow-md"
                    : "bg-white/40 text-gray-700 hover:bg-white/60"
                  }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.displayName}</span>
              </button>
            ))}
          </div>
        </div>

        {searchResults.length > 0 && query && (
          <div className="absolute left-0 right-0 bg-white/60 backdrop-blur-md 
            shadow-lg rounded-xl mt-2 overflow-hidden z-30 
            border border-white/30 max-h-[50vh] overflow-y-auto">
            <ul className="divide-y divide-gray-100/20">
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
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {recipe.readyInMinutes && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {recipe.readyInMinutes} min
                        </span>
                      )}
                      {recipe.cuisines?.length > 0 && (
                        <span className="hidden sm:inline truncate">{recipe.cuisines[0]}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
