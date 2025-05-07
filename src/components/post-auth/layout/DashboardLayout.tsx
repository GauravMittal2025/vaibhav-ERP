import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, Users, Settings, Layers, User, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { auth, logout } = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items based on role
  const getNavItems = () => {
    const items = [
      { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    ];

    // Add role-specific items
    if (user?.role === 'admin') {
      items.push(
        { name: 'Users', icon: <Users size={20} />, path: '/users' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' }
      );
    }

    if (user?.role === 'admin' || user?.role === 'manager') {
      items.push(
        { name: 'Projects', icon: <Layers size={20} />, path: '/projects' }
      );
    }

    // Common item for all roles
    items.push({ name: 'Profile', icon: <User size={20} />, path: '/profile' });

    return items;
  };

  const navItems = getNavItems();

  // Role badge color
  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      // case 'user':
      //   return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navbar */}
      <div className="bg-white shadow-sm z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and mobile menu button */}
            <div className="flex">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-400 lg:hidden"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">SecureAuth</h1>
              </div>
            </div>

            {/* Profile dropdown */}
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <Bell size={24} />
              </button>

              <div className="ml-4 relative flex-shrink-0">
                <div>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                      <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                      <span className={`text-xs font-medium ${getRoleBadgeColor()} px-2 py-0.5 rounded-full`}>
                        {user?.role}
                      </span>
                    </div>
                    <img
                      className="h-10 w-10 rounded-full border-2 border-gray-200"
                      src={user?.avatar || 'https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&w=150'}
                      alt="User avatar"
                    />
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                </div>

                {/* Profile dropdown panel */}
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
                        onClick={handleLogout}
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

      <div className="flex">
        {/* Sidebar for desktop */}
        <div
          className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } fixed inset-0 z-40 lg:inset-auto lg:static lg:block lg:z-auto transition-all duration-300 ease-in-out`}
        >
          <div className="h-full bg-white w-64 shadow-lg lg:h-screen border-r">
            <div className="py-4 pl-6 pr-3 lg:py-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                {user?.role.toUpperCase()} PORTAL
              </h2>
              <nav className="mt-5 space-y-1">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className="group flex items-center px-3 py-2.5 text-base font-medium text-gray-600 rounded-md hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition duration-150 ease-in-out"
                  >
                    <span className="mr-3 text-gray-500 group-hover:text-blue-500">
                      {item.icon}
                    </span>
                    {item.name}
                  </a>
                ))}
                <a
                  onClick={handleLogout}
                  className="group flex items-center px-3 py-2.5 text-base font-medium text-red-600 rounded-md hover:bg-red-50 cursor-pointer transition duration-150 ease-in-out"
                >
                  <span className="mr-3 text-red-500">
                    <LogOut size={20} />
                  </span>
                  Logout
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;