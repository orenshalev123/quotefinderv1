
import StoryblokClient from 'storyblok-js-client';

// Storyblok API key
const STORYBLOK_API_KEY = '8QtGiHRbOefdVrGEL4V0YAtt';

// Create Storyblok client
export const storyblokClient = new StoryblokClient({
  accessToken: STORYBLOK_API_KEY,
  cache: {
    clear: 'auto',
    type: 'memory'
  }
});

// Check if in preview mode
export const isPreviewMode = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  return params.get('storyblok-preview') === 'true';
};

// Create preview client for draft content
export const createPreviewClient = () => {
  return new StoryblokClient({
    accessToken: STORYBLOK_API_KEY,
    cache: {
      clear: 'auto',
      type: 'memory'
    },
    // Enable draft mode when in preview
    region: 'us',
    version: 'draft'
  });
};
