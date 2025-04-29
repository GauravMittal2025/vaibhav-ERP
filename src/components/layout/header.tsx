import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, Search, X } from 'lucide-react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white px-4 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        >
          <span className="sr-only">Toggle sidebar</span>
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-600">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M5 8h14M5 12h14M5 16h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">EnterpriseERP</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {showSearch ? (
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="input pr-8"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="absolute right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <Search size={20} />
          </button>
        )}

        <div className="relative">
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <Bell size={20} />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>
        </div>

        <div className="relative ml-2">
          <button className="flex items-center gap-2 rounded-full">
            <Avatar
              size="sm"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="John Doe"
            />
            <div className="hidden text-left md:block">
              <div className="text-sm font-medium text-gray-700">John Doe</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};