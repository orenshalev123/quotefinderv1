
import { createClient } from 'contentful';

// Environment variables (these would be set in Vercel)
const CONTENTFUL_SPACE_ID = '9ohibvmav2q6';
const CONTENTFUL_ACCESS_TOKEN = 'jQeUyyAvnIvppIc41r4dGL2hnfnUy8uIiTDjFcSKRGc';
const CONTENTFUL_PREVIEW_ACCESS_TOKEN = 'GqVPWPDsrZgZ66u5Ox1uHxJ3ZIx0PO6cAvbcvHpvAqc';

// Determine if we're in preview mode
const isPreviewMode = false; // This would be determined by your app logic

// Create a Contentful client with the appropriate token
export const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: isPreviewMode ? CONTENTFUL_PREVIEW_ACCESS_TOKEN : CONTENTFUL_ACCESS_TOKEN,
  environment: 'master',
  host: isPreviewMode ? 'preview.contentful.com' : 'cdn.contentful.com',
});

// Content type IDs (you should match these with your Contentful setup)
export const CONTENT_TYPE_ARTICLE = 'article';

// Function to create a preview client (useful when you need both clients)
export const createPreviewClient = () => {
  return createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    environment: 'master',
    host: 'preview.contentful.com',
  });
};
