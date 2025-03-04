
import { sanityClient, isSanityPreviewMode, SANITY_PROJECT_ID } from './client';
import { SanityArticle, SanityArticleData } from './types';
import { urlFor } from './client';

// Improved function to convert Sanity portable text to HTML
// This is a simplified version - in a real project, you would use @portabletext/react
const portableTextToHtml = (blocks: any[]): string => {
  if (!blocks || !Array.isArray(blocks)) {
    console.warn('Invalid blocks provided to portableTextToHtml:', blocks);
    return '<p>Content could not be loaded</p>';
  }
  
  try {
    return blocks.map(block => {
      // Handle image blocks
      if (block._type === 'image' && block.asset) {
        const imageUrl = urlFor(block).url();
        const alt = block.alt || 'Article image';
        const caption = block.caption ? `<figcaption>${block.caption}</figcaption>` : '';
        return `<figure><img src="${imageUrl}" alt="${alt}" />${caption}</figure>`;
      }
      
      // Handle text blocks
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      
      // Process text with marks (bold, italic, etc.)
      const text = block.children
        .map((child: any) => {
          let content = child.text || '';
          
          // Apply marks if present
          if (child.marks && child.marks.length > 0) {
            child.marks.forEach((mark: string) => {
              if (mark === 'strong') content = `<strong>${content}</strong>`;
              if (mark === 'em') content = `<em>${content}</em>`;
              if (mark === 'underline') content = `<u>${content}</u>`;
              if (mark === 'strike-through') content = `<s>${content}</s>`;
              if (mark === 'code') content = `<code>${content}</code>`;
              // Handle link annotations here if needed
            });
          }
          
          return content;
        })
        .join('');
      
      // Apply block styles
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
  } catch (error) {
    console.error('Error parsing Sanity content:', error);
    return '<p>There was an error displaying this content</p>';
  }
};

// Transform Sanity article to our app's format with better error handling
export const transformSanityArticle = (article: SanityArticle): SanityArticleData => {
  if (!article) {
    console.error('Cannot transform undefined or null article');
    return {
      id: 'error',
      title: 'Error Loading Article',
      slug: 'error',
      category: 'Error',
      date: new Date().toISOString().split('T')[0],
      author: 'System',
      readTime: '0 min read',
      content: '<p>There was an error loading this article</p>',
      excerpt: 'Error loading article',
      featuredImage: undefined,
      sourceMaps: {
        sanityDocumentId: 'error',
        sanityStudioUrl: ''
      }
    };
  }
  
  try {
    // Log article data for debugging
    console.log('Transforming Sanity article:', {
      id: article._id,
      title: article.title,
      slug: article.slug?.current,
      hasContent: Boolean(article.content)
    });
    
    return {
      id: article._id,
      title: article.title || 'Untitled Article',
      slug: article.slug?.current || article._id,
      category: article.category || 'General',
      date: article.date || article._createdAt,
      author: article.author || 'Unknown',
      readTime: article.readTime || '5 min read',
      content: article.content ? portableTextToHtml(article.content) : '<p>No content available</p>',
      excerpt: article.excerpt,
      featuredImage: article.mainImage ? urlFor(article.mainImage).url() : undefined,
      sourceMaps: {
        sanityDocumentId: article._id,
        sanityStudioUrl: `https://${SANITY_PROJECT_ID}.sanity.studio/desk/article;${article._id}`
      }
    };
  } catch (error) {
    console.error('Error transforming Sanity article:', error);
    return {
      id: article._id || 'error',
      title: article.title || 'Error Loading Article',
      slug: article.slug?.current || 'error',
      category: article.category || 'Error',
      date: article.date || new Date().toISOString().split('T')[0],
      author: article.author || 'System',
      readTime: article.readTime || '0 min read',
      content: '<p>There was an error processing this article</p>',
      excerpt: 'Error processing article',
      featuredImage: undefined,
      sourceMaps: {
        sanityDocumentId: article._id || 'error',
        sanityStudioUrl: ''
      }
    };
  }
};

// Get all articles from Sanity with better error handling
export const getAllSanityArticles = async (): Promise<SanityArticleData[]> => {
  try {
    console.log('Fetching all Sanity articles...');
    const query = `*[_type == "article"] | order(_createdAt desc)`;
    const articles = await sanityClient.fetch<SanityArticle[]>(query);
    
    console.log(`Found ${articles.length} Sanity articles`);
    return articles.map(transformSanityArticle);
  } catch (error) {
    console.error('Error fetching articles from Sanity:', error);
    return [{
      id: 'error',
      title: 'Error Loading Articles',
      slug: 'error',
      category: 'Error',
      date: new Date().toISOString().split('T')[0],
      author: 'System',
      readTime: '0 min read',
      content: '<p>There was an error loading articles from Sanity</p>',
      excerpt: 'Error loading articles',
      featuredImage: undefined,
      sourceMaps: {
        sanityDocumentId: 'error',
        sanityStudioUrl: ''
      }
    }];
  }
};

// Get article by slug with improved error handling
export const getSanityArticleBySlug = async (slug: string): Promise<SanityArticleData | null> => {
  try {
    console.log(`Fetching Sanity article with slug: "${slug}"`);
    
    // First, try to find by slug
    const query = `*[_type == "article" && slug.current == $slug][0]`;
    const article = await sanityClient.fetch<SanityArticle>(query, { slug });
    
    if (article) {
      console.log(`Found article by slug "${slug}"`, {
        id: article._id,
        title: article.title
      });
      return transformSanityArticle(article);
    }
    
    // If not found by slug, try by ID
    console.log(`Article not found by slug "${slug}", trying by ID...`);
    const idQuery = `*[_type == "article" && _id == $id][0]`;
    const articleById = await sanityClient.fetch<SanityArticle>(idQuery, { id: slug });
    
    if (articleById) {
      console.log(`Found article by ID "${slug}"`, {
        id: articleById._id,
        title: articleById.title
      });
      return transformSanityArticle(articleById);
    }
    
    console.log(`No article found with slug or ID "${slug}"`);
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
