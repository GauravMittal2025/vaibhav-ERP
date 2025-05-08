import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
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
  ChevronRight,
  User,
  ChevronDown,
  ShieldCheck,
  Key
} from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CustomersArr, EmpAllowedArr, InventoryArr, MaintenanceAllowedArr, OrdersArr, ReportsAllowedArr, StoreManagementAllowedArr, SuppliersArr, userRoles, UsersAllowedArr } from '../../../types/auth';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  visitedPage: string;
  isActive?: boolean;
  isVisible:string;
  hasSubmenu?: boolean;
  onClick?: () => void;
}

interface NavGroupProps {
  label: string;
  isVisible:string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
  isVisible:string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  text, 
  visitedPage = '',
  isActive = false,
  hasSubmenu = false,
  isVisible = 'block',
  onClick 
}) => {
  return (
    <Link to={`/${visitedPage}`}>
      <li style={{display:isVisible}}>
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
    </Link>
  );
};

const NavGroup: React.FC<NavGroupProps> = ({ label, icon, isVisible, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="mb-1" style={{display:isVisible}}>
      <button
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="mr-3">{icon}</span>
          {label}
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {isOpen && (
        <div className="mt-1 ml-4 pl-4 border-l border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => cn(
      'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
      isActive 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
    )}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </NavLink>
);

const Sidebar: React.FC = () => {
  const { sidebarOpen, currentPage, setCurrentPage } = useAppContext();
  const {auth, logout} = useAuth();
  const {user} = auth;

  // console.log('userorle-------', InventoryArr.some(role => console.log(user?.role.includes(role))) ? 'block' : 'none')
  // console.log('userorle-------', user?.role)

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
            visitedPage=''
            isVisible = {userRoles.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('dashboard')}
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            text="Users" 
            isActive={currentPage === 'users'}
            visitedPage='users'
            isVisible = {UsersAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('users')}
          />

          <SidebarItem 
            icon={<User size={20} />} 
            text="Profile" 
            isActive={currentPage === 'profile'}
            visitedPage='profile'
            isVisible = {(user?.role === 'admin' || 'manager' || 'supervisor' || 'guard' || 'driver' || 'sr-supervisor') ? 'block' : 'none'}
            onClick={() => setCurrentPage('profile')}
          />

          {/* role management */}

          <div className="pt-4 pb-2" style={{display: (UsersAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none' )}}>
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Role Management
            </div>
          </div>

          <NavGroup 
            label="User Management" 
            isVisible={UsersAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            icon={<Users size={18} />}
          >
            <NavItem
              to="/users-management"
              icon={<Users size={16} />}
              label="Users"
            />
          </NavGroup>
          
          <NavGroup 
            isVisible={UsersAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            label="Access Control" 
            icon={<ShieldCheck size={18} />}
          >
            <NavItem
              to="/roles"
              icon={<ShieldCheck size={16} />}
              label="Roles"
            />
            <NavItem
              to="/permissions"
              icon={<Key size={16} />}
              label="Permissions"
            />
          </NavGroup>

          {/* employee management */}
          <div className="pt-4 pb-2" style={{display: (EmpAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none' )}}>
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Employee Management
            </div>
          </div>

          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Overview" 
            isActive={currentPage === 'emp_overview'}
            visitedPage='emp_overview'
            isVisible = {EmpAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('emp_overview')}
          />

          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Employees" 
            isActive={currentPage === 'employees'}
            visitedPage='employees'
            isVisible = {EmpAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('employees')}
          />

          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Departments" 
            isActive={currentPage === 'departments'}
            visitedPage='departments'
            isVisible = {EmpAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('departments')}
          />

          <div className="pt-4 pb-2" style={{display: (user?.role === 'admin' || 'manager' || 'supervisor' || 'guard' || 'driver' || 'sr-supervisor') ? 'block' : 'none'}}>
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Attendance Management
            </div>
          </div>

          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Overview"
            visitedPage='overview'
            isActive={currentPage === 'overview'}
            isVisible = {['admin', 'supervisor', 'manager', 'guard', 'driver', 'sr-supervisor'].some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('overview')}
          />

          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Attendance"
            visitedPage='attendance'
            isActive={currentPage === 'attendance'}
            isVisible = {['admin', 'supervisor', 'manager', 'guard', 'driver', 'sr-supervisor'].some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('attendance')}
          />

          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Request" 
            isActive={currentPage === 'request_management'}
            visitedPage='request_management'
            isVisible = {['admin', 'supervisor', 'manager', 'guard', 'driver', 'sr-supervisor'].some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('request_management')}
          />

          <div className="pt-4 pb-2" style={{display: (StoreManagementAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none')}}>
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Store Management
            </div>
          </div>
          
          <SidebarItem 
            icon={<Package size={20} />} 
            text="Inventory" 
            isActive={currentPage === 'inventory'}
            visitedPage='inventory'
            isVisible = {InventoryArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('inventory')}
          />
          <SidebarItem 
            icon={<ShoppingCart size={20} />} 
            text="Orders" 
            isActive={currentPage === 'orders'}
            visitedPage='orders'
            isVisible = {OrdersArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('orders')}
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            text="Customers" 
            isActive={currentPage === 'customers'}
            visitedPage='customers'
            isVisible = {CustomersArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('customers')}
          />
          <SidebarItem 
            icon={<Truck size={20} />} 
            text="Suppliers" 
            isActive={currentPage === 'suppliers'}
            visitedPage='suppliers'
            isVisible = {SuppliersArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('suppliers')}
          />
          
          <div className="pt-4 pb-2" style={{display: (MaintenanceAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none')}}>
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Maintenance
            </div>
          </div>
          
          <SidebarItem 
            icon={<Wrench size={20} />} 
            text="Equipment" 
            isActive={currentPage === 'equipment'}
            visitedPage='equipment'
            isVisible = {MaintenanceAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('equipment')}
          />
          <SidebarItem 
            icon={<ClipboardList size={20} />} 
            text="Maintenance Tasks" 
            isActive={currentPage === 'maintenance'}
            visitedPage='maintenance'
            isVisible = {MaintenanceAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('maintenance')}
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            text="Work Orders" 
            isActive={currentPage === 'workorders'}
            visitedPage='workorders'
            isVisible = {MaintenanceAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('workorders')}
          />

          <div className="pt-4 pb-2" style={{display: (ReportsAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none' )}}>
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Reports
            </div>
          </div>
          <SidebarItem 
            icon={<FileText size={20} />} 
            text="Reports & Analytics" 
            isActive={currentPage === 'reports'}
            visitedPage='reports'
            isVisible = {ReportsAllowedArr.some(role => user?.role.includes(role)) ? 'block' : 'none'}
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
            visitedPage='settings'
            isVisible = {userRoles.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => setCurrentPage('settings')}
          />
          <SidebarItem 
            icon={<LogOut size={20} />}
            text="Log Out" 
            isActive={currentPage === 'logout'}
            visitedPage='logout'
            isVisible = {userRoles.some(role => user?.role.includes(role)) ? 'block' : 'none'}
            onClick={() => logout()}
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