
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getSanityArticleBySlug, addSanitySourceMapping } from '@/integrations/sanity/articleService';
import ArticleLayout from '@/components/layout/ArticleLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BadgeAlert, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SanityArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preview = searchParams.get('sanity-preview') === 'true';
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError('No article slug provided');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        console.log(`Fetching Sanity article with slug: ${slug}, preview: ${preview}, retry: ${retryCount}`);
        
        const articleData = await getSanityArticleBySlug(slug);
        
        if (!articleData) {
          setError(`Article with slug "${slug}" not found`);
          console.error(`Sanity article with slug "${slug}" not found`);
        } else {
          // Add source mapping for visual editing
          const articleWithSourceMap = addSanitySourceMapping(articleData);
          setArticle(articleWithSourceMap);
          console.log('Sanity article loaded successfully:', articleWithSourceMap);
          
          // Add Sanity visual editing metadata tags
          addSanityMetaTags(articleWithSourceMap.id);
        }
      } catch (err) {
        console.error('Error fetching Sanity article:', err);
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, preview, retryCount]);
  
  // Function to add Sanity metadata tags for visual editing
  const addSanityMetaTags = (documentId: string) => {
    // Remove any existing Sanity tags
    document.querySelectorAll('meta[name^="sanity-"]').forEach(tag => tag.remove());
    
    // Add source map metadata tags
    const head = document.querySelector('head');
    if (head) {
      const contentIdMeta = document.createElement('meta');
      contentIdMeta.setAttribute('name', 'sanity-document-id');
      contentIdMeta.setAttribute('content', documentId);
      head.appendChild(contentIdMeta);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleGoBack = () => {
    navigate('/articles');
  };

  if (loading) {
    return (
      <ArticleLayout title="Loading article...">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </ArticleLayout>
    );
  }

  if (error || !article) {
    return (
      <ArticleLayout title="Article Not Found">
        <Alert variant="destructive" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Error Loading Sanity Article</AlertTitle>
          <AlertDescription>
            {error || "The requested article could not be found. It may have been removed or the URL is incorrect."}
            <p className="mt-2">Details: slug={slug}, preview={preview?.toString()}</p>
          </AlertDescription>
        </Alert>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button onClick={handleRetry} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button onClick={handleGoBack} variant="outline">
            Return to Articles
          </Button>
        </div>
      </ArticleLayout>
    );
  }

  return (
    <ArticleLayout
      title={article.title}
      category={article.category}
      date={article.date}
      author={article.author}
      readTime={article.readTime}
    >
      {preview && (
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <BadgeAlert className="h-4 w-4 text-amber-600" />
          <AlertTitle>Sanity Preview Mode</AlertTitle>
          <AlertDescription>
            You are viewing this Sanity article in preview mode. Some content may not be published yet.
            <p className="mt-1 text-sm">Document ID: {article.id}</p>
          </AlertDescription>
        </Alert>
      )}
      <div 
        className="article-content prose prose-lg max-w-none" 
        dangerouslySetInnerHTML={{ __html: article.content }}
        data-sanity-document-id={article.id}
        data-sanity-studio-url={article.sourceMaps?.sanityStudioUrl}
      />
    </ArticleLayout>
  );
};

export default SanityArticle;
