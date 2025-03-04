
import { storyblokClient, createPreviewClient, isPreviewMode } from './client';
import { render } from 'storyblok-rich-text-react-renderer';
import { renderToString } from 'react-dom/server';
import { StoryblokArticle, ArticleData } from './types';

// Get client based on preview mode
const getClient = () => {
  return isPreviewMode() ? createPreviewClient() : storyblokClient;
};

// Transform Storyblok article to our app's format
export const transformStoryblokArticle = (story: StoryblokArticle): ArticleData => {
  // Render rich text content to HTML
  const richTextContent = story.content.content;
  const renderedContent = richTextContent ? renderToString(render(richTextContent)) : '';
  
  return {
    id: story.uuid,
    title: story.content.title || story.name || 'Untitled Article',
    slug: story.slug || `article-${story.id}`,
    category: story.content.category || 'General',
    date: story.content.date || story.published_at?.split('T')[0] || new Date().toISOString().split('T')[0],
    author: story.content.author || 'QuoteFinder',
    readTime: story.content.readTime || '5 min read',
    content: renderedContent,
    excerpt: story.content.excerpt,
    featuredImage: story.content.featured_image?.filename
  };
};

// Add source mapping for Storyblok visual editing
export const addStoryblokSourceMapping = (article: ArticleData): ArticleData => {
  return {
    ...article,
    sourceMaps: {
      storyblokEditorUrl: `https://app.storyblok.com/v2/stories/${article.id}`,
      storyblokContentId: article.id
    }
  };
};

// Get all articles from Storyblok
export const getAllStoryblokArticles = async (): Promise<ArticleData[]> => {
  try {
    const client = getClient();
    console.log('Fetching all Storyblok articles');
    
    const response = await client.getStories({
      starts_with: 'articles/',
      version: isPreviewMode() ? 'draft' : 'published'
    });
    
    console.log(`Found ${response.data.stories.length} Storyblok articles`);
    
    const articles = response.data.stories.map((story: StoryblokArticle) => {
      const articleData = transformStoryblokArticle(story);
      return addStoryblokSourceMapping(articleData);
    });
    
    return articles;
  } catch (error) {
    console.error('Error fetching articles from Storyblok:', error);
    return [];
  }
};

// Get article by slug
export const getStoryblokArticleBySlug = async (slug: string): Promise<ArticleData | null> => {
  try {
    const client = getClient();
    console.log(`Fetching Storyblok article with slug: "${slug}"`);
    
    // Force draft version in preview mode
    const version = isPreviewMode() ? 'draft' : 'published';
    
    const response = await client.getStory(`articles/${slug}`, {
      version: version
    });
    
    if (!response || !response.data || !response.data.story) {
      console.log(`Storyblok article with slug "${slug}" not found`);
      return null;
    }
    
    console.log('Found Storyblok article:', response.data.story);
    
    const article = transformStoryblokArticle(response.data.story as StoryblokArticle);
    return addStoryblokSourceMapping(article);
  } catch (error) {
    console.error(`Error fetching Storyblok article with slug "${slug}":`, error);
    return null;
  }
};
