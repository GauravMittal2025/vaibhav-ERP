import React, { useState } from 'react';
import { useApp } from '../../context/employee/EmpContext';
import Card, { CardContent, CardHeader } from '../../components/post-auth/employee/Card';
import Button from '../../components/post-auth/employee/Button';
import Avatar from '../../components/post-auth/employee/Avatar';
import Modal from '../../components/post-auth/employee/Modal';
import EmployeeForm from '../../components/post-auth/employee/forms/EmployeeForm';
import ConfirmDialog from '../../components/post-auth/employee/ConfirmDialog';
import Badge from '../../components/post-auth/employee/Badge';
import { formatCurrency, formatDate } from '../../utils/employee/helpers';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Employee } from '../../types';

const EmployeeList: React.FC = () => {
  const { employees, departments, addEmployee, updateEmployee, deleteEmployee, setSelectedEmployee } = useApp();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchTerm === '' || 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === '' || employee.department === filterDepartment;
    const matchesStatus = filterStatus === '' || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  const handleAddEmployee = (data: Omit<Employee, 'id'>) => {
    addEmployee(data);
    setShowAddModal(false);
  };
  
  const handleEditEmployee = (data: Employee) => {
    updateEmployee(data);
    setEditingEmployee(null);
  };
  
  const handleDeleteConfirm = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id);
      setEmployeeToDelete(null);
    }
  };
  
  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
  };
  
  const renderStatus = (status: Employee['status']) => {
    const statusMap = {
      active: { label: 'Active', variant: 'success' as const },
      inactive: { label: 'Inactive', variant: 'default' as const },
      'on leave': { label: 'On Leave', variant: 'warning' as const },
    };
    
    const { label, variant } = statusMap[status];
    
    return <Badge variant={variant}>{label}</Badge>;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <Button 
          variant="primary" 
          onClick={() => setShowAddModal(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Employee
        </Button>
      </div>
      
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on leave">On Leave</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Employee List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Employee Directory</h2>
            <p className="text-sm text-gray-500">{filteredEmployees.length} employees</p>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hire Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No employees found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar 
                          src={employee.avatar} 
                          firstName={employee.firstName} 
                          lastName={employee.lastName}
                          status={employee.status}
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatus(employee.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(employee.salary)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(employee.hireDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewDetails(employee)}
                          icon={<Eye className="w-4 h-4" />}
                        >
                          <span className="sr-only">View</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setEditingEmployee(employee)}
                          icon={<Edit className="w-4 h-4" />}
                        >
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setEmployeeToDelete(employee)}
                          icon={<Trash2 className="w-4 h-4" />}
                        >
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Add Employee Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Employee"
        size="lg"
      >
        <EmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
      
      {/* Edit Employee Modal */}
      <Modal
        isOpen={!!editingEmployee}
        onClose={() => setEditingEmployee(null)}
        title="Edit Employee"
        size="lg"
      >
        {editingEmployee && (
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={handleEditEmployee}
            onCancel={() => setEditingEmployee(null)}
          />
        )}
      </Modal>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message={
          employeeToDelete
            ? `Are you sure you want to delete ${employeeToDelete.firstName} ${employeeToDelete.lastName}? This action cannot be undone.`
            : 'Are you sure you want to delete this employee?'
        }
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </div>
  );
};

export default EmployeeList;