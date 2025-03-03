
import React from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { 
  Alert, 
  AlertTitle, 
  AlertDescription 
} from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';

const SanityPreviewPage = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug') || searchParams.get('document_id');
  const token = searchParams.get('token');
  
  // Add detailed console logs to help debug preview issues
  console.log('Sanity preview page parameters:', {
    slug,
    token,
    allParams: Object.fromEntries([...searchParams.entries()])
  });
  
  // In a real app, you would validate this token against your Sanity project settings
  const validToken = 'SANITY_PREVIEW_TOKEN'; // Replace with your real token
  
  // Validate required parameters
  if (!slug) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Missing Parameters</AlertTitle>
          <AlertDescription>
            The slug or document_id parameter is required to preview Sanity content.
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
  if (token !== validToken) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Invalid Token</AlertTitle>
          <AlertDescription>
            The Sanity preview token is invalid or missing.
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
  
  console.log(`Redirecting to: /sanity-articles/${slug}?sanity-preview=true`);
  
  // Redirect to the Sanity article with preview flag
  return <Navigate to={`/sanity-articles/${slug}?sanity-preview=true`} replace />;
};

export default SanityPreviewPage;
