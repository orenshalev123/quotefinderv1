
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleLayoutProps {
  title: string;
  date?: string;
  author?: string;
  category?: string;
  children: React.ReactNode;
}

const ArticleLayout = ({
  title,
  date = "May 15, 2023",
  author = "Insurance Expert",
  category,
  children,
}: ArticleLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/#articles">
            <Button variant="ghost" className="mb-6 -ml-2 text-insurance-blue">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
          
          <div className="mb-8">
            {category && (
              <span className="inline-block text-sm font-medium text-insurance-blue bg-insurance-blue/10 px-3 py-1 rounded-full mb-3">
                {category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-insurance-gray-dark mb-4">
              {title}
            </h1>
            <div className="text-insurance-gray text-sm">
              <span>By {author}</span>
              <span className="mx-2">•</span>
              <span>{date}</span>
            </div>
          </div>
          
          <div className="prose prose-blue max-w-none">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleLayout;
