import RecipeCard from './recepieCard';

const RecipeList = ({ recipes }) => {
  return (
    <div className="container mx-auto px-4">
      {/* About Recipes Section */}
      <div className="bg-gray-100 rounded-lg p-8 shadow-md mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Why You'll Love Our Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl text-orange-500 mb-4">🍴</span>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Easy to Follow</h4>
            <p className="text-gray-600 text-center">
              Our recipes are simple and easy to follow, making cooking accessible
              for everyone, no matter your skill level.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl text-orange-500 mb-4">💡</span>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Creative Recipes</h4>
            <p className="text-gray-600 text-center">
              We offer a wide range of creative recipes, from classic comfort food
              to innovative dishes, to keep your meals exciting.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl text-orange-500 mb-4">🌱</span>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Healthy Choices</h4>
            <p className="text-gray-600 text-center">
              Whether you're looking for low-calorie, vegetarian, or gluten-free options,
              FoodApp has something to fit your dietary preferences.
            </p>
          </div>
        </div>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
