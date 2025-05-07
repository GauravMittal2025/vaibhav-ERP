import { useState } from 'react';
import { Plus, Search, Edit, Trash2, UserPlus, Users as UsersIcon, ShieldCheck, Key } from 'lucide-react';
import Button from '../../components/post-auth/ui/Button';
import Card from '../../components/post-auth/ui/omniCards/Card';
import Badge from '../../components/post-auth/ui/Badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'technician' | 'employee';
  department: string;
  status: 'active' | 'inactive';
  lastLogin: Date | null;
  dateCreated: Date;
}

const usersData: User[] = [
  {
    id: 'U001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'admin',
    department: 'Management',
    status: 'active',
    lastLogin: new Date('2023-09-15T10:30:00'),
    dateCreated: new Date('2022-01-10'),
  },
  {
    id: 'U002',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'manager',
    department: 'Operations',
    status: 'active',
    lastLogin: new Date('2023-09-14T14:45:00'),
    dateCreated: new Date('2022-03-15'),
  },
  {
    id: 'U003',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'technician',
    department: 'Maintenance',
    status: 'active',
    lastLogin: new Date('2023-09-15T08:20:00'),
    dateCreated: new Date('2022-05-22'),
  },
  {
    id: 'U004',
    name: 'Amy Wilson',
    email: 'amy.wilson@example.com',
    role: 'technician',
    department: 'IT Support',
    status: 'active',
    lastLogin: new Date('2023-09-12T11:10:00'),
    dateCreated: new Date('2022-08-01'),
  },
  {
    id: 'U005',
    name: 'David Lee',
    email: 'david.lee@example.com',
    role: 'employee',
    department: 'Warehouse',
    status: 'inactive',
    lastLogin: new Date('2023-08-30T09:15:00'),
    dateCreated: new Date('2022-09-15'),
  },
  {
    id: 'U006',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@example.com',
    role: 'manager',
    department: 'Logistics',
    status: 'active',
    lastLogin: new Date('2023-09-14T16:05:00'),
    dateCreated: new Date('2023-01-05'),
  },
  {
    id: 'U007',
    name: 'Tom Jackson',
    email: 'tom.jackson@example.com',
    role: 'employee',
    department: 'Shipping',
    status: 'active',
    lastLogin: new Date('2023-09-13T13:40:00'),
    dateCreated: new Date('2023-03-20'),
  },
  {
    id: 'U008',
    name: 'Jennifer Kim',
    email: 'jennifer.kim@example.com',
    role: 'employee',
    department: 'Customer Service',
    status: 'inactive',
    lastLogin: null,
    dateCreated: new Date('2023-08-10'),
  },
];

function Users() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'all' || 
      user.status === statusFilter;
      
    const matchesRole = 
      roleFilter === 'all' || 
      user.role === roleFilter;
      
    return matchesSearch && matchesStatus && matchesRole;
  });
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="danger">Admin</Badge>;
      case 'manager':
        return <Badge variant="primary">Manager</Badge>;
      case 'technician':
        return <Badge variant="secondary">Technician</Badge>;
      case 'employee':
        return <Badge variant="default">Employee</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="warning">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const deleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  
  const counts = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    admin: users.filter(u => u.role === 'admin').length,
    manager: users.filter(u => u.role === 'manager').length,
    technician: users.filter(u => u.role === 'technician').length,
    employee: users.filter(u => u.role === 'employee').length,
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage user accounts, permissions, and access control
          </p>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          icon={<UserPlus size={18} />}
        >
          Add New User
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-blue-100">
              <UsersIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.total}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-green-100">
              <Key size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.active}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-amber-100">
              <ShieldCheck size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Admins & Managers</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.admin + counts.manager}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-red-100">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Inactive Users</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.inactive}</p>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <select 
              className="form-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <select 
              className="form-input"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="technician">Technician</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="form-input pl-10 w-full"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Users table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th> */}
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? user.lastLogin.toLocaleString() : 'Never'}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<Edit size={14} />}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        icon={<Trash2 size={14} />}
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No users found matching your search criteria.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Users;