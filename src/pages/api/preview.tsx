
import React from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { 
  Alert, 
  AlertTitle, 
  AlertDescription 
} from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';

const PreviewPage = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug') || searchParams.get('entry_id');
  const token = searchParams.get('token');
  const contentType = searchParams.get('content_type') || 'article';
  
  // Add detailed console logs to help debug preview issues
  console.log('Preview page parameters:', {
    slug,
    token,
    contentType,
    allParams: Object.fromEntries([...searchParams.entries()])
  });
  
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
        <div className="mt-4 bg-gray-50 p-4 rounded border">
          <h3 className="text-sm font-medium mb-2">Debug Information</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(Object.fromEntries([...searchParams.entries()]), null, 2)}
          </pre>
        </div>
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
        <div className="mt-4 bg-gray-50 p-4 rounded border">
          <h3 className="text-sm font-medium mb-2">Debug Information</h3>
          <pre className="text-xs overflow-auto">
            Token: {token || 'Not provided'}
          </pre>
        </div>
      </div>
    );
  }
  
  console.log(`Redirecting to: /articles/${slug}?preview=true&content_type=${contentType}`);
  
  // Redirect to the article with preview flag
  return <Navigate to={`/articles/${slug}?preview=true&content_type=${contentType}`} replace />;
};

export default PreviewPage;
