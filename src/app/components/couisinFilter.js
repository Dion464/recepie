import React, { useEffect, useState } from "react";

export default function CuisineFilter({ onFilter }) {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/cuisines?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`,
          {
            method: "GET", // Use 'GET' for the API call
            headers: {
              "Content-Type": "application/json", // Ensure the response type is JSON
              "Accept": "application/json" // Specify acceptable response format
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setCuisines(data.cuisines || []); // Adjust according to API response
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCuisines();
  }, []);

  if (loading) {
    return <p className="text-center">Loading cuisines...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading cuisines: {error}</p>;
  }

  if (cuisines.length === 0) {
    return <p className="text-center">No cuisines found.</p>;
  }

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Choose a Cuisine</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cuisines.map((cuisine, index) => (
          <div
            key={index}
            className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            onClick={() => onFilter(cuisine)}
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {cuisine}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
