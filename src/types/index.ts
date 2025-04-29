// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  avatar?: string;
}

// Attendance types
export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  type: 'sick' | 'casual' | 'annual' | 'unpaid' | 'other';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  createdAt: string;
}

// Inventory types
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
  location: string;
  reorderLevel: number;
  lastUpdated: string;
}

export interface InventoryTransaction {
  id: string;
  itemId: string;
  type: 'inward' | 'outward' | 'adjustment';
  quantity: number;
  date: string;
  performedBy: string;
  reference: string;
  notes?: string;
}

// Store & Maintenance types
export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  requestedBy: string;
  createdAt: string;
  completedAt?: string;
  assets: string[];
}

// Production types
export interface ProductionTask {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  assignedTo: string[];
  priority: 'low' | 'medium' | 'high';
  materials: {
    itemId: string;
    quantity: number;
  }[];
}

// Logistics types
export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
  carrier: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  items: {
    itemId: string;
    quantity: number;
  }[];
  notes?: string;
}

// Material & Broker types
export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  category: string[];
  rating: number;
  active: boolean;
}

// Visitor types
export interface Visitor {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone: string;
  purpose: string;
  visitingPerson: string;
  checkIn: string;
  checkOut?: string;
  status: 'checked-in' | 'checked-out' | 'scheduled';
  badgeNumber?: string;
}

// Report types
export interface Report {
  id: string;
  name: string;
  type: 'attendance' | 'inventory' | 'production' | 'logistics' | 'finance' | 'custom';
  createdBy: string;
  createdAt: string;
  lastRun?: string;
  schedule?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  recipients?: string[];
  parameters?: Record<string, any>;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  userId: string;
  relatedTo?: {
    type: string;
    id: string;
  };
}