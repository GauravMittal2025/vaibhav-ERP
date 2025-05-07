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
import { ChevronLeft, Edit, Trash2, Mail, Phone, CalendarClock, Building, CreditCard, User2 } from 'lucide-react';

interface EmployeeDetailsProps {
  onBack: () => void;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ onBack }) => {
  const { selectedEmployee, updateEmployee, deleteEmployee, setSelectedEmployee } = useApp();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!selectedEmployee) {
    return null;
  }
  
  const handleEditEmployee = (data: typeof selectedEmployee) => {
    updateEmployee(data);
    setShowEditModal(false);
  };
  
  const handleDeleteEmployee = () => {
    deleteEmployee(selectedEmployee.id);
    setSelectedEmployee(null);
  };
  
  const statusVariant = 
    selectedEmployee.status === 'active' ? 'success' :
    selectedEmployee.status === 'inactive' ? 'default' : 'warning';
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBack}
          icon={<ChevronLeft className="w-4 h-4" />}
        >
          Back to Employees
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Profile Card */}
        <Card className="lg:col-span-1">
          <div className="p-6 flex flex-col items-center text-center">
            <div className="mb-4">
              <Avatar
                src={selectedEmployee.avatar}
                firstName={selectedEmployee.firstName}
                lastName={selectedEmployee.lastName}
                size="lg"
                status={selectedEmployee.status}
              />
            </div>
            
            <h2 className="text-xl font-bold text-gray-800">
              {selectedEmployee.firstName} {selectedEmployee.lastName}
            </h2>
            
            <p className="text-gray-600 mt-1">{selectedEmployee.position}</p>
            
            <div className="mt-2">
              <Badge variant={statusVariant}>
                {selectedEmployee.status.charAt(0).toUpperCase() + selectedEmployee.status.slice(1)}
              </Badge>
            </div>
            
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600 mr-3" />
                <div className="flex-1 text-left">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{selectedEmployee.email}</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600 mr-3" />
                <div className="flex-1 text-left">
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-800">{selectedEmployee.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Building className="w-5 h-5 text-gray-600 mr-3" />
                <div className="flex-1 text-left">
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="text-sm font-medium text-gray-800">{selectedEmployee.department}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 w-full space-y-3">
              <Button 
                variant="primary" 
                fullWidth 
                onClick={() => setShowEditModal(true)}
                icon={<Edit className="w-4 h-4" />}
              >
                Edit Employee
              </Button>
              
              <Button 
                variant="danger" 
                fullWidth 
                onClick={() => setShowDeleteConfirm(true)}
                icon={<Trash2 className="w-4 h-4" />}
              >
                Delete Employee
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Employee Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">Employment Information</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <User2 className="w-4 h-4 text-gray-500 mr-2" />
                      <p className="text-sm font-medium text-gray-500">Position</p>
                    </div>
                    <p className="text-gray-800 font-medium">{selectedEmployee.position}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Building className="w-4 h-4 text-gray-500 mr-2" />
                      <p className="text-sm font-medium text-gray-500">Department</p>
                    </div>
                    <p className="text-gray-800 font-medium">{selectedEmployee.department}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <CalendarClock className="w-4 h-4 text-gray-500 mr-2" />
                      <p className="text-sm font-medium text-gray-500">Hire Date</p>
                    </div>
                    <p className="text-gray-800 font-medium">{formatDate(selectedEmployee.hireDate)}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <CreditCard className="w-4 h-4 text-gray-500 mr-2" />
                      <p className="text-sm font-medium text-gray-500">Salary</p>
                    </div>
                    <p className="text-gray-800 font-medium">{formatCurrency(selectedEmployee.salary)}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <p className="text-sm font-medium text-gray-500">Employee ID</p>
                    </div>
                    <p className="text-gray-800 font-medium font-mono">{selectedEmployee.id}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">Activity & Notes</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 italic">No recent activity or notes available.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Edit Employee Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Employee"
        size="lg"
      >
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleEditEmployee}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteEmployee}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee.firstName} ${selectedEmployee.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </div>
  );
};

export default EmployeeDetails;