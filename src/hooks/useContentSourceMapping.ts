
import { useEffect } from 'react';
import { generateVercelOGTags } from '@/integrations/contentful/vercelSourceMaps';

/**
 * Hook to add Vercel content source mapping for visual editing
 * @param contentId The Contentful entry ID to link to
 */
export const useContentSourceMapping = (contentId: string) => {
  useEffect(() => {
    const tags = generateVercelOGTags(contentId);
    
    // Remove any existing Vercel tags
    document.querySelectorAll('meta[name^="vercel-"]').forEach(tag => tag.remove());
    
    // Add source map metadata tags
    const head = document.querySelector('head');
    if (head) {
      Object.entries(tags).forEach(([name, content]) => {
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        head.appendChild(meta);
      });
    }
    
    return () => {
      // Clean up tags when component unmounts
      document.querySelectorAll('meta[name^="vercel-"]').forEach(tag => tag.remove());
    };
  }, [contentId]);
};

export default useContentSourceMapping;
