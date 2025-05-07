import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  id,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            transition-all duration-200
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;