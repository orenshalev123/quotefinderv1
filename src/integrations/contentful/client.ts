
import { createClient } from 'contentful';

// Create a Contentful client
export const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

// Content type IDs (you should match these with your Contentful setup)
export const CONTENT_TYPE_ARTICLE = 'article';
