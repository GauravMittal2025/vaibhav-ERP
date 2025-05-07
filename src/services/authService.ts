import { LoginCredentials, RegisterCredentials, User } from '../types/auth';

// Mock users data - in a real app, this would come from a backend
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date(2023, 1, 1).toISOString(),
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@example.com',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date(2023, 2, 15).toISOString(),
  },
  {
    id: '3',
    name: 'Guard User',
    email: 'guard@example.com',
    role: 'guard',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date(2023, 3, 20).toISOString(),
  },
  {
    id: '4',
    name: 'Supervisor User',
    email: 'supervisor@example.com',
    role: 'supervisor',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date(2023, 3, 20).toISOString(),
  },
  {
    id: '5',
    name: 'Sr-Supervisor User',
    email: 'srsupervisor@example.com',
    role: 'sr-supervisor',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date(2023, 3, 20).toISOString(),
  },
  {
    id: '6',
    name: 'Driver User',
    email: 'driver@example.com',
    role: 'driver',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date(2023, 3, 20).toISOString(),
  },
];

// Mock authentication service with localStorage persistence
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Login with email/password
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    // Simulate API call
    await delay(800);
    
    const user = mockUsers.find(u => u.email === credentials.email);
    
    // Check if user exists and password matches (in a real app, you'd hash passwords)
    if (user && credentials.password === 'password') {
      // Generate a mock token
      const token = `mock_token_${Math.random().toString(36).substring(2)}`;
      
      // Store in localStorage for persistence
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      
      return { user, token };
    }
    
    throw new Error('Invalid email or password');
  },
  
  // Register new user
  register: async (credentials: RegisterCredentials): Promise<{ user: User; token: string }> => {
    // Simulate API call
    await delay(800);
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === credentials.email)) {
      throw new Error('Email already in use');
    }
    
    // Check if passwords match
    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    
    // Create new user with 'user' role by default
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name: credentials.name,
      email: credentials.email,
      role: 'manager',
      createdAt: new Date().toISOString(),
    };
    
    // Add to mock users list (in a real app, this would be saved to a database)
    mockUsers.push(newUser);
    
    // Generate a mock token
    const token = `mock_token_${Math.random().toString(36).substring(2)}`;
    
    // Store in localStorage for persistence
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    
    return { user: newUser, token };
  },
  
  // Logout
  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },
  
  // Get all users (admin only function)
  getAllUsers: async (): Promise<User[]> => {
    // Simulate API call
    await delay(500);
    return [...mockUsers];
  },
};