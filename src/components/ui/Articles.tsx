import { useState, useEffect } from "react";
import { ChevronDown, Book } from "lucide-react";
import AnimatedCard from "./AnimatedCard";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { getAllArticles } from "@/integrations/contentful/articleService";
import { addSourceMapping } from "@/integrations/contentful/vercelSourceMaps";
import { ArticleData } from "@/integrations/contentful/types";
import { Skeleton } from "@/components/ui/skeleton";

const Articles = () => {
  const [openCategory, setOpenCategory] = useState<string | null>("popular");
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticles();
        const articlesWithSourceMaps = data.map(article => addSourceMapping(article));
        setArticles(articlesWithSourceMaps);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const toggleCategory = (categoryId: string) => {
    if (openCategory === categoryId) {
      setOpenCategory(null);
    } else {
      setOpenCategory(categoryId);
    }
  };

  const getArticlesByCategory = (category: string) => {
    return articles.filter(article => 
      category === "popular" 
        ? ["Understanding Auto Insurance Coverage Types", "How to Lower Your Insurance Premium", "What to Do After a Car Accident"].includes(article.title)
        : article.category === category
    ).slice(0, 3);
  };

  const quoteFinderArticles = [
    {
      id: "quotefinder-auto-insurance-guide",
      title: "Understanding Auto Insurance: A Complete Guide",
      slug: "auto-insurance-guide",
      category: "Insurance"
    }
  ];

  const articleCategories = [
    {
      id: "popular",
      title: "Popular Articles",
      articles: getArticlesByCategory("popular")
    },
    {
      id: "coverage",
      title: "Coverage Information",
      articles: getArticlesByCategory("Coverage Information")
    },
    {
      id: "tips",
      title: "Money-Saving Tips",
      articles: getArticlesByCategory("Money-Saving Tips")
    },
    {
      id: "quoteFinder",
      title: "QuoteFinder Resources",
      articles: quoteFinderArticles
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="articles">
      <div className="text-center mb-12">
        <span className="inline-block text-sm font-medium text-insurance-blue bg-insurance-blue/10 px-3 py-1 rounded-full mb-3">
          Expert Advice
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-insurance-gray-dark">
          Insurance Articles & Resources
        </h2>
        <p className="text-insurance-gray max-w-2xl mx-auto">
          Browse our collection of articles to learn more about auto insurance, coverage options, and how to save money on your policy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articleCategories.map((category, index) => (
          <AnimatedCard
            key={category.id}
            className="overflow-hidden h-full"
            delay={index + 1}
            direction="up"
          >
            <div className="border border-insurance-gray-light rounded-xl h-full bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 text-left font-medium text-insurance-gray-dark bg-insurance-gray-lightest border-b border-insurance-gray-light"
              >
                <div className="flex items-center">
                  <Book className="h-5 w-5 text-insurance-blue mr-2" />
                  <span>{category.title}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-insurance-gray transition-transform",
                    openCategory === category.id ? "transform rotate-180" : ""
                  )}
                />
              </button>

              <div
                className={cn(
                  "transition-all duration-300 ease-in-out overflow-hidden",
                  openCategory === category.id ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="p-4 space-y-2">
                  {loading && category.id !== "quoteFinder" ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="p-2">
                        <Skeleton className="h-5 w-full" />
                      </div>
                    ))
                  ) : category.id === "quoteFinder" ? (
                    quoteFinderArticles.map((article) => (
                      <Link
                        key={article.id}
                        to={`/quote-finder/${article.slug}`}
                        className="block p-2 hover:bg-insurance-blue/5 rounded-md text-insurance-gray-dark hover:text-insurance-blue transition-colors"
                      >
                        {article.title}
                      </Link>
                    ))
                  ) : category.articles.length > 0 ? (
                    category.articles.map((article) => (
                      <Link
                        key={article.id}
                        to={`/articles/${article.slug}`}
                        className="block p-2 hover:bg-insurance-blue/5 rounded-md text-insurance-gray-dark hover:text-insurance-blue transition-colors"
                        data-vercel-content-id={article.sourceMaps?.vercelContentId}
                        data-vercel-content-source={article.sourceMaps?.vercelContentSource}
                      >
                        {article.title}
                      </Link>
                    ))
                  ) : (
                    <p className="p-2 text-insurance-gray-dark">No articles available</p>
                  )}
                  <Link
                    to={category.id === "quoteFinder" ? "/quote-finder" : `/categories/${category.id}`}
                    className="block mt-4 text-insurance-blue font-medium text-sm hover:underline"
                  >
                    View all articles →
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
};

export default Articles;
