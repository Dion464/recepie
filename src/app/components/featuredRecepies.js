import Link from 'next/link';

const FeaturedRecipe = ({ recipe }) => {
  return (
    <section className="bg-white p-8 md:p-16 rounded-lg shadow-xl flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
      {/* Text Section (Left) */}
      <div className="flex flex-col w-full md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          {recipe.title}
        </h1>
        <p className="text-lg text-gray-600">
          Discover a delightful culinary experience with this recipe! {recipe.description}
        </p>
        <div className="text-gray-500 text-sm">
          <p><strong>What you'll need:</strong></p>
          <ul className="list-disc pl-6">
            <li>Fresh ingredients</li>
            <li>A pinch of creativity</li>
            <li>Simple cooking tools</li>
          </ul>
        </div>

        <p className="text-gray-700 mt-4">
          This recipe is designed to be simple, flavorful, and enjoyable for both beginners and experienced cooks alike.
        </p>

        <Link
      href={`/recepie/${recipe.id}`}
          className="mblock mt-4 text-center bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition duration-200"
        >
          View Recipe Details
        </Link>
      </div>

      {/* Image Section (Right) */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6 rounded-lg overflow-hidden shadow-md">
        <img
          src={recipe.image} // Assuming `recipe.image` contains the image URL
          alt={recipe.title}
          className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
        />
      </div>
    </section>
  );
};

export default FeaturedRecipe;
