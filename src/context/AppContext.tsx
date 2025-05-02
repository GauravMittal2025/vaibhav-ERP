import React, { createContext, useContext, ReactNode, useState } from 'react';
import { 
  users, products, customers, suppliers, orders, 
  equipment, maintenanceTasks, workOrders, dashboardStats, attendance
} from '../data/mockData';
import { 
  User, Product, Customer, Supplier, Order, 
  Equipment, MaintenanceTask, WorkOrder, DashboardStats, 
  Attendance
} from '../types';

interface AppContextType {
  // Data
  attendance: Attendance[];
  users: User[];
  products: Product[];
  customers: Customer[];
  suppliers: Supplier[];
  orders: Order[];
  equipment: Equipment[];
  maintenanceTasks: MaintenanceTask[];
  workOrders: WorkOrder[];
  dashboardStats: DashboardStats;
  
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Current page
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with mock data
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const value = {
    // Data
    users,
    attendance,
    products,
    customers,
    suppliers,
    orders,
    equipment,
    maintenanceTasks,
    workOrders,
    dashboardStats,
    
    // Current user
    currentUser,
    setCurrentUser,
    
    // UI state
    sidebarOpen,
    toggleSidebar,
    
    // Current page
    currentPage,
    setCurrentPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};