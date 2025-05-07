import React from 'react';
import SignUpForm from '../../components/pre-auth/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white flex flex-col justify-center items-center p-4">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;