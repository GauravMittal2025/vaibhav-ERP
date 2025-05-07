import React from 'react';
import ForgotPasswordForm from '../../components/pre-auth/ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white flex flex-col justify-center items-center p-4">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;