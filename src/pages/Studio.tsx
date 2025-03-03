
import React, { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the StudioPage to reduce initial bundle size
const StudioPage = lazy(() => import('../studio/StudioPage'));

const Studio = () => {
  return (
    <Suspense fallback={
      <div className="p-10">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-screen w-full" />
      </div>
    }>
      <StudioPage />
    </Suspense>
  );
};

export default Studio;
