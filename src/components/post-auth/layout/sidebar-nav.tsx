import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3, Calendar, ClipboardList, Home, Layers, Package,
  Truck, Users, Settings, Bell, BoxesIcon, ListChecks, Building2,
  UsersRound, FileBarChart, MessageCircle
} from 'lucide-react';
import { cn } from '../../../utils/cn';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <Home size={20} />,
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: <Calendar size={20} />,
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: <Package size={20} />,
    badge: 2,
  },
  {
    title: 'Unloading',
    href: '/unloading',
    icon: <BoxesIcon size={20} />,
  },
  {
    title: 'Store & Maintenance',
    href: '/store',
    icon: <Building2 size={20} />,
  },
  {
    title: 'Production',
    href: '/production',
    icon: <Layers size={20} />,
  },
  {
    title: 'Task Sheets',
    href: '/tasks',
    icon: <ListChecks size={20} />,
  },
  {
    title: 'Logistics',
    href: '/logistics',
    icon: <Truck size={20} />,
  },
  {
    title: 'Materials & Brokers',
    href: '/materials',
    icon: <ClipboardList size={20} />,
  },
  {
    title: 'Visitors',
    href: '/visitors',
    icon: <UsersRound size={20} />,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: <FileBarChart size={20} />,
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: <MessageCircle size={20} />,
  },
];

interface SidebarNavProps {
  collapsed?: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ collapsed = false }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 py-1">
          {!collapsed && (
            <span className="text-xs font-semibold uppercase text-gray-500">
              Main Menu
            </span>
          )}
        </div>
      </div>
      <nav className="grid gap-1 px-2">
        {mainNavItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-100',
                collapsed && 'justify-center px-2'
              )
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="flex-grow">{item.title}</span>
                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-900">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};