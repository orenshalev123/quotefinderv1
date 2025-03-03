
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ArticleNavigation = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-6 px-2">
        <Link to="/#articles">
          <Button variant="outline" className="text-insurance-blue gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous Article
          </Button>
        </Link>
        <Link to="/#articles">
          <Button variant="outline" className="text-insurance-blue gap-2">
            Next Article
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Link to="/#articles">
          <Button variant="outline" className="text-insurance-blue">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Articles
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ArticleNavigation;
