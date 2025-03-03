
import { useState, useEffect } from 'react';
import { useParams, Navigate, useSearchParams } from 'react-router-dom';
import { getArticleBySlug } from '@/integrations/contentful/articleService';
import { addSourceMapping, isPreviewMode } from '@/integrations/contentful/vercelSourceMaps';
import ArticleLayout from '@/components/layout/ArticleLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BadgeAlert, Info } from 'lucide-react';

const ContentfulArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const preview = searchParams.get('preview') === 'true';
  const contentType = searchParams.get('content_type') || 'article';
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        console.log(`Fetching article with slug: ${slug}, content type: ${contentType}, preview: ${preview}`);
        
        const articleData = await getArticleBySlug(slug, contentType);
        
        if (!articleData) {
          setError('Article not found');
          console.error(`Article with slug "${slug}" not found`);
        } else {
          // Add source mapping to the article for Vercel's Visual Editing
          const articleWithSourceMap = addSourceMapping(articleData);
          setArticle(articleWithSourceMap);
          console.log('Article loaded successfully:', articleWithSourceMap);
          
          // Add Vercel metadata tags to the document head
          addVercelMetaTags(articleWithSourceMap.id);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, preview, contentType]);
  
  // Function to add Vercel metadata tags for Visual Editing
  const addVercelMetaTags = (entryId: string) => {
    // Remove any existing Vercel tags
    document.querySelectorAll('meta[name^="vercel-"]').forEach(tag => tag.remove());
    
    // Add source map metadata tags
    const head = document.querySelector('head');
    if (head) {
      const contentIdMeta = document.createElement('meta');
      contentIdMeta.setAttribute('name', 'vercel-content-id');
      contentIdMeta.setAttribute('content', entryId);
      head.appendChild(contentIdMeta);
      
      const sourceUrlMeta = document.createElement('meta');
      sourceUrlMeta.setAttribute('name', 'vercel-content-source');
      sourceUrlMeta.setAttribute('content', `https://app.contentful.com/spaces/9ohibvmav2q6/environments/master/entries/${entryId}`);
      head.appendChild(sourceUrlMeta);
    }
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
          <AlertTitle>Error Loading Article</AlertTitle>
          <AlertDescription>
            {error || "The requested article could not be found. It may have been removed or the URL is incorrect."}
            <p className="mt-2">Details: slug={slug}, contentType={contentType}, preview={preview.toString()}</p>
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
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
          <AlertTitle>Preview Mode</AlertTitle>
          <AlertDescription>
            You are viewing this article in preview mode. Some content may not be published yet.
            <p className="mt-1 text-sm">Content Type: {contentType}, ID: {article.id}</p>
          </AlertDescription>
        </Alert>
      )}
      <div 
        className="article-content prose prose-lg max-w-none" 
        dangerouslySetInnerHTML={{ __html: article.content }}
        data-vercel-content-id={article.id}
        data-vercel-content-source={article.sourceMaps?.vercelContentSource}
      />
    </ArticleLayout>
  );
};

export default ContentfulArticle;
