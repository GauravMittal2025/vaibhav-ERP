import React from 'react';
import { AppProvider, useApp } from '../../context/employee/EmpContext';
import EmployeeList from './EmployeeList';
import DepartmentList from './DepartmentList';
import Dashboard from '../Dashboard';
import Layout from '../../components/layout/layout';

function EmpOverview() {

    const MainApp: React.FC = () => {
        const { currentPage } = useApp();
      
        const renderPage = () => {
          switch (currentPage) {

            // employee management
            case 'employees':
              return <EmployeeList/>;
            case 'departments':
              return <DepartmentList/>;
            default:
              return <Dashboard />;
          }
        };
      
        return (
            renderPage()
        );
      };

    return (
        <AppProvider>
            <MainApp/>
        </AppProvider>
    );
}

export default EmpOverview;