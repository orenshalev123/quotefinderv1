
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold text-insurance-gray-dark">
            QuoteFinder.io
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <Button>Get a Quote</Button>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <NavLinks isMobile />
            <Button className="w-full">Get a Quote</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Coverage", href: "#coverage" },
    { name: "Benefits", href: "#benefits" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return links.map((link) => (
    <a
      key={link.name}
      href={link.href}
      className={cn(
        "text-insurance-gray-dark hover:text-insurance-blue transition-colors font-medium",
        isMobile ? "py-2" : ""
      )}
    >
      {link.name}
    </a>
  ));
};

export default Header;
