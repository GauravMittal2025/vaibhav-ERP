import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Check } from 'lucide-react';

const Profile: React.FC = () => {
  const { auth } = useAuth();
  const { user } = auth;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an API to update the user profile
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 800);
  };

  // Role badge color
  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and preferences.
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:shrink-0 bg-gray-50 p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={user.avatar || 'https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&w=150'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className={`mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${getRoleBadgeColor()}`}>
                <Shield className="h-4 w-4 mr-1" />
                {user.role}
              </span>
            </div>
          </div>
          
          <div className="p-6 flex-1">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
              <p className="text-sm text-gray-500">Update your account details here.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      disabled={!isEditing}
                      className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      disabled={!isEditing}
                      className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      disabled
                      className="bg-gray-50 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                      value={user.role}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Your role can only be changed by an administrator.</p>
                </div>
                
                <div>
                  <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                    Member Since
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="createdAt"
                      id="createdAt"
                      disabled
                      className="bg-gray-50 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;