
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ArticleBreadcrumb from "./article/ArticleBreadcrumb";
import ArticleHeader from "./article/ArticleHeader";
import ArticleContent from "./article/ArticleContent";
import ArticleShare from "./article/ArticleShare";
import ArticleNavigation from "./article/ArticleNavigation";
import ArticleSidebar from "./article/ArticleSidebar";
import { useRelatedArticles } from "@/hooks/useRelatedArticles";

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
  const relatedArticles = useRelatedArticles(title, category);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6">
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
