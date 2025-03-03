
import { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { handlePreviewRequest } from '@/integrations/contentful/previewApi';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Alert as AlertIcon } from 'lucide-react';

const PreviewPage = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const token = searchParams.get('token');
  const [error, setError] = useState<string | null>(null);
  const [activating, setActivating] = useState(false);
  
  // The secret token that should be used for previews
  // In a real app, this would come from an environment variable
  const EXPECTED_TOKEN = 'GqVPWPDsrZgZ66u5Ox1uHxJ3ZIx0PO6cAvbcvHpvAqc';
  
  useEffect(() => {
    if (slug && token) {
      setActivating(true);
      // Auto-activate preview mode if parameters are present
      const success = handlePreviewRequest(slug, token, EXPECTED_TOKEN);
      if (!success) {
        setError('Invalid preview token. Please check the URL and try again.');
        setActivating(false);
      }
    }
  }, [slug, token]);
  
  // If we're missing required parameters
  if (!slug || !token) {
    return (
      <div className="container max-w-md mx-auto my-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Preview Error</CardTitle>
            <CardDescription>Missing required parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertIcon className="h-4 w-4" />
              <AlertTitle>Invalid Preview URL</AlertTitle>
              <AlertDescription>
                The preview URL is missing required parameters. Please make sure you have both a slug and token.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Return to Homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // If we have an error activating preview
  if (error) {
    return (
      <div className="container max-w-md mx-auto my-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Preview Error</CardTitle>
            <CardDescription>Could not activate preview mode</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Return to Homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // If we're activating preview mode, show a loading state
  if (activating) {
    return (
      <div className="container max-w-md mx-auto my-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Activating Preview Mode</CardTitle>
            <CardDescription>Please wait...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-insurance-blue"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // This should generally not be reached, but as a fallback
  return <Navigate to={`/articles/${slug}?preview=true`} replace />;
};

export default PreviewPage;
