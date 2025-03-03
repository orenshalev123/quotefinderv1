
import { Link } from "react-router-dom";
import { RelatedArticle } from "@/hooks/useRelatedArticles";

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (articles.length === 0) return null;
  
  return (
    <div className="bg-white border border-gray-200 rounded mb-6">
      <h3 className="text-lg font-semibold p-4 border-b border-gray-200 text-insurance-gray-dark">Related Articles</h3>
      <ul className="divide-y divide-gray-200">
        {articles.map((article) => (
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
  );
};

export default RelatedArticles;
