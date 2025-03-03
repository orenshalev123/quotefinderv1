
import { contentfulClient } from './client';

/**
 * Get content source map URL for a Contentful entry
 * This allows editors to edit content directly from the live site using Vercel's Visual Editing feature
 * @param entryId The Contentful entry ID
 * @returns The source map URL for the entry
 */
export const getContentSourceMapUrl = (entryId: string): string => {
  const baseUrl = 'https://app.contentful.com';
  const spaceId = '9ohibvmav2q6';
  const environmentId = 'master';
  
  return `${baseUrl}/spaces/${spaceId}/environments/${environmentId}/entries/${entryId}`;
};

/**
 * Generate Vercel Open Graph meta tags with content source maps
 * @param entryId The Contentful entry ID
 * @returns Meta tags object for Vercel Open Graph with content source maps
 */
export const generateVercelOGTags = (entryId: string) => {
  const sourceUrl = getContentSourceMapUrl(entryId);
  
  return {
    'vercel-content-id': entryId,
    'vercel-content-source': sourceUrl
  };
};

/**
 * Add source mapping to an article for Vercel's Visual Editing
 * @param article The transformed article data
 * @returns The article with source mapping metadata
 */
export const addSourceMapping = (article: any) => {
  return {
    ...article,
    sourceMaps: {
      vercelContentId: article.id,
      vercelContentSource: getContentSourceMapUrl(article.id)
    }
  };
};
