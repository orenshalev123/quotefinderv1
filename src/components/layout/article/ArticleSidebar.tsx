
import RelatedArticles from "./RelatedArticles";
import PopularTopics from "./PopularTopics";
import NewsletterSignup from "./NewsletterSignup";
import { RelatedArticle } from "@/hooks/useRelatedArticles";

interface ArticleSidebarProps {
  relatedArticles: RelatedArticle[];
}

const ArticleSidebar = ({ relatedArticles }: ArticleSidebarProps) => {
  return (
    <div className="md:col-span-4">
      <RelatedArticles articles={relatedArticles} />
      <PopularTopics />
      <NewsletterSignup />
    </div>
  );
};

export default ArticleSidebar;
