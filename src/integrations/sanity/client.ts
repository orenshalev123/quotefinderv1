
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// These would typically come from environment variables
export const SANITY_PROJECT_ID = 'your-project-id'; // Replace with your actual project ID
export const SANITY_DATASET = 'production';
export const SANITY_API_VERSION = '2023-08-01';
export const SANITY_TOKEN = ''; // Add your token for authenticated requests if needed

// Function to check if preview mode is active (similar to Contentful)
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
  apiVersion: SANITY_API_VERSION, // Use the latest API version
  useCdn: !isSanityPreviewMode(), // Use CDN for production, not for preview
  token: isSanityPreviewMode() ? SANITY_TOKEN : undefined, // Only use token for preview
});

// Set up image URL builder
export const imageBuilder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => imageBuilder.image(source);

// Get client based on preview mode (useful when you need both clients)
export const getSanityClient = () => {
  return sanityClient;
};
