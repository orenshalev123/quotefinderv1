
import { createClient } from 'contentful';

// Create a Contentful client
export const contentfulClient = createClient({
  space: '9ohibvmav2q6',
  accessToken: 'jQeUyyAvnIvppIc41r4dGL2hnfnUy8uIiTDjFcSKRGc',
  environment: 'master',
});

// Content type IDs (you should match these with your Contentful setup)
export const CONTENT_TYPE_ARTICLE = 'article';
