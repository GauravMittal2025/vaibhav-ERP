import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, Department, Notification } from '../../types';
import { mockEmployees, mockDepartments } from '../../utils/employee/mockData';
import { generateId } from '../../utils/employee/helpers';

interface AppContextType {
  employees: Employee[];
  departments: Department[];
  notifications: Notification[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  addNotification: (type: Notification['type'], message: string) => void;
  dismissNotification: (id: string) => void;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Load initial data
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    const storedDepartments = localStorage.getItem('departments');
    
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      setEmployees(mockEmployees);
    }
    
    if (storedDepartments) {
      setDepartments(JSON.parse(storedDepartments));
    } else {
      setDepartments(mockDepartments);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  useEffect(() => {
    if (departments.length > 0) {
      localStorage.setItem('departments', JSON.stringify(departments));
    }
  }, [departments]);

  // Update department employee counts when employees change
  useEffect(() => {
    const updatedDepartments = departments.map(dept => {
      const count = employees.filter(emp => emp.department === dept.name).length;
      return { ...dept, employeeCount: count };
    });
    
    setDepartments(updatedDepartments);
  }, [employees]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: generateId() };
    setEmployees([...employees, newEmployee as Employee]);
    addNotification('success', `${employee.firstName} ${employee.lastName} has been added.`);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    addNotification('success', `${updatedEmployee.firstName} ${updatedEmployee.lastName}'s information has been updated.`);
  };

  const deleteEmployee = (id: string) => {
    const employeeToDelete = employees.find(emp => emp.id === id);
    setEmployees(employees.filter(emp => emp.id !== id));
    if (employeeToDelete) {
      addNotification('info', `${employeeToDelete.firstName} ${employeeToDelete.lastName} has been removed.`);
    }
  };

  const addNotification = (type: Notification['type'], message: string) => {
    const notification = {
      id: generateId(),
      type,
      message,
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(notification.id);
    }, 5000);
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const value = {
    employees,
    departments,
    notifications,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addNotification,
    dismissNotification,
    selectedEmployee,
    setSelectedEmployee,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};