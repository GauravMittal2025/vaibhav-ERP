import { Role } from '../types';

export const roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: ['users:read', 'users:write', 'users:delete', 'roles:read', 'roles:write', 'roles:delete', 'permissions:read', 'settings:read', 'settings:write', 'reports:read'],
    usersCount: 1,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-05-15T14:30:00Z',
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Can manage users and view roles',
    permissions: ['users:read', 'users:write', 'roles:read', 'permissions:read', 'reports:read'],
    usersCount: 3,
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-04-20T11:45:00Z',
  },
  {
    id: '3',
    name: 'Editor',
    description: 'Can edit content but cannot manage users or roles',
    permissions: ['users:read', 'reports:read'],
    usersCount: 5,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-10T16:20:00Z',
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to most system areas',
    permissions: ['users:read', 'roles:read', 'reports:read'],
    usersCount: 10,
    createdAt: '2024-02-01T13:45:00Z',
    updatedAt: '2024-05-05T09:10:00Z',
  },
  {
    id: '5',
    name: 'Support',
    description: 'Customer support staff with limited access',
    permissions: ['users:read'],
    usersCount: 7,
    createdAt: '2024-02-10T15:00:00Z',
    updatedAt: '2024-04-12T14:30:00Z',
  },
];

export const createRole = (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'usersCount'>): Role => {
  const newRole = {
    ...role,
    id: `${roles.length + 1}`,
    usersCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  roles.push(newRole);
  return newRole;
};

export const updateRole = (id: string, roleData: Partial<Role>): Role | null => {
  const index = roles.findIndex(role => role.id === id);
  
  if (index !== -1) {
    roles[index] = { 
      ...roles[index], 
      ...roleData,
      updatedAt: new Date().toISOString() 
    };
    return roles[index];
  }
  
  return null;
};

export const deleteRole = (id: string): boolean => {
  const index = roles.findIndex(role => role.id === id);
  
  if (index !== -1) {
    roles.splice(index, 1);
    return true;
  }
  
  return false;
};