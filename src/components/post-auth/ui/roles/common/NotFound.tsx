import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-lg text-gray-600">Page not found</p>
      <p className="mt-1 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
      
      <Button 
        className="mt-6"
        leftIcon={<Home size={16} />}
        onClick={() => navigate('/')}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};