import { Permission } from '../types';

export const permissions: Permission[] = [
  {
    id: '1',
    name: 'users:read',
    description: 'View users and their details',
    category: 'users',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'users:write',
    description: 'Create and edit users',
    category: 'users',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'users:delete',
    description: 'Delete users from the system',
    category: 'users',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'roles:read',
    description: 'View roles and their details',
    category: 'roles',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'roles:write',
    description: 'Create and edit roles',
    category: 'roles',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'roles:delete',
    description: 'Delete roles from the system',
    category: 'roles',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'permissions:read',
    description: 'View permissions list',
    category: 'permissions',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '8',
    name: 'settings:read',
    description: 'View system settings',
    category: 'settings',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '9',
    name: 'settings:write',
    description: 'Modify system settings',
    category: 'settings',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '10',
    name: 'reports:read',
    description: 'View system reports and analytics',
    category: 'reports',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const getPermissionsByCategory = (): Record<string, Permission[]> => {
  return permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);
};