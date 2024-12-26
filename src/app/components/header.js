import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-6">
      <nav className="flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-orange-500">FoodApp</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-700 font-medium hidden md:flex">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/favorite">Favorites</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>

        {/* Mobile Menu (hamburger) */}
        <div className="md:hidden">
          <button className="text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
