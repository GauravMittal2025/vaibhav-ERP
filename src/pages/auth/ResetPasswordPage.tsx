import React from 'react';
import ResetPasswordForm from '../../components/pre-auth/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white flex flex-col justify-center items-center p-4">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;