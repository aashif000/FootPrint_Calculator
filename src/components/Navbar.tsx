
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "What We Do", path: "/what-we-do" },
    { name: "Solution", path: "/solution" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="eco-container">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold"
          >
            <div className="flex items-center">
              <span className="text-eco-leaf">Eco</span>
              <span className="text-eco-carbon">Footprint</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/calculator"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90"
                >
                  Try Calculator
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-md animate-fade-in md:hidden">
          <nav className="eco-container py-8">
            <ul className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "block text-lg font-medium transition-colors",
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/calculator"
                  className="inline-block rounded-full bg-primary px-6 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-primary/90"
                >
                  Try Calculator
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
