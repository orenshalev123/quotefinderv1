import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close articles dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsArticlesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsArticlesOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-insurance-blue">
            QuoteFinder.io
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(
              "text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium",
              location.pathname === "/" && "text-insurance-blue"
            )}
          >
            Home
          </Link>
          
          {/* Articles Link */}
          <Link
            to="/articles"
            className={cn(
              "text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium",
              location.pathname.includes("/articles") && "text-insurance-blue"
            )}
          >
            Articles
          </Link>
          
          {/* Articles Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsArticlesOpen(!isArticlesOpen)}
              className="flex items-center text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium"
            >
              Categories
              <ChevronDown className={cn(
                "ml-1 h-4 w-4 transition-transform duration-200",
                isArticlesOpen && "transform rotate-180"
              )} />
            </button>
            
            {isArticlesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50 animate-fade-in">
                <ArticleLinks />
              </div>
            )}
          </div>
          
          <Link
            to="#about"
            className="text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium"
          >
            About Us
          </Link>
          <Link
            to="#contact"
            className="text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium"
          >
            Contact
          </Link>
          <Button className="bg-insurance-blue hover:bg-insurance-blue-dark">Get a Quote</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-insurance-gray-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in py-4 px-6 z-50">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={cn(
                "text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium py-2",
                location.pathname === "/" && "text-insurance-blue"
              )}
            >
              Home
            </Link>
            
            {/* Mobile Articles Link */}
            <Link
              to="/articles"
              className={cn(
                "text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium py-2",
                location.pathname.includes("/articles") && "text-insurance-blue"
              )}
            >
              Articles
            </Link>
            
            {/* Mobile Articles Dropdown */}
            <div>
              <button 
                onClick={() => setIsArticlesOpen(!isArticlesOpen)}
                className="flex items-center text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium py-2 w-full text-left"
              >
                Categories
                <ChevronDown className={cn(
                  "ml-1 h-4 w-4 transition-transform duration-200",
                  isArticlesOpen && "transform rotate-180"
                )} />
              </button>
              
              {isArticlesOpen && (
                <div className="pl-4 py-2 space-y-2 border-l-2 border-insurance-blue/20 ml-2">
                  <ArticleLinks isMobile />
                </div>
              )}
            </div>
            
            <Link
              to="#about"
              className="text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium py-2"
            >
              About Us
            </Link>
            <Link
              to="#contact"
              className="text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium py-2"
            >
              Contact
            </Link>
            <Button className="w-full bg-insurance-blue hover:bg-insurance-blue-dark">Get a Quote</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

const ArticleLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const articles = [
    { title: "Understanding Auto Insurance Coverage Types", href: "/articles/understanding-coverage-types" },
    { title: "How to Lower Your Insurance Premium", href: "/articles/lower-premium" },
    { title: "What to Do After a Car Accident", href: "/articles/after-accident" },
    { title: "Comprehensive vs. Collision Coverage", href: "/articles/comprehensive-vs-collision" },
    { title: "Insurance Discounts You Might Be Missing", href: "/articles/insurance-discounts" },
    { title: "Understanding Auto Insurance: A Complete Guide", href: "/quote-finder/auto-insurance-guide" },
  ];

  return (
    <>
      {articles.map((article) => (
        <Link
          key={article.title}
          to={article.href}
          className={cn(
            "block hover:bg-insurance-blue/10 text-insurance-gray-dark hover:text-insurance-blue transition-colors",
            isMobile ? "py-1" : "px-4 py-2"
          )}
        >
          {article.title}
        </Link>
      ))}
    </>
  );
};

export default Header;
