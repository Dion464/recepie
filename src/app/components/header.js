// app/layout.js or wherever your Header is
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-orange-500">FoodApp</span>
        </div>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/favorite">Favorites</Link></li>
          <li><Link href="/about">About</Link></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Header;
