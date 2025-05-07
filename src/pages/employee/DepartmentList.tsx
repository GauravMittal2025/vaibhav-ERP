import React, { useState } from 'react';
import { useApp } from '../../context/employee/EmpContext';
import Card, { CardContent, CardHeader } from '../../components/post-auth/employee/Card';
import Button from '../../components/post-auth/employee/Button';
import { Users, Plus } from 'lucide-react';

const DepartmentList: React.FC = () => {
  const { departments } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
        <Button 
          variant="primary" 
          onClick={() => {}}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Department
        </Button>
      </div>
      
      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search departments..."
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Department List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map(department => (
          <Card key={department.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-800">{department.name}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{department.description}</p>
              
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">{department.employeeCount} employees</span>
              </div>
              
              {department.manager ? (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Manager:</span> {department.manager}
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic">No manager assigned</p>
              )}
              
              <div className="mt-4">
                <Button variant="outline" size="sm" fullWidth>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredDepartments.length === 0 && (
          <div className="col-span-full flex items-center justify-center p-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No departments found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;