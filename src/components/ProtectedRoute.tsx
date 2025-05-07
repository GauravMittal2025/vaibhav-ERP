import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types/auth';
import DashboardLayout from './post-auth/layout/DashboardLayout';
import Layout from './post-auth/layout/Layout';
import { AppProvider } from '../context/AppContext';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const { isAuthenticated, user, isLoading } = auth;
console.log('is auth----', isAuthenticated)
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  // Check if user has required role if roles are specified
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the protected content with the dashboard layout
  return (
    <AppProvider>
    <Layout>
      <Outlet />
    </Layout>
    </AppProvider>
  );
};

export default ProtectedRoute;