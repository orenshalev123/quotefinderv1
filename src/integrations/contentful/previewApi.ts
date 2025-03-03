
/**
 * This file provides functions for enabling and disabling preview mode in a client-side application
 * Note: In a server-side framework like Next.js, this would be handled by API routes
 */

const PREVIEW_MODE_KEY = 'contentful_preview_mode';
const PREVIEW_TOKEN_KEY = 'contentful_preview_token';

/**
 * Enable preview mode and store the token
 * @param token The preview token
 */
export const enablePreviewMode = (token: string) => {
  localStorage.setItem(PREVIEW_MODE_KEY, 'true');
  localStorage.setItem(PREVIEW_TOKEN_KEY, token);
  
  // Force reload to apply preview mode
  window.location.reload();
};

/**
 * Disable preview mode and clear the token
 */
export const disablePreviewMode = () => {
  localStorage.removeItem(PREVIEW_MODE_KEY);
  localStorage.removeItem(PREVIEW_TOKEN_KEY);
  
  // Redirect to home without preview params
  window.location.href = '/';
};

/**
 * Check if preview mode is enabled
 */
export const isPreviewModeEnabled = (): boolean => {
  return localStorage.getItem(PREVIEW_MODE_KEY) === 'true';
};

/**
 * Get the preview token if available
 */
export const getPreviewToken = (): string | null => {
  return localStorage.getItem(PREVIEW_TOKEN_KEY);
};

/**
 * Validate a preview token against the expected value
 * @param token The token to validate
 * @param expectedToken The expected token value
 */
export const validatePreviewToken = (token: string, expectedToken: string): boolean => {
  return token === expectedToken;
};

/**
 * Handle preview requests with token validation
 * @param slug The content slug to preview
 * @param token The preview token
 * @param expectedToken The expected token value
 */
export const handlePreviewRequest = (slug: string, token: string, expectedToken: string) => {
  if (validatePreviewToken(token, expectedToken)) {
    enablePreviewMode(token);
    window.location.href = `/articles/${slug}?preview=true`;
    return true;
  }
  return false;
};

/**
 * Create a preview URL for sharing
 * @param slug The content slug to preview
 * @param token The preview token
 */
export const createPreviewUrl = (slug: string, token: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/api/preview?slug=${slug}&token=${token}`;
};
