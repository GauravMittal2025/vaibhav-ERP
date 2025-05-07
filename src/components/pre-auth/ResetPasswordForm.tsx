import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ResetPasswordCredentials } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import Button from '../post-auth/ui/Button';
import FormInput from '../post-auth/ui/FormInput';
import { ShieldCheck } from 'lucide-react';

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword } = useAuth();
  
  const [credentials, setCredentials] = useState<ResetPasswordCredentials>({
    password: '',
    confirmPassword: '',
    token: token || ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [token]);
  
  const validateForm = (): boolean => {
    if (!credentials.password) {
      setError('Password is required');
      return false;
    } else if (credentials.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    
    if (!credentials.confirmPassword) {
      setError('Please confirm your password');
      return false;
    } else if (credentials.confirmPassword !== credentials.password) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (error) setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await resetPassword(credentials);
      setSuccess(true);
      // Redirect to signin after 3 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!token) {
    return (
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <ShieldCheck className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
          Invalid Reset Link
        </h2>
        
        <p className="text-center text-gray-600 mb-6">
          The password reset link is invalid or has expired.
        </p>
        
        <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Request a new link
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <div className="bg-indigo-100 p-3 rounded-full">
          <ShieldCheck className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
        Reset your password
      </h2>
      
      <p className="text-center text-gray-600 mb-6">
        Please enter a new password for your account.
      </p>
      
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="password"
            name="password"
            type="password"
            label="New password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm new password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
          />
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Reset password
          </Button>
        </form>
      ) : (
        <div className="rounded-md bg-green-50 p-4 mt-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Success!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Your password has been reset successfully. You'll be redirected to the sign in page in a few seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;