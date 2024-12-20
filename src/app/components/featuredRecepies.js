import Link from 'next/link';

const FeaturedRecipe = ({ recipe }) => {
  return (
    <section className="bg-gray-100 p-10 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-gray-900">{recipe.title}</h1>
      <p className="text-lg text-gray-700 mt-4">{recipe.description}</p>
      <Link
        href={`/recipes/${recipe.id}`}
        className="mt-6 inline-block bg-orange-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
      >
        View Details
      </Link>
    </section>
  );
};

export default FeaturedRecipe;
