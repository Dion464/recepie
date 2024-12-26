import Link from 'next/link';

const FeaturedRecipe = ({ recipe }) => {
  return (
    <section className="bg-gray-100 p-10 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
      {/* Text Section (Left) */}
      <div className="flex flex-col w-full md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{recipe.title}</h1>
        <p className="text-lg text-gray-700 mt-4">{recipe.description}</p>
        <Link
          href={`/recepie/${recipe.id}`} 
          className="mt-6 inline-block bg-orange-500 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition max-w-max"
        >
          View Details
        </Link>
      </div>

      {/* Image Section (Right) */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6 rounded-lg overflow-hidden">
        <img
          src={recipe.image}  // Assuming `recipe.image` contains the image URL
          alt={recipe.title}
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </div>
    </section>
  );
};

export default FeaturedRecipe;
