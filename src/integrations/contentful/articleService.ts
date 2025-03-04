
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
  
  console.log('QuoteFinder content fields:', fields);
  console.log('QuoteFinder entry sys:', entry.sys);
  
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
export const getArticleBySlug = async (slug: string, contentType: string = 'article'): Promise<ArticleData | null> => {
  try {
    const client = getClient();
    console.log(`Fetching ${contentType} with slug/ID: "${slug}"`);
    
    // For direct ID lookup (especially for quoteFinder content)
    if (contentType === 'quoteFinder' || contentType === CONTENT_TYPE_QUOTE_FINDER) {
      try {
        const entry = await client.getEntry(slug);
        console.log('Found entry by ID:', entry);
        return transformQuoteFinderContent(entry);
      } catch (error) {
        console.log('Error fetching by entry ID:', error);
        // If not found by ID, continue with the regular logic below
      }
    }
    
    // Use the correct content type constant instead of string literals
    const actualContentType = 
      contentType === 'article' ? CONTENT_TYPE_ARTICLE : 
      contentType === 'quoteFinder' ? CONTENT_TYPE_QUOTE_FINDER : 
      contentType; // In case it's already the correct constant
    
    // Try to find it as a standard article by slug
    try {
      const articleResponse = await client.getEntries({
        content_type: CONTENT_TYPE_ARTICLE,
        'fields.slug': slug,
        limit: 1,
      });

      if (articleResponse.items.length > 0) {
        console.log('Found article by slug:', articleResponse.items[0]);
        return transformArticle(articleResponse.items[0]);
      }
    } catch (error) {
      console.log('Error fetching article by slug:', error);
    }
    
    // If not found as a standard article, check if it's a QuoteFinder entry by ID
    try {
      const quoteFinderResponse = await client.getEntries({
        content_type: CONTENT_TYPE_QUOTE_FINDER,
        'sys.id': slug,
        limit: 1,
      });
      
      if (quoteFinderResponse.items.length > 0) {
        console.log('Found quoteFinder by ID:', quoteFinderResponse.items[0]);
        return transformQuoteFinderContent(quoteFinderResponse.items[0]);
      }
    } catch (error) {
      console.log('Error fetching QuoteFinder by ID:', error);
    }
    
    // Special case: Try to find the article by its exact name in URL format if all else fails
    try {
      const allArticlesResponse = await client.getEntries({
        content_type: CONTENT_TYPE_ARTICLE,
        limit: 100,
      });
      
      // Try to find an article that could match this slug through normalization
      const matchingArticle = allArticlesResponse.items.find(item => {
        const itemSlug = item.fields.slug;
        const normalizedRequestSlug = slug.toLowerCase().replace(/\s+/g, '-');
        const normalizedItemSlug = typeof itemSlug === 'string' 
          ? itemSlug.toLowerCase().replace(/\s+/g, '-') 
          : '';
        
        return normalizedItemSlug === normalizedRequestSlug ||
               normalizedItemSlug.includes(normalizedRequestSlug) ||
               normalizedRequestSlug.includes(normalizedItemSlug);
      });
      
      if (matchingArticle) {
        console.log('Found article by normalized slug:', matchingArticle);
        return transformArticle(matchingArticle);
      }
    } catch (error) {
      console.log('Error in fuzzy matching article by slug:', error);
    }

    // Check if we should try to fetch from our predefined articles
    if (slug === 'comprehensive-vs-collision') {
      console.log('This is a known static article, redirecting to static page');
      return {
        id: 'comprehensive-vs-collision',
        title: "Comprehensive vs. Collision Coverage: What\'s the Difference?",
        slug: 'comprehensive-vs-collision',
        category: 'Coverage Information',
        date: '2023-10-15',
        author: 'QuoteFinder Insurance Team',
        readTime: '5 min read',
        content: '<h2>Understanding the Difference Between Comprehensive and Collision Coverage</h2><p>When shopping for auto insurance, understanding the difference between comprehensive and collision coverage is essential to ensure you have the right protection for your vehicle.</p><p>Collision coverage helps pay to repair or replace your car if it\'s damaged in an accident with another vehicle or object, such as a fence or tree. Comprehensive coverage helps pay to replace or repair your vehicle if it\'s stolen or damaged in an incident that\'s not a collision, such as fire, vandalism or theft.</p><h3>Collision Coverage: The Details</h3><p>Collision insurance covers damage to your car when you hit another vehicle or object, regardless of who is at fault. It also covers damage from potholes or if your car rolls over.</p><h3>Comprehensive Coverage: The Details</h3><p>Comprehensive insurance covers almost everything else that could happen to your car, such as theft, fire, falling objects, explosions, earthquakes, floods, or collisions with animals.</p><p>Both coverages typically come with a deductible and they only cover damage up to the actual cash value of your car.</p>',
        excerpt: 'Learn about the key differences between comprehensive and collision coverage and which one might be right for your situation.',
        featuredImage: '/images/article-comprehensive-collision.jpg'
      };
    }

    console.log(`Content with slug/ID "${slug}" not found in Contentful`);
    return null;
  } catch (error) {
    console.error(`Error fetching content with slug/ID "${slug}" from Contentful:`, error);
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
