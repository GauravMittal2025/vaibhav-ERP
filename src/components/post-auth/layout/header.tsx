import React, { useState } from 'react';
import {ChevronDown, Menu, Bell, Search, User as UserIcon } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Header: React.FC = () => {
  
  const navigate = useNavigate();
  const {auth, logout} = useAuth();
  const {user} = auth;

  const { toggleSidebar, currentUser } = useAppContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };


  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:block ml-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-96 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search for anything..."
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1.5 text-gray-500 rounded-full hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Bell size={20} />
            </button>
            <div className="relative inline-block border-l border-gray-200 pl-4">
              <div>

              {/* <div>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                </div> */}

                <div className="flex items-center">
                <div className="ml-2 mr-3">
                    <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                  {user?.avatar ? (
                    <div>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserIcon size={16} className="text-gray-500" />
                    </div>
                  )}

                  <button
                      onClick={toggleProfile}
                      className="flex items-center space-x-3 ml-2 focus:outline-none"
                    >
                      <ChevronDown size={16} className="text-gray-400" />
                  </button>
                </div>
                {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/dashboard');
                        }}
                      >
                        Dashboard
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/profile');
                        }}
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/settings');
                        }}
                      >
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => logout()}
                      >
                        Sign out
                      </a>
                    </div>
                </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;