import React, { useState } from 'react';
import Input from '../../../../components/post-auth/employee/Input';
import Select from '../../../../components/post-auth/employee/Select';
import Button from '../../../../components/post-auth/employee/Button';
import { useApp } from '../../../../context/employee/EmpContext';
import { Employee } from '../../../../types';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: Omit<Employee, 'id'> | Employee) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSubmit,
  onCancel,
}) => {
  const { departments } = useApp();
  const isEditMode = !!employee;
  
  const [formData, setFormData] = useState<Omit<Employee, 'id'> | Employee>(
    employee || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      hireDate: new Date().toISOString().split('T')[0],
      salary: 0,
      status: 'active',
    }
  );
  
  const [errors, setErrors] = useState<Partial<Record<keyof Employee, string>>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: string | number = value;
    if (type === 'number') {
      parsedValue = value === '' ? 0 : Number(value);
    }
    
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
    
    // Clear error for this field
    if (errors[name as keyof Employee]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field
    if (errors[name as keyof Employee]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Employee, string>> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.hireDate) {
      newErrors.hireDate = 'Hire date is required';
    }
    
    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (formData.salary <= 0) {
      newErrors.salary = 'Salary must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          error={errors.position}
          required
        />
        
        <Select
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleSelectChange('department')}
          options={departments.map(dept => ({ value: dept.name, label: dept.name }))}
          error={errors.department}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Hire Date"
          type="date"
          name="hireDate"
          value={formData.hireDate}
          onChange={handleChange}
          error={errors.hireDate}
          required
        />
        
        <Input
          label="Salary"
          type="number"
          name="salary"
          value={formData.salary.toString()}
          onChange={handleChange}
          error={errors.salary}
          required
        />
      </div>
      
      <div>
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleSelectChange('status')}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'on leave', label: 'On Leave' },
          ]}
          error={errors.status}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Avatar URL (Optional)"
          name="avatar"
          value={formData.avatar || ''}
          onChange={handleChange}
          placeholder="https://example.com/avatar.jpg"
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEditMode ? 'Update Employee' : 'Add Employee'}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;