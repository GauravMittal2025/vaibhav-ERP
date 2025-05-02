import React from 'react';
import { Menu, Bell, Search, User as UserIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Header: React.FC = () => {
  const { toggleSidebar, currentUser } = useAppContext();

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
              <div className="flex items-center">
                {currentUser?.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon size={16} className="text-gray-500" />
                  </div>
                )}
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">{currentUser?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;