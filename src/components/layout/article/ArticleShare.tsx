
import { Facebook, Twitter, Linkedin, Mail, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ArticleShareProps {
  title?: string;
}

const ArticleShare = ({ title = "Share this article" }: ArticleShareProps) => {
  const { toast } = useToast();
  
  const handleShare = (platform: string) => {
    toast({
      title: "Shared!",
      description: `Article shared on ${platform}`,
      duration: 3000,
    });
  };
  
  return (
    <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="mb-3 sm:mb-0">
          <span className="text-sm text-insurance-gray-dark font-medium mr-2">{title}:</span>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <button 
            onClick={() => handleShare("Facebook")}
            className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors flex items-center text-sm" 
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4 mr-1" />
            <span>Facebook</span>
          </button>
          <button 
            onClick={() => handleShare("Twitter")}
            className="text-sky-500 hover:bg-sky-100 p-2 rounded-full transition-colors flex items-center text-sm" 
            aria-label="Share on Twitter"
          >
            <Twitter className="h-4 w-4 mr-1" />
            <span>Twitter</span>
          </button>
          <button 
            onClick={() => handleShare("LinkedIn")}
            className="text-blue-700 hover:bg-blue-100 p-2 rounded-full transition-colors flex items-center text-sm" 
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4 mr-1" />
            <span>LinkedIn</span>
          </button>
          <button 
            onClick={() => handleShare("Email")}
            className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors flex items-center text-sm" 
            aria-label="Email"
          >
            <Mail className="h-4 w-4 mr-1" />
            <span>Email</span>
          </button>
          <button 
            onClick={() => handleShare("Print")}
            className="text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors flex items-center text-sm" 
            aria-label="Print"
          >
            <Printer className="h-4 w-4 mr-1" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleShare;
