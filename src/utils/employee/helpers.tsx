import { Employee, Statistics } from '../../types';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const calculateStatistics = (employees: Employee[]): Statistics => {
  const departmentCounts: Record<string, number> = {};
  let totalSalary = 0;
  let activeCount = 0;
  let newHiresCount = 0;
  
  // Calculate 3 months ago for new hires
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  employees.forEach(employee => {
    // Count by department
    departmentCounts[employee.department] = (departmentCounts[employee.department] || 0) + 1;
    
    // Sum salaries
    totalSalary += employee.salary;
    
    // Count active employees
    if (employee.status === 'active') {
      activeCount++;
    }
    
    // Count new hires (less than 3 months)
    const hireDate = new Date(employee.hireDate);
    if (hireDate > threeMonthsAgo) {
      newHiresCount++;
    }
  });
  
  return {
    totalEmployees: employees.length,
    activeEmployees: activeCount,
    departmentCounts,
    avgSalary: employees.length ? totalSalary / employees.length : 0,
    newHires: newHiresCount,
  };
};