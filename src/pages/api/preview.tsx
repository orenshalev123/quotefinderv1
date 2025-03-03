
import React from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { 
  Alert, 
  AlertTitle, 
  AlertDescription 
} from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const PreviewPage = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug') || searchParams.get('entry_id');
  const token = searchParams.get('token');
  const contentType = searchParams.get('content_type') || 'article';
  
  // We will check against both the dedicated preview token and the Contentful preview token
  // In production, you would use an environment variable for this instead of hardcoding
  const validTokens = [
    'PREVIEW_TOKEN', // Your dedicated preview token
    'GqVPWPDsrZgZ66u5Ox1uHxJ3ZIx0PO6cAvbcvHpvAqc' // Your Contentful preview token
  ];
  
  // Validate required parameters
  if (!slug) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Missing Parameters</AlertTitle>
          <AlertDescription>
            The slug or entry_id parameter is required to preview content.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  // Validate preview token
  if (!validTokens.includes(token || '')) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Invalid Token</AlertTitle>
          <AlertDescription>
            The preview token is invalid or missing.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  // Redirect to the article with preview flag
  return <Navigate to={`/articles/${slug}?preview=true&content_type=${contentType}`} replace />;
};

export default PreviewPage;
