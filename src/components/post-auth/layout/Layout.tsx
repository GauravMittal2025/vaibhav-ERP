import React, { ReactNode } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { useAppContext } from '../../../context/AppContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen } = useAppContext();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : ''
        }`}
      >
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;