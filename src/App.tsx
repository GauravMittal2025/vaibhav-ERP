import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/inventory/Inventory';
import Orders from './pages/orders/Orders';
import Equipment from './pages/equipment/Equipment';
import Maintenance from './pages/maintenance/Maintenance';
import Attendance from './pages/Attendance';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import Users from './pages/users/Users';
import Suppliers from './pages/supplier/Supplier';

const MainApp: React.FC = () => {
  const { currentPage } = useAppContext();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'attendance':
        return <Attendance/>;
      case 'inventory':
        return <Inventory />;
      case 'orders':
        return <Orders />;
      case 'equipment':
        return <Equipment />;
      case 'maintenance':
        return <Maintenance />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'users':
        return <Users />;
      case 'suppliers':
        return <Suppliers />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;