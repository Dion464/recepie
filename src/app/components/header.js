import { useState } from "react";
import Link from "next/link";

const Header = () => {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-transparent shadow-md p-6">
    <nav className="flex items-center justify-between flex-wrap">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold text-orange-500">FoodApp</span>
      </div>
 

   
        <ul className="flex space-x-6 text-gray-700 font-medium hidden md:flex">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/favorite">Favorites</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>

 
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

   
      {isMenuOpen && (
        <ul className="flex flex-col space-y-4 mt-4 md:hidden">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/favorite">Favorites</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      )}
    </header>
  );
};

export default Header;
