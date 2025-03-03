
import React from "react";

interface ArticleContentProps {
  children: React.ReactNode;
}

const ArticleContent = ({ children }: ArticleContentProps) => {
  return (
    <div className="px-8 py-8">
      <div className="prose prose-sm max-w-none sm:prose lg:prose-lg
        prose-headings:text-insurance-gray-dark 
        prose-headings:font-semibold 
        prose-h1:text-3xl
        prose-h1:font-bold
        prose-h1:border-b
        prose-h1:pb-4
        prose-h1:mb-6
        
        prose-h2:text-2xl
        prose-h2:font-bold
        prose-h2:mt-10
        prose-h2:mb-5
        prose-h2:pb-1
        prose-h2:border-b
        prose-h2:border-gray-200
        prose-h2:text-insurance-blue-dark
        
        prose-h3:text-xl
        prose-h3:font-bold
        prose-h3:mt-8
        prose-h3:mb-4
        prose-h3:text-insurance-gray-dark
        
        prose-p:text-insurance-gray-dark
        prose-p:my-6
        prose-p:leading-relaxed
        prose-p:text-base
        
        prose-li:text-insurance-gray-dark 
        prose-li:my-2
        prose-li:text-base
        prose-li:leading-relaxed
        
        prose-ul:my-6
        prose-ul:pl-5
        prose-ul:list-disc
        
        prose-ol:my-6
        prose-ol:pl-5
        prose-ol:list-decimal
        
        prose-a:text-insurance-blue 
        prose-a:no-underline 
        prose-a:font-medium
        hover:prose-a:underline
        
        prose-strong:font-semibold
        prose-strong:text-insurance-gray-dark
        
        prose-blockquote:border-l-4
        prose-blockquote:border-insurance-blue-light
        prose-blockquote:pl-6
        prose-blockquote:py-2
        prose-blockquote:my-8
        prose-blockquote:italic
        prose-blockquote:text-insurance-gray-dark
        prose-blockquote:bg-gray-50
        
        prose-table:border
        prose-table:border-collapse
        prose-table:w-full
        prose-table:my-8
        
        prose-th:bg-gray-100
        prose-th:text-left
        prose-th:p-3
        prose-th:font-semibold
        prose-th:border
        prose-th:border-gray-300
        
        prose-td:p-3
        prose-td:border
        prose-td:border-gray-300
        
        prose-hr:my-10
        prose-hr:border-gray-200
      ">
        {children}
      </div>
    </div>
  );
};

export default ArticleContent;
