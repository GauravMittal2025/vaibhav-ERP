export type Role = 'admin' | 'manager' | 'guard' | 'supervisor' | 'sr-supervisor' | 'driver' | 'all';

export const userRoles = [
  'admin',
  'manager',
  'guard',
  'supervisor',
  'sr-supervisor',
  'driver'
];

export const UsersAllowedArr = [
  'admin'
];

export const EmpAllowedArr = [
  'admin'
];

export const MaintenanceAllowedArr = [
  'admin'
];

export const ReportsAllowedArr = [
  'admin'
];

export const InventoryArr = [
  'admin',
  'supervisor',
  'sr-supervisor'
];

export const OrdersArr = [
  'admin',
  'supervisor',
  'sr-supervisor'
];

export const CustomersArr = [
  'admin',
];

export const SuppliersArr = [
  'admin',
];

export const StoreManagementAllowedArr = [
  'admin',
  'supervisor',
  'sr-supervisor'
]

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  auth: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}