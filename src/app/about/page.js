// app/about/page.js
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="relative text-center mb-20">
        <div className="absolute inset-0 bg-orange-500/10 -skew-y-6 z-0"></div>
        <div className="relative z-10 py-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
            About <span className="text-orange-500">FoodApp</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bringing culinary excellence to your kitchen, one recipe at a time.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { number: "1000+", label: "Delicious Recipes" },
          { number: "50+", label: "Categories" },
          { number: "24/7", label: "Cooking Inspiration" },
        ].map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-3xl font-bold text-orange-500">
              {stat.number}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to FoodApp!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            FoodApp is more than just a recipe collection. It's a culinary
            journey that brings together food lovers to share their passion for
            cooking. Our platform offers a variety of mouthwatering recipes to
            inspire your next meal, whether you're cooking for yourself or for
            loved ones.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-orange-500">✓</span>
              <p>Expert-curated recipes for all skill levels</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-orange-500">✓</span>
              <p>Detailed instructions and ingredients</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-orange-500">✓</span>
              <p>Wide variety of cuisines</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -inset-4 bg-orange-500/20 rounded-lg transform rotate-3"></div>
          <img
            src="/logo.png"
            alt="FoodApp Logo"
            className="relative w-40 mx-auto transform hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-orange-50 to-white p-12 rounded-2xl shadow-lg mb-20">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Why Choose FoodApp?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">
                {feature.icon}
              </span>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section - Simplified */}
      <div className="text-center mb-20">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-gray-800">
              Ardit Avdimetaj
            </h4>
            <p className="text-gray-600">Recipe Creator</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-gray-800">Dion Curri</h4>
            <p className="text-gray-600">Content Developer</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition"
        >
          Explore Recipes
        </Link>
      </div>
    </div>
  );
};

const features = [
  {
    icon: "🍴",
    title: "Easy to Follow",
    description:
      "Clear, step-by-step instructions for every recipe to ensure perfect results every time.",
  },
  {
    icon: "💡",
    title: "Creative Recipes",
    description:
      "Unique and innovative dishes from around the world to inspire your cooking journey.",
  },
  {
    icon: "🌱",
    title: "Healthy Choices",
    description:
      "Diverse recipes catering to various dietary preferences and nutritional needs.",
  },
];

export default AboutPage;
