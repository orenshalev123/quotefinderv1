
import { useState } from "react";
import { ChevronDown, Book } from "lucide-react";
import AnimatedCard from "./AnimatedCard";
import { cn } from "@/lib/utils";

const Articles = () => {
  const [openCategory, setOpenCategory] = useState<string | null>("popular");

  const articleCategories = [
    {
      id: "popular",
      title: "Popular Articles",
      articles: [
        { title: "Understanding Auto Insurance Coverage Types", href: "/articles/understanding-coverage-types" },
        { title: "How to Lower Your Insurance Premium", href: "/articles/lower-premium" },
        { title: "What to Do After a Car Accident", href: "/articles/after-accident" },
      ]
    },
    {
      id: "coverage",
      title: "Coverage Information",
      articles: [
        { title: "Comprehensive vs. Collision Coverage", href: "/articles/comprehensive-vs-collision" },
        { title: "Liability Coverage Explained", href: "/articles/liability-coverage" },
        { title: "Do You Need Uninsured Motorist Coverage?", href: "/articles/uninsured-motorist" },
      ]
    },
    {
      id: "tips",
      title: "Money-Saving Tips",
      articles: [
        { title: "Insurance Discounts You Might Be Missing", href: "/articles/insurance-discounts" },
        { title: "How Telematics Can Save You Money", href: "/articles/telematics-savings" },
        { title: "Bundle and Save: Home and Auto Insurance", href: "/articles/bundle-save" },
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    if (openCategory === categoryId) {
      setOpenCategory(null);
    } else {
      setOpenCategory(categoryId);
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  {category.articles.map((article) => (
                    <a
                      key={article.title}
                      href={article.href}
                      className="block p-2 hover:bg-insurance-blue/5 rounded-md text-insurance-gray-dark hover:text-insurance-blue transition-colors"
                    >
                      {article.title}
                    </a>
                  ))}
                  <a
                    href={`/categories/${category.id}`}
                    className="block mt-4 text-insurance-blue font-medium text-sm hover:underline"
                  >
                    View all articles →
                  </a>
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
