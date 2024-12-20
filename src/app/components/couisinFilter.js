// CuisineFilter.js
import React from 'react';

const CuisineFilter = ({ selectedCuisine, onSelectCuisine }) => {
  const cuisines = ['All', 'Italian', 'Mexican', 'Chinese'];
  return (
    <div className="flex space-x-2">
      {cuisines.map((cuisine) => (
        <button
          key={cuisine}
          onClick={() => onSelectCuisine(cuisine)}
          className={`px-4 py-2 rounded-md ${
            selectedCuisine === cuisine
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {cuisine}
        </button>
      ))}
    </div>
  );
};

export default CuisineFilter;