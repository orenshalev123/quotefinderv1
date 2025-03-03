
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
  const slug = searchParams.get('slug');
  const token = searchParams.get('token');
  
  // Validate required parameters
  if (!slug) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Missing Parameters</AlertTitle>
          <AlertDescription>
            The slug parameter is required to preview content.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  // Validate preview token (in a real app, you'd check this against an env variable)
  const validToken = process.env.CONTENTFUL_PREVIEW_TOKEN || 'PREVIEW_TOKEN';
  if (token !== validToken) {
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
  return <Navigate to={`/articles/${slug}?preview=true`} replace />;
};

export default PreviewPage;
