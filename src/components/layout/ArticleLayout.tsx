
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Facebook, Twitter, Linkedin, Mail, Printer, Clock, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleLayoutProps {
  title: string;
  date?: string;
  author?: string;
  category?: string;
  readTime?: string;
  children: React.ReactNode;
}

const ArticleLayout = ({
  title,
  date = "May 15, 2023",
  author = "Insurance Expert",
  category,
  readTime = "5 min read",
  children,
}: ArticleLayoutProps) => {
  // Get related articles based on category
  const getRelatedArticles = () => {
    const allArticles = [
      { title: "Understanding Auto Insurance Coverage Types", href: "/articles/understanding-coverage-types", category: "Coverage Information" },
      { title: "How to Lower Your Insurance Premium", href: "/articles/lower-premium", category: "Money-Saving Tips" },
      { title: "What to Do After a Car Accident", href: "/articles/after-accident", category: "Popular Articles" },
      { title: "Comprehensive vs. Collision Coverage", href: "/articles/comprehensive-vs-collision", category: "Coverage Information" },
      { title: "Liability Coverage Explained", href: "/articles/liability-coverage", category: "Coverage Information" },
      { title: "Do You Need Uninsured Motorist Coverage?", href: "/articles/uninsured-motorist", category: "Coverage Information" },
      { title: "Insurance Discounts You Might Be Missing", href: "/articles/insurance-discounts", category: "Money-Saving Tips" },
      { title: "How Telematics Can Save You Money", href: "/articles/telematics-savings", category: "Money-Saving Tips" },
      { title: "Bundle and Save: Home and Auto Insurance", href: "/articles/bundle-save", category: "Money-Saving Tips" },
    ];
    
    return allArticles
      .filter(article => article.category === category && article.title !== title)
      .slice(0, 3);
  };

  const relatedArticles = getRelatedArticles();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-sm text-insurance-gray mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-insurance-gray hover:text-insurance-blue">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <Link to="/#articles" className="text-insurance-gray hover:text-insurance-blue">Articles</Link>
                </div>
              </li>
              {category && (
                <li>
                  <div className="flex items-center">
                    <span className="mx-2">/</span>
                    <Link to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-insurance-gray hover:text-insurance-blue">{category}</Link>
                  </div>
                </li>
              )}
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-insurance-gray-dark">{title}</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="md:col-span-8">
              <article>
                <header className="mb-8">
                  {category && (
                    <span className="inline-block text-sm font-medium text-insurance-blue bg-insurance-blue/10 px-3 py-1 rounded-full mb-3">
                      {category}
                    </span>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-insurance-gray-dark mb-4">
                    {title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center text-insurance-gray text-sm mb-4">
                    <div className="flex items-center mr-4">
                      <User className="h-4 w-4 mr-1" />
                      <span>By {author}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{readTime}</span>
                    </div>
                  </div>
                  
                  {/* Social Sharing */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-sm text-insurance-gray">Share:</span>
                    <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-full" aria-label="Share on Facebook">
                      <Facebook className="h-4 w-4" />
                    </button>
                    <button className="text-sky-500 hover:bg-sky-100 p-2 rounded-full" aria-label="Share on Twitter">
                      <Twitter className="h-4 w-4" />
                    </button>
                    <button className="text-blue-700 hover:bg-blue-100 p-2 rounded-full" aria-label="Share on LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="text-red-500 hover:bg-red-100 p-2 rounded-full" aria-label="Email">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-full" aria-label="Print">
                      <Printer className="h-4 w-4" />
                    </button>
                  </div>
                </header>
                
                <div className="prose prose-blue max-w-none">
                  {children}
                </div>
              </article>
              
              {/* Back to Articles */}
              <Link to="/#articles">
                <Button variant="outline" className="mt-10 text-insurance-blue">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Articles
                </Button>
              </Link>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-4">
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-insurance-gray-lightest p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-insurance-gray-dark">Related Articles</h3>
                  <ul className="space-y-4">
                    {relatedArticles.map((article) => (
                      <li key={article.href}>
                        <Link 
                          to={article.href}
                          className="block hover:text-insurance-blue transition-colors"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Popular Topics */}
              <div className="bg-insurance-gray-lightest p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-insurance-gray-dark">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <Link 
                    to="/categories/coverage-information"
                    className="bg-white text-insurance-gray-dark px-3 py-1 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Coverage
                  </Link>
                  <Link 
                    to="/categories/money-saving-tips"
                    className="bg-white text-insurance-gray-dark px-3 py-1 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Savings
                  </Link>
                  <Link 
                    to="/categories/claims"
                    className="bg-white text-insurance-gray-dark px-3 py-1 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Claims
                  </Link>
                  <Link 
                    to="/categories/drivers"
                    className="bg-white text-insurance-gray-dark px-3 py-1 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Young Drivers
                  </Link>
                  <Link 
                    to="/categories/vehicles"
                    className="bg-white text-insurance-gray-dark px-3 py-1 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Vehicles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleLayout;
