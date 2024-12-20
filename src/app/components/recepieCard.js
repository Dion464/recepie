import Link from "next/link";

export default function RecipeCard({ recipe }) {
  return (
    <div class="bg-white rounded-lg overflow-hidden shadow-lg w-80">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{recipe.readyInMinutes} min</span>
          </div>
      
        </div>
        <Link
          href={`/recipes/${recipe.id}`}
          className="block text-center w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
