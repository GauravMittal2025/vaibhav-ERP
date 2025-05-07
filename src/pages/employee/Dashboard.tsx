import React from 'react';
import Card, { CardContent, CardHeader } from '../../components/post-auth/employee/Card';
import { useApp } from '../../context/employee/EmpContext';
import { calculateStatistics } from '../../utils/employee/helpers';
import { formatCurrency } from '../../utils/employee/helpers';
import { Users, DollarSign, CalendarCheck, Building } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { employees, departments } = useApp();
  const stats = calculateStatistics(employees);
  
  const cardWrapperClasses = 'col-span-1 transition-transform duration-200 hover:scale-[1.01]';
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={cardWrapperClasses}>
          <Card className="h-full">
            <CardContent className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalEmployees}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.activeEmployees} active ({Math.round(stats.activeEmployees / stats.totalEmployees * 100) || 0}%)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className={cardWrapperClasses}>
          <Card className="h-full">
            <CardContent className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Salary</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.avgSalary)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Per employee
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className={cardWrapperClasses}>
          <Card className="h-full">
            <CardContent className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <CalendarCheck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">New Hires</p>
                <p className="text-2xl font-bold text-gray-800">{stats.newHires}</p>
                <p className="text-xs text-gray-500 mt-1">
                  In the last 3 months
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className={cardWrapperClasses}>
          <Card className="h-full">
            <CardContent className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <Building className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Departments</p>
                <p className="text-2xl font-bold text-gray-800">{departments.length}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Across the company
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Department Distribution</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map(dept => {
                const percentage = Math.round((dept.employeeCount / stats.totalEmployees) * 100) || 0;
                return (
                  <div key={dept.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">{dept.name}</span>
                      <span className="text-sm font-medium text-gray-800">{dept.employeeCount} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Employees */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Recently Added Employees</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees
                .sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime())
                .slice(0, 5)
                .map(employee => (
                  <div key={employee.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      {employee.avatar ? (
                        <img src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-medium">
                          {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{employee.firstName} {employee.lastName}</p>
                      <p className="text-xs text-gray-500">{employee.position} · {employee.department}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;