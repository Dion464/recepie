// app/about/page.js
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h1>
        <p className="text-xl text-gray-600">
          Learn more about FoodApp, our mission, and what makes us different.
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Welcome to FoodApp!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            FoodApp is more than just a recipe collection. It's a culinary journey
            that brings together home cooks, food lovers, and professional chefs to
            share their passion for food. Our platform offers a variety of mouthwatering
            recipes to inspire your next meal, whether you're cooking for yourself or
            for loved ones.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            From quick and easy meals to gourmet creations, we have something for
            everyone. Each recipe is carefully crafted, with detailed instructions,
            nutritional information, and the perfect balance of flavors. We believe
            that cooking should be fun, easy, and rewarding, and we're here to help you
            discover new favorites!
          </p>
        </div>
        <div className="md:w-1/2">
  <img
    src="/logo.png" // Using the logo from the public folder
    alt="FoodApp Logo"
    className="w-40 mx-auto"
  />
</div>
      </div>

      {/* Mission Section */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Our mission at FoodApp is to make cooking easier and more enjoyable for
          everyone. We believe that cooking is not just about following recipes — it's
          about experimenting, exploring new ingredients, and sharing joy with others.
          Our goal is to create a community of food enthusiasts who inspire each other
          to try new things, learn new skills, and celebrate the art of cooking.
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition"
        >
          Discover Recipes
        </Link>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-md mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Why Choose FoodApp?
        </h3>
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

      {/* Team Section */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Meet Our Team</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Our team is made up of passionate foodies, chefs, and nutritionists who are
          dedicated to helping you cook better, eat healthier, and explore new culinary
          adventures. We're constantly working to improve the FoodApp experience and
          bring you the best content.
        </p>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold text-gray-700">Ardit Avdimetaj</h4>
            <p className="text-gray-500">Chef & Recipe Creator</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold text-gray-700">Dion Curri </h4>
            <p className="text-gray-500">Nutritionist & Content Developer</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-block bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
