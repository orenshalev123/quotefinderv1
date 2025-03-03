
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ArticleBreadcrumb from "./article/ArticleBreadcrumb";
import ArticleHeader from "./article/ArticleHeader";
import ArticleContent from "./article/ArticleContent";
import ArticleShare from "./article/ArticleShare";
import ArticleNavigation from "./article/ArticleNavigation";
import ArticleSidebar from "./article/ArticleSidebar";

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-6 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ArticleBreadcrumb title={title} category={category} />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <article className="bg-white rounded-xl shadow-sm overflow-hidden">
                <ArticleHeader 
                  title={title}
                  date={date}
                  author={author}
                  category={category}
                  readTime={readTime}
                />
                
                <ArticleContent>
                  {children}
                </ArticleContent>
                
                <ArticleShare />
              </article>
              
              <ArticleNavigation />
            </div>
            
            <ArticleSidebar relatedArticles={relatedArticles} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleLayout;
