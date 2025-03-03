
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// These should be set in environment variables
// For local development, you can add a .env file with these values
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'ftchwehh';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2023-03-01';
export const SANITY_TOKEN = import.meta.env.VITE_SANITY_TOKEN || '';

// Function to check if preview mode is active
export const isSanityPreviewMode = (): boolean => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    return url.searchParams.get('sanity-preview') === 'true';
  }
  return false;
};

// Create the Sanity client
export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: !isSanityPreviewMode(),
  token: isSanityPreviewMode() ? SANITY_TOKEN : undefined,
});

// Set up image URL builder
export const imageBuilder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => imageBuilder.image(source);

// Get client based on preview mode
export const getSanityClient = () => {
  return sanityClient;
};
