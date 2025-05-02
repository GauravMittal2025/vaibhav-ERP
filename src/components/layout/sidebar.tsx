import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  Wrench, 
  ClipboardList, 
  FileText, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  text, 
  isActive = false,
  hasSubmenu = false,
  onClick 
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full py-2.5 px-4 transition-colors rounded-md ${
          isActive 
            ? 'bg-blue-50 text-blue-700' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="text-lg">{icon}</span>
        <span className="ml-3 text-sm font-medium">{text}</span>
        {hasSubmenu && (
          <ChevronRight 
            size={16} 
            className={`ml-auto transition-transform ${isActive ? 'rotate-90' : ''}`} 
          />
        )}
      </button>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const { sidebarOpen, currentPage, setCurrentPage } = useAppContext();
  
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">ERP System</h1>
      </div>
      
      <nav className="mt-4 px-2 flex-1">
        <ul className="space-y-1">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Dashboard" 
            isActive={currentPage === 'dashboard'}
            onClick={() => setCurrentPage('dashboard')}
          />
                    <SidebarItem 
            icon={<Users size={20} />} 
            text="Users" 
            isActive={currentPage === 'users'}
            onClick={() => setCurrentPage('users')}
          />

          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Attendance" 
            isActive={currentPage === 'attendance'}
            onClick={() => setCurrentPage('attendance')}
          />

          <div className="pt-4 pb-2">
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Store Management
            </div>
          </div>
          
          <SidebarItem 
            icon={<Package size={20} />} 
            text="Inventory" 
            isActive={currentPage === 'inventory'}
            onClick={() => setCurrentPage('inventory')}
          />
          <SidebarItem 
            icon={<ShoppingCart size={20} />} 
            text="Orders" 
            isActive={currentPage === 'orders'}
            onClick={() => setCurrentPage('orders')}
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            text="Customers" 
            isActive={currentPage === 'customers'}
            onClick={() => setCurrentPage('customers')}
          />
          <SidebarItem 
            icon={<Truck size={20} />} 
            text="Suppliers" 
            isActive={currentPage === 'suppliers'}
            onClick={() => setCurrentPage('suppliers')}
          />
          
          <div className="pt-4 pb-2">
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Maintenance
            </div>
          </div>
          
          <SidebarItem 
            icon={<Wrench size={20} />} 
            text="Equipment" 
            isActive={currentPage === 'equipment'}
            onClick={() => setCurrentPage('equipment')}
          />
          <SidebarItem 
            icon={<ClipboardList size={20} />} 
            text="Maintenance Tasks" 
            isActive={currentPage === 'maintenance'}
            onClick={() => setCurrentPage('maintenance')}
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            text="Work Orders" 
            isActive={currentPage === 'workorders'}
            onClick={() => setCurrentPage('workorders')}
          />

          <div className="pt-4 pb-2">
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Reports
            </div>
          </div>
          <SidebarItem 
            icon={<FileText size={20} />} 
            text="Reports & Analytics" 
            isActive={currentPage === 'reports'}
            onClick={() => setCurrentPage('reports')}
          />
          
          <div className="pt-4 pb-2">
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              System
            </div>
          </div>
          
          <SidebarItem 
            icon={<Settings size={20} />}
            text="Settings" 
            isActive={currentPage === 'settings'}
            onClick={() => setCurrentPage('settings')}
          />
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img 
              className="w-8 h-8 rounded-full" 
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32" 
              alt="User"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">administrator@example.com</p>
          </div>
        </div>
      </div>
      
      {/* <div className="px-2 mt-auto mb-4 absolute bottom-0 w-full">
        <button className="flex items-center w-full py-2.5 px-4 rounded-md text-gray-700 hover:bg-gray-100">
          <span className="text-lg"><LogOut size={20} /></span>
          <span className="ml-3 text-sm font-medium">Log out</span>
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;