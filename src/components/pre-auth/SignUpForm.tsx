import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SignUpCredentials } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import Button from '../post-auth/ui/Button';
import FormInput from '../post-auth/ui/FormInput';
import { UserPlus } from 'lucide-react';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, isLoading, error, clearError } = useAuth();
  
  const [credentials, setCredentials] = useState<SignUpCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!credentials.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!credentials.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!credentials.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (credentials.confirmPassword !== credentials.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear global error
    if (error) {
      clearError();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await signUp(credentials);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the auth context
    }
  };
  
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <div className="bg-indigo-100 p-3 rounded-full">
          <UserPlus className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
        Create your account
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Full name"
          placeholder="John Doe"
          autoComplete="name"
          value={credentials.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          autoComplete="email"
          value={credentials.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={credentials.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={credentials.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
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
          Create account
        </Button>
        
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;