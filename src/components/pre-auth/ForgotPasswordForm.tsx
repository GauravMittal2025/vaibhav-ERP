import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../post-auth/ui/Button';
import FormInput from '../post-auth/ui/FormInput';
import { KeyRound } from 'lucide-react';

const ForgotPasswordForm: React.FC = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const validateEmail = (): boolean => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateEmail()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <div className="bg-indigo-100 p-3 rounded-full">
          <KeyRound className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
        Forgot your password?
      </h2>
      
      <p className="text-center text-gray-600 mb-6">
        No worries, we'll send you reset instructions.
      </p>
      
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            error={error || undefined}
            required
          />
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Send reset link
          </Button>
          
          <div className="text-center mt-4">
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Back to sign in
            </Link>
          </div>
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
              <h3 className="text-sm font-medium text-green-800">Email sent</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  We've sent a password reset link to {email}. Please check your email.
                </p>
              </div>
              <div className="mt-4">
                <Link
                  to="/signin"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;