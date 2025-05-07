export interface Attendance {
id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  reorderLevel: number;
  supplier: string;
  lastRestocked: string;
  status: 'active' | 'discontinued' | 'out_of_stock';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastPurchase: string;
  status: 'active' | 'inactive';
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  products: string[];
  lastOrder: string;
  paymentTerms: string;
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  customer: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  shippingAddress: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  warranty: string;
  department: string;
  lastMaintenance: string;
  status: 'operational' | 'maintenance' | 'broken' | 'retired';
}

export interface MaintenanceTask {
  id: string;
  equipmentId: string;
  equipmentName: string;
  taskType: 'preventive' | 'corrective' | 'inspection';
  description: string;
  assignedTo: string;
  scheduledDate: string;
  completedDate?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  parts?: MaintenancePart[];
}

export interface MaintenancePart {
  id: string;
  name: string;
  quantity: number;
  cost: number;
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  dueDate: string;
  completedDate?: string;
  status: 'open' | 'in_progress' | 'on_hold' | 'completed';
  category: string;
  relatedEquipment?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  inventoryValue: number;
  lowStockItems: number;
  pendingMaintenance: number;
  openWorkOrders: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on leave';
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  manager: string | null;
  employeeCount: number;
}

export interface Statistics {
  totalEmployees: number;
  activeEmployees: number;
  departmentCounts: Record<string, number>;
  avgSalary: number;
  newHires: number;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}