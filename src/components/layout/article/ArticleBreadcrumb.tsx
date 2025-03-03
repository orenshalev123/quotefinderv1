
import { Link } from "react-router-dom";

interface ArticleBreadcrumbProps {
  title: string;
  category?: string;
}

const ArticleBreadcrumb = ({ title, category }: ArticleBreadcrumbProps) => {
  return (
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
  );
};

export default ArticleBreadcrumb;
