import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import Dashboard from './pages/dashboard';
import Attendance from './pages/attendance';
import Inventory from './pages/inventory';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    // Update page title based on the current route
    const pathname = location.pathname;
    let title = 'Enterprise Resource Planning';
    
    if (pathname === '/') {
      title = 'Dashboard | Enterprise ERP';
    } else if (pathname === '/attendance') {
      title = 'Attendance Management | Enterprise ERP';
    } else if (pathname === '/inventory') {
      title = 'Inventory Management | Enterprise ERP';
    } else if (pathname.startsWith('/production')) {
      title = 'Production Management | Enterprise ERP';
    }
    
    document.title = title;
  }, [location]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;