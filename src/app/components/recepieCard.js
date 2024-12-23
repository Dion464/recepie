import Link from "next/link";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md w-full sm:w-72 mx-auto">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800">{recipe.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{recipe.readyInMinutes} min</span>
        </div>
        <Link
          href={`/recipes/details?id=${recipe.id}`}
          className="block mt-4 text-center bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
