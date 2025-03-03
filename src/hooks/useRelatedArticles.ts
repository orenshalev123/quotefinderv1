
import { useMemo } from "react";

export interface RelatedArticle {
  title: string;
  href: string;
  category: string;
}

export const useRelatedArticles = (currentTitle: string, currentCategory?: string) => {
  const allArticles: RelatedArticle[] = [
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
  
  return useMemo(() => {
    if (!currentCategory) return [];
    
    return allArticles
      .filter(article => article.category === currentCategory && article.title !== currentTitle)
      .slice(0, 3);
  }, [currentTitle, currentCategory]);
};
