import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import { SidebarNav } from './sidebar-nav';
import { cn } from '../../utils/cn';

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onCollapse,
}) => {
  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex-1 py-4">
          <SidebarNav collapsed={collapsed} />
        </div>
        <div className="border-t border-gray-200 p-2">
          <div className="grid gap-1">
            <button
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100',
                collapsed && 'justify-center px-2'
              )}
            >
              <Settings size={20} />
              {!collapsed && <span>Settings</span>}
            </button>
            <button
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100',
                collapsed && 'justify-center px-2'
              )}
            >
              <LogOut size={20} />
              {!collapsed && <span>Log out</span>}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};