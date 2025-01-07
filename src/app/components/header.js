import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/favorite", label: "Favorites" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo with design matching About page */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-orange-500/20 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform"></div>
              <img
                src="/logo.png"
                alt="FoodApp Logo"
                className="h-10 w-10 relative transform group-hover:scale-105 transition-transform"
              />
            </div>
            <span
              className={`text-2xl font-bold ${
                isScrolled ? "text-orange-500" : "text-orange-500"
              }`}
            >
              FoodApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative py-2 text-lg font-medium transition-colors
                    ${
                      pathname === link.href
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500"
                    }
                    after:content-[''] after:absolute after:bottom-0 after:left-0 
                    after:w-full after:h-0.5 after:bg-orange-500 
                    after:transform after:scale-x-0 after:transition-transform
                    hover:after:scale-x-100
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <ul className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-lg ${
                      pathname === link.href
                        ? "text-orange-500 font-medium"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
