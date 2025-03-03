
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Facebook, Twitter, Linkedin, Mail, Printer, Clock, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
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
  
  const handleShare = (platform: string) => {
    // Mock share functionality
    toast({
      title: "Shared!",
      description: `Article shared on ${platform}`,
      duration: 3000,
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-sm text-insurance-gray mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
              <li className="inline-flex items-center">
                <Link to="/" className="text-insurance-gray hover:text-insurance-blue transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <Link to="/#articles" className="text-insurance-gray hover:text-insurance-blue transition-colors">Articles</Link>
                </div>
              </li>
              {category && (
                <li>
                  <div className="flex items-center">
                    <span className="mx-2">/</span>
                    <Link to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-insurance-gray hover:text-insurance-blue transition-colors">{category}</Link>
                  </div>
                </li>
              )}
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-insurance-gray-dark font-medium truncate max-w-[200px] sm:max-w-xs">{title}</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="md:col-span-8">
              <article className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                <header className="mb-8 border-b border-gray-100 pb-6">
                  {category && (
                    <span className="inline-block text-sm font-medium text-insurance-blue bg-insurance-blue/10 px-3 py-1 rounded-full mb-4">
                      {category}
                    </span>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-insurance-gray-dark mb-6 leading-tight">
                    {title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center text-insurance-gray text-sm mb-6 gap-y-2">
                    <div className="flex items-center mr-6">
                      <User className="h-4 w-4 mr-2 text-insurance-blue" />
                      <span>By {author}</span>
                    </div>
                    <div className="flex items-center mr-6">
                      <Calendar className="h-4 w-4 mr-2 text-insurance-blue" />
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-insurance-blue" />
                      <span>{readTime}</span>
                    </div>
                  </div>
                  
                  {/* Social Sharing */}
                  <div className="flex items-center flex-wrap gap-2 mt-4">
                    <span className="text-sm text-insurance-gray mr-2">Share:</span>
                    <button 
                      onClick={() => handleShare("Facebook")}
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors" 
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleShare("Twitter")}
                      className="text-sky-500 hover:bg-sky-100 p-2 rounded-full transition-colors" 
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleShare("LinkedIn")}
                      className="text-blue-700 hover:bg-blue-100 p-2 rounded-full transition-colors" 
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleShare("Email")}
                      className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors" 
                      aria-label="Email"
                    >
                      <Mail className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleShare("Print")}
                      className="text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors" 
                      aria-label="Print"
                    >
                      <Printer className="h-5 w-5" />
                    </button>
                  </div>
                </header>
                
                <div className="prose prose-blue max-w-none lg:prose-lg prose-headings:text-insurance-gray-dark prose-headings:font-semibold prose-p:text-insurance-gray-dark prose-li:text-insurance-gray-dark prose-a:text-insurance-blue prose-a:no-underline hover:prose-a:underline">
                  {children}
                </div>
              </article>
              
              {/* Article Navigation */}
              <div className="flex justify-between items-center mt-8 px-2">
                <Link to="/#articles">
                  <Button variant="outline" className="text-insurance-blue gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Previous Article
                  </Button>
                </Link>
                <Link to="/#articles">
                  <Button variant="outline" className="text-insurance-blue gap-2">
                    Next Article
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              {/* Back to Articles */}
              <div className="mt-8 flex justify-center">
                <Link to="/#articles">
                  <Button variant="outline" className="text-insurance-blue">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Articles
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-4">
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-insurance-gray-dark border-b pb-2">Related Articles</h3>
                  <ul className="space-y-4">
                    {relatedArticles.map((article) => (
                      <li key={article.href} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                        <Link 
                          to={article.href}
                          className="block hover:text-insurance-blue transition-colors text-insurance-gray-dark font-medium"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Popular Topics */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-insurance-gray-dark border-b pb-2">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <Link 
                    to="/categories/coverage-information"
                    className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Coverage
                  </Link>
                  <Link 
                    to="/categories/money-saving-tips"
                    className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Savings
                  </Link>
                  <Link 
                    to="/categories/claims"
                    className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Claims
                  </Link>
                  <Link 
                    to="/categories/drivers"
                    className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Young Drivers
                  </Link>
                  <Link 
                    to="/categories/vehicles"
                    className="bg-insurance-gray-lightest text-insurance-gray-dark px-3 py-1.5 rounded-md text-sm hover:bg-insurance-blue hover:text-white transition-colors"
                  >
                    Vehicles
                  </Link>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-insurance-blue/90 to-insurance-blue-dark p-6 rounded-xl shadow-sm mt-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Stay Informed</h3>
                <p className="text-sm mb-4 text-white/90">Get the latest insurance tips and advice directly in your inbox.</p>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-3 py-2 rounded text-sm text-insurance-gray-dark focus:outline-none focus:ring-2 focus:ring-insurance-blue-light"
                  />
                  <Button className="w-full bg-white text-insurance-blue hover:bg-white/90">
                    Subscribe
                  </Button>
                </form>
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
