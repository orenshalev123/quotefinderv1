
import { contentfulClient, createPreviewClient, CONTENT_TYPE_ARTICLE } from './client';
import { ContentfulArticle, ArticleData } from './types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Entry } from 'contentful';
import { isPreviewMode } from './vercelSourceMaps';

// Transform Contentful article to our app's format
export const transformArticle = (article: Entry<any>): ArticleData => {
  const fields = article.fields as ContentfulArticle['fields'];
  
  return {
    id: article.sys.id,
    title: fields.title,
    slug: fields.slug,
    category: fields.category,
    date: fields.date,
    author: fields.author,
    readTime: fields.readTime || '5 min read',
    content: fields.content ? documentToHtmlString(fields.content) : '',
    excerpt: fields.excerpt,
    featuredImage: fields.featuredImage?.fields.file.url,
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
    const response = await client.getEntries({
      content_type: CONTENT_TYPE_ARTICLE,
      order: ['-sys.createdAt'] // Fix: Use array for order parameter
    });

    return response.items.map(transformArticle);
  } catch (error) {
    console.error('Error fetching articles from Contentful:', error);
    return [];
  }
};

// Get article by slug
export const getArticleBySlug = async (slug: string): Promise<ArticleData | null> => {
  try {
    const client = getClient();
    const response = await client.getEntries({
      content_type: CONTENT_TYPE_ARTICLE,
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformArticle(response.items[0]);
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}" from Contentful:`, error);
    return null;
  }
};

// Get articles by category
export const getArticlesByCategory = async (category: string): Promise<ArticleData[]> => {
  try {
    const client = getClient();
    const response = await client.getEntries({
      content_type: CONTENT_TYPE_ARTICLE,
      'fields.category': category,
      order: ['-sys.createdAt'] // Fix: Use array for order parameter
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
