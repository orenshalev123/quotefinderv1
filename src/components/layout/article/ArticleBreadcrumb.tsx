
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

interface ArticleBreadcrumbProps {
  title: string;
  category?: string;
}

const ArticleBreadcrumb = ({ title, category }: ArticleBreadcrumbProps) => {
  // Truncate title for breadcrumb if it's too long
  const truncatedTitle = title.length > 50 ? `${title.substring(0, 50)}...` : title;
  
  return (
    <nav className="flex items-center text-sm text-insurance-gray py-4 px-6 md:px-8 bg-insurance-gray-lightest rounded-md mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-insurance-blue hover:text-insurance-blue-dark transition-colors font-medium">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2 text-insurance-gray">/</span>
            <Link to="/articles" className="text-insurance-blue hover:text-insurance-blue-dark transition-colors font-medium">
              Articles
            </Link>
          </div>
        </li>
        {category && (
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-insurance-gray">/</span>
              <Link 
                to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-insurance-blue hover:text-insurance-blue-dark transition-colors font-medium"
              >
                {category}
              </Link>
            </div>
          </li>
        )}
        <li aria-current="page">
          <div className="flex items-center">
            <span className="mx-2 text-insurance-gray">/</span>
            <span className="text-insurance-gray-dark font-medium truncate max-w-[200px] sm:max-w-xs">
              {truncatedTitle}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default ArticleBreadcrumb;
