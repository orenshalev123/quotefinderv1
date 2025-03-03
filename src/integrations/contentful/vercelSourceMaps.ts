
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
  if (!article || !article.id) return article;
  
  return {
    ...article,
    sourceMaps: {
      vercelContentId: article.id,
      vercelContentSource: getContentSourceMapUrl(article.id)
    }
  };
};

/**
 * Apply source mapping tag attributes to a DOM element (for use with React refs)
 * @param element The DOM element to add attributes to
 * @param entryId The Contentful entry ID
 */
export const applySourceMappingAttributes = (element: HTMLElement | null, entryId: string) => {
  if (!element) return;
  
  element.setAttribute('data-vercel-content-id', entryId);
  element.setAttribute('data-vercel-content-source', getContentSourceMapUrl(entryId));
};

/**
 * Determine if the current request is in preview mode
 * This would check for the preview token in the URL or cookies
 * @returns boolean indicating if in preview mode
 */
export const isPreviewMode = (): boolean => {
  // Use the common isPreviewMode function from client.ts
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    return url.searchParams.get('preview') === 'true';
  }
  return false;
};

/**
 * Get the preview secret from the URL if present
 * @returns the preview secret or null
 */
export const getPreviewSecret = (): string | null => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    return url.searchParams.get('secret');
  }
  return null;
};
