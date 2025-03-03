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
    toast({
      title: "Shared!",
      description: `Article shared on ${platform}`,
      duration: 3000,
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-6 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center text-sm text-insurance-gray mb-6" aria-label="Breadcrumb">
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
            <div className="md:col-span-8">
              <article className="bg-white rounded-xl shadow-sm overflow-hidden">
                <header className="border-b border-gray-200 px-8 pt-8 pb-6">
                  {category && (
                    <span className="inline-block text-sm font-medium text-insurance-blue bg-insurance-blue/10 px-3 py-1 rounded-full mb-3">
                      {category}
                    </span>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-insurance-gray-dark mb-4 leading-tight">
                    {title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center text-insurance-gray text-sm mb-4 gap-y-2">
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
                </header>
                
                <div className="px-8 py-8">
                  <div className="prose prose-sm max-w-none sm:prose lg:prose-lg
                    prose-headings:text-insurance-gray-dark 
                    prose-headings:font-semibold 
                    prose-h1:text-3xl
                    prose-h1:font-bold
                    prose-h1:border-b
                    prose-h1:pb-4
                    prose-h1:mb-6
                    
                    prose-h2:text-2xl
                    prose-h2:font-bold
                    prose-h2:mt-10
                    prose-h2:mb-5
                    prose-h2:pb-1
                    prose-h2:border-b
                    prose-h2:border-gray-200
                    prose-h2:text-insurance-blue-dark
                    
                    prose-h3:text-xl
                    prose-h3:font-bold
                    prose-h3:mt-8
                    prose-h3:mb-4
                    prose-h3:text-insurance-gray-dark
                    
                    prose-p:text-insurance-gray-dark
                    prose-p:my-6
                    prose-p:leading-relaxed
                    prose-p:text-base
                    
                    prose-li:text-insurance-gray-dark 
                    prose-li:my-2
                    prose-li:text-base
                    prose-li:leading-relaxed
                    
                    prose-ul:my-6
                    prose-ul:pl-5
                    prose-ul:list-disc
                    
                    prose-ol:my-6
                    prose-ol:pl-5
                    prose-ol:list-decimal
                    
                    prose-a:text-insurance-blue 
                    prose-a:no-underline 
                    prose-a:font-medium
                    hover:prose-a:underline
                    
                    prose-strong:font-semibold
                    prose-strong:text-insurance-gray-dark
                    
                    prose-blockquote:border-l-4
                    prose-blockquote:border-insurance-blue-light
                    prose-blockquote:pl-6
                    prose-blockquote:py-2
                    prose-blockquote:my-8
                    prose-blockquote:italic
                    prose-blockquote:text-insurance-gray-dark
                    prose-blockquote:bg-gray-50
                    
                    prose-table:border
                    prose-table:border-collapse
                    prose-table:w-full
                    prose-table:my-8
                    
                    prose-th:bg-gray-100
                    prose-th:text-left
                    prose-th:p-3
                    prose-th:font-semibold
                    prose-th:border
                    prose-th:border-gray-300
                    
                    prose-td:p-3
                    prose-td:border
                    prose-td:border-gray-300
                    
                    prose-hr:my-10
                    prose-hr:border-gray-200
                  ">
                    {children}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-3 sm:mb-0">
                      <span className="text-sm text-insurance-gray-dark font-medium mr-2">Share this article:</span>
                    </div>
                    <div className="flex items-center flex-wrap gap-2">
                      <button 
                        onClick={() => handleShare("Facebook")}
                        className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors flex items-center text-sm" 
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="h-4 w-4 mr-1" />
                        <span>Facebook</span>
                      </button>
                      <button 
                        onClick={() => handleShare("Twitter")}
                        className="text-sky-500 hover:bg-sky-100 p-2 rounded-full transition-colors flex items-center text-sm" 
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="h-4 w-4 mr-1" />
                        <span>Twitter</span>
                      </button>
                      <button 
                        onClick={() => handleShare("LinkedIn")}
                        className="text-blue-700 hover:bg-blue-100 p-2 rounded-full transition-colors flex items-center text-sm" 
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="h-4 w-4 mr-1" />
                        <span>LinkedIn</span>
                      </button>
                      <button 
                        onClick={() => handleShare("Email")}
                        className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors flex items-center text-sm" 
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        <span>Email</span>
                      </button>
                      <button 
                        onClick={() => handleShare("Print")}
                        className="text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors flex items-center text-sm" 
                        aria-label="Print"
                      >
                        <Printer className="h-4 w-4 mr-1" />
                        <span>Print</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
              
              <div className="flex justify-between items-center mt-6 px-2">
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
              
              <div className="mt-6 flex justify-center">
                <Link to="/#articles">
                  <Button variant="outline" className="text-insurance-blue">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Articles
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:col-span-4">
              {relatedArticles.length > 0 && (
                <div className="bg-white border border-gray-200 rounded mb-6">
                  <h3 className="text-lg font-semibold p-4 border-b border-gray-200 text-insurance-gray-dark">Related Articles</h3>
                  <ul className="divide-y divide-gray-200">
                    {relatedArticles.map((article) => (
                      <li key={article.href} className="p-4">
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
              
              <div className="bg-white border border-gray-200 rounded mb-6">
                <h3 className="text-lg font-semibold p-4 border-b border-gray-200 text-insurance-gray-dark">Popular Topics</h3>
                <div className="p-4 flex flex-wrap gap-2">
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
              
              <div className="bg-white border border-gray-200 rounded overflow-hidden">
                <div className="bg-insurance-blue-dark text-white p-4">
                  <h3 className="text-lg font-semibold">Stay Informed</h3>
                  <p className="text-sm mt-1 text-white/90">Get insurance tips in your inbox</p>
                </div>
                <div className="p-4">
                  <form className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-insurance-gray-dark focus:outline-none focus:ring-2 focus:ring-insurance-blue-light"
                    />
                    <Button className="w-full bg-insurance-blue hover:bg-insurance-blue-dark text-white">
                      Subscribe
                    </Button>
                  </form>
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
