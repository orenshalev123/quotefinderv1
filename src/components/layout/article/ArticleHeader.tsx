
import { Link } from "react-router-dom";
import { User, Calendar, Clock } from "lucide-react";

interface ArticleHeaderProps {
  title: string;
  date: string;
  author: string;
  category?: string;
  readTime: string;
}

const ArticleHeader = ({
  title,
  date,
  author,
  category,
  readTime,
}: ArticleHeaderProps) => {
  return (
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
  );
};

export default ArticleHeader;
