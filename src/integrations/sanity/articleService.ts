
import { sanityClient, isSanityPreviewMode, SANITY_PROJECT_ID } from './client';
import { SanityArticle, SanityArticleData } from './types';
import { urlFor } from './client';

// Function to convert Sanity portable text to HTML (simplified version)
// In a real project, you would use @portabletext/react for more robust rendering
const portableTextToHtml = (blocks: any[]): string => {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }
  
  return blocks.map(block => {
    if (block._type !== 'block' || !block.children) {
      return '';
    }
    
    const text = block.children
      .map((child: any) => child.text)
      .join('');
    
    switch (block.style) {
      case 'h1':
        return `<h1>${text}</h1>`;
      case 'h2':
        return `<h2>${text}</h2>`;
      case 'h3':
        return `<h3>${text}</h3>`;
      case 'h4':
        return `<h4>${text}</h4>`;
      case 'blockquote':
        return `<blockquote>${text}</blockquote>`;
      default:
        return `<p>${text}</p>`;
    }
  }).join('');
};

// Transform Sanity article to our app's format
export const transformSanityArticle = (article: SanityArticle): SanityArticleData => {
  return {
    id: article._id,
    title: article.title || 'Untitled Article',
    slug: article.slug?.current || article._id,
    category: article.category || 'General',
    date: article.date || article._createdAt,
    author: article.author || 'Unknown',
    readTime: article.readTime || '5 min read',
    content: article.content ? portableTextToHtml(article.content) : '',
    excerpt: article.excerpt,
    featuredImage: article.mainImage ? urlFor(article.mainImage).url() : undefined,
    sourceMaps: {
      sanityDocumentId: article._id,
      sanityStudioUrl: `https://${SANITY_PROJECT_ID}.sanity.studio/desk/article;${article._id}`
    }
  };
};

// Get all articles from Sanity
export const getAllSanityArticles = async (): Promise<SanityArticleData[]> => {
  try {
    const query = `*[_type == "article"] | order(_createdAt desc)`;
    const articles = await sanityClient.fetch<SanityArticle[]>(query);
    
    return articles.map(transformSanityArticle);
  } catch (error) {
    console.error('Error fetching articles from Sanity:', error);
    return [];
  }
};

// Get article by slug
export const getSanityArticleBySlug = async (slug: string): Promise<SanityArticleData | null> => {
  try {
    // First, try to find by slug
    const query = `*[_type == "article" && slug.current == $slug][0]`;
    const article = await sanityClient.fetch<SanityArticle>(query, { slug });
    
    if (article) {
      return transformSanityArticle(article);
    }
    
    // If not found by slug, try by ID
    const idQuery = `*[_type == "article" && _id == $id][0]`;
    const articleById = await sanityClient.fetch<SanityArticle>(idQuery, { id: slug });
    
    if (articleById) {
      return transformSanityArticle(articleById);
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}" from Sanity:`, error);
    return null;
  }
};

// Get source mapping URL for Sanity
export const getSanitySourceMapUrl = (documentId: string): string => {
  return `https://${SANITY_PROJECT_ID}.sanity.studio/desk/article;${documentId}`;
};

// Add source mapping to an article for visual editing
export const addSanitySourceMapping = (article: SanityArticleData): SanityArticleData => {
  if (!article || !article.id) return article;
  
  return {
    ...article,
    sourceMaps: {
      sanityDocumentId: article.id,
      sanityStudioUrl: getSanitySourceMapUrl(article.id)
    }
  };
};
