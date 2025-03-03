
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { defineConfig, Studio } from 'sanity';
import sanityConfig from './sanity.config';

const StudioPage = () => {
  const [studioReady, setStudioReady] = useState(false);

  useEffect(() => {
    // Mount Sanity Studio
    const studioContainer = document.getElementById('sanity-studio');
    if (studioContainer) {
      createRoot(studioContainer).render(
        <Studio config={sanityConfig} />
      );
      setStudioReady(true);
    }
  }, []);

  return (
    <div className="sanity-studio-container">
      {!studioReady && (
        <div className="p-10 text-center">
          <div className="animate-pulse flex justify-center items-center">
            <div className="text-xl font-medium">Loading Sanity Studio...</div>
          </div>
        </div>
      )}
      <div id="sanity-studio" className="w-full h-screen" />
    </div>
  );
};

export default StudioPage;
