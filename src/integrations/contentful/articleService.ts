
import { contentfulClient, createPreviewClient, CONTENT_TYPE_ARTICLE, CONTENT_TYPE_QUOTE_FINDER } from './client';
import { ContentfulArticle, ArticleData, QuoteFinderContent } from './types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Entry } from 'contentful';
import { isPreviewMode } from './client';

// Transform Contentful article to our app's format
export const transformArticle = (article: Entry<any>): ArticleData => {
  const fields = article.fields as ContentfulArticle['fields'];
  
  return {
    id: article.sys.id,
    title: fields.title || 'Untitled Article',
    slug: fields.slug || article.sys.id,
    category: fields.category || 'General',
    date: fields.date || new Date().toISOString().split('T')[0],
    author: fields.author || 'QuoteFinder',
    readTime: fields.readTime || '5 min read',
    content: fields.content ? documentToHtmlString(fields.content) : '',
    excerpt: fields.excerpt,
    featuredImage: fields.featuredImage?.fields.file.url,
  };
};

// Transform QuoteFinder content to article format
export const transformQuoteFinderContent = (entry: Entry<any>): ArticleData => {
  const fields = entry.fields as QuoteFinderContent['fields'];
  
  // Extract a better title if possible from the entry ID or sys info
  const title = fields.title || `QuoteFinder Article: ${entry.sys.id}`;
  const slug = fields.slug || entry.sys.id;
  
  return {
    id: entry.sys.id,
    title: title,
    slug: slug,
    category: "Insurance",
    date: new Date().toISOString().split('T')[0],
    author: "QuoteFinder",
    readTime: "5 min read",
    content: fields.Articles ? documentToHtmlString(fields.Articles) : '',
    excerpt: "Insurance information from QuoteFinder",
  };
};

// Get client based on preview mode
const getClient = () => {
  return isPreviewMode() ? createPreviewClient() : contentfulClient;
};

// Get all articles
export const getAllArticles = async (): Promise<ArticleData[]> => {
  try {
    const client = getClient();
    
    // Get standard articles
    const articleResponse = await client.getEntries({
      content_type: CONTENT_TYPE_ARTICLE,
      order: ['-sys.createdAt']
    }).catch(error => {
      console.log('Error fetching articles:', error);
      return { items: [] };
    });
    
    // Get QuoteFinder content
    const quoteFinderResponse = await client.getEntries({
      content_type: CONTENT_TYPE_QUOTE_FINDER,
      order: ['-sys.createdAt']
    }).catch(error => {
      console.log('Error fetching QuoteFinder content:', error);
      return { items: [] };
    });
    
    // Transform and combine results
    const standardArticles = articleResponse.items.map(transformArticle);
    const quoteFinderArticles = quoteFinderResponse.items.map(transformQuoteFinderContent);
    
    return [...standardArticles, ...quoteFinderArticles];
  } catch (error) {
    console.error('Error fetching articles from Contentful:', error);
    return [];
  }
};

// Get article by slug
export const getArticleBySlug = async (slug: string): Promise<ArticleData | null> => {
  try {
    const client = getClient();
    
    // Try to find it as a standard article first
    const articleResponse = await client.getEntries({
      content_type: CONTENT_TYPE_ARTICLE,
      'fields.slug': slug,
      limit: 1,
    }).catch(error => {
      console.log('Error fetching article by slug:', error);
      return { items: [] };
    });

    if (articleResponse.items.length > 0) {
      return transformArticle(articleResponse.items[0]);
    }
    
    // If not found, check if it's a QuoteFinder entry
    const quoteFinderResponse = await client.getEntries({
      content_type: CONTENT_TYPE_QUOTE_FINDER,
      'sys.id': slug, // Try using ID as slug for QuoteFinder content
      limit: 1,
    }).catch(error => {
      console.log('Error fetching QuoteFinder by ID:', error);
      return { items: [] };
    });
    
    if (quoteFinderResponse.items.length > 0) {
      return transformQuoteFinderContent(quoteFinderResponse.items[0]);
    }
    
    // If still not found, try searching by slug in QuoteFinder entries
    const quoteFinderBySlugResponse = await client.getEntries({
      content_type: CONTENT_TYPE_QUOTE_FINDER,
      'fields.slug': slug, // Try using slug field if it exists
      limit: 1,
    }).catch(error => {
      console.log('Error fetching QuoteFinder by slug:', error);
      return { items: [] };
    });
    
    if (quoteFinderBySlugResponse.items.length > 0) {
      return transformQuoteFinderContent(quoteFinderBySlugResponse.items[0]);
    }

    return null;
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}" from Contentful:`, error);
    return null;
  }
};

// Get articles by category
export const getArticlesByCategory = async (category: string): Promise<ArticleData[]> => {
  try {
    const client = getClient();
    
    // For simplicity, we'll only search standard articles by category
    const response = await client.getEntries({
      content_type: CONTENT_TYPE_ARTICLE,
      'fields.category': category,
      order: ['-sys.createdAt']
    }).catch(error => {
      console.log('Error fetching articles by category:', error);
      return { items: [] };
    });

    return response.items.map(transformArticle);
  } catch (error) {
    console.error(`Error fetching articles in category "${category}" from Contentful:`, error);
    return [];
  }
};

/**
 * Enable preview mode for a specific article
 * This would be used in a server context
 * @param req The request object
 * @param res The response object
 * @param slug The article slug to preview
 */
export const enablePreview = (req: any, res: any, slug: string) => {
  // This is a simplified version - in a real application, you would
  // set cookies or session data to indicate preview mode
  res.setPreviewData({});
  res.redirect(`/articles/${slug}?preview=true`);
};

/**
 * Disable preview mode
 * This would be used in a server context
 * @param req The request object
 * @param res The response object
 */
export const disablePreview = (req: any, res: any) => {
  // In a real application, you would clear cookies or session data
  res.clearPreviewData();
  res.redirect('/');
};
