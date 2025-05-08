import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '2025-06-01T14:22:10Z',
    createdAt: '2024-01-15T10:30:00Z',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'manager@example.com',
    role: 'manager',
    status: 'active',
    lastActive: '2025-06-01T11:45:22Z',
    createdAt: '2024-02-10T09:15:00Z',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Michael Editor',
    email: 'editor@example.com',
    role: 'editor',
    status: 'active',
    lastActive: '2025-05-29T16:10:05Z',
    createdAt: '2024-03-05T14:20:00Z',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Emily Viewer',
    email: 'viewer@example.com',
    role: 'viewer',
    status: 'active',
    lastActive: '2025-06-01T09:30:45Z',
    createdAt: '2024-04-20T11:00:00Z',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: '5',
    name: 'David Support',
    email: 'support@example.com',
    role: 'support',
    status: 'inactive',
    lastActive: '2025-05-25T13:15:30Z',
    createdAt: '2024-05-12T08:45:00Z',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
];

export const createUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser = {
    ...user,
    id: `${users.length + 1}`,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, userData: Partial<User>): User | null => {
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    return users[index];
  }
  
  return null;
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  
  return false;
};