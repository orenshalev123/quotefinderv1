
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "@/integrations/contentful/articleService";
import { ArticleData } from "@/integrations/contentful/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedCard from "@/components/ui/AnimatedCard";

// Define the image mapping for articles
const articleImages: Record<string, string> = {
  "understanding-coverage-types": "/images/article-coverage-types.jpg",
  "lower-premium": "/images/article-lower-premium.jpg",
  "after-accident": "/images/article-after-accident.jpg",
  "comprehensive-vs-collision": "/images/article-comprehensive-collision.jpg",
  "liability-coverage": "/images/article-liability.jpg",
  "uninsured-motorist": "/images/article-uninsured-motorist.jpg",
  "insurance-discounts": "/images/article-discounts.jpg",
  "telematics-savings": "/images/article-telematics.jpg",
  "bundle-save": "/images/article-bundle.jpg",
  // Default image for any article without a specific image
  "default": "/images/article-default.jpg",
};

// Get appropriate image URL for an article
const getArticleImage = (slug: string): string => {
  return articleImages[slug] || articleImages["default"];
};

// Format date to more readable format
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const ArticleCard = ({ article, index }: { article: ArticleData; index: number }) => {
  return (
    <AnimatedCard delay={index * 0.1} direction="up">
      <div className="group h-full flex flex-col overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <div className="aspect-[16/9] overflow-hidden bg-insurance-gray-lightest">
          <img 
            src={article.featuredImage || getArticleImage(article.slug)}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 flex flex-col p-5">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-xs font-medium text-insurance-blue bg-insurance-blue/10 px-2.5 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-insurance-gray">{formatDate(article.date)}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-insurance-gray-dark group-hover:text-insurance-blue transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-insurance-gray mb-4 flex-1">
            {article.excerpt || `Learn more about ${article.title.toLowerCase()}...`}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs text-insurance-gray">
              {article.readTime || "5 min read"}
            </span>
            <Link 
              to={`/articles/${article.slug}`}
              className="text-sm font-medium text-insurance-blue hover:text-insurance-blue-dark"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

const Articles = () => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-insurance-blue bg-insurance-blue/10 px-3 py-1 rounded-full mb-3">
              Knowledge Center
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-insurance-gray-dark">
              Insurance Articles & Resources
            </h1>
            <p className="text-insurance-gray max-w-2xl mx-auto">
              Browse our collection of expert-written articles to learn more about auto insurance, 
              coverage options, and how to save money on your policy.
            </p>
          </div>
          
          {loading ? (
            // Skeleton loader while articles are loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
