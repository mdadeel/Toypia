import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | ToyTopia';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-gray-900">404</CardTitle>
          <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="flex flex-col gap-4">
            <Link to="/">
              <Button className="w-full gap-2">
                <Search className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;