import { 
  User, Product, Customer, Supplier, Order, 
  Equipment, MaintenanceTask, WorkOrder, DashboardStats, Attendance 
} from '../types';

// Attendance data
export const attendance: Attendance[] = []

// Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@erp.com',
    role: 'admin',
    department: 'Management',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@erp.com',
    role: 'manager',
    department: 'Sales',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@erp.com',
    role: 'employee',
    department: 'Maintenance',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

// Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro X',
    sku: 'LPX-001',
    category: 'Electronics',
    price: 1299.99,
    cost: 950.00,
    stockQuantity: 25,
    reorderLevel: 10,
    supplier: 'TechSupplies Inc.',
    lastRestocked: '2025-03-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Office Chair Ergonomic',
    sku: 'OCE-002',
    category: 'Furniture',
    price: 249.99,
    cost: 150.00,
    stockQuantity: 42,
    reorderLevel: 15,
    supplier: 'Office Essentials',
    lastRestocked: '2025-04-02',
    status: 'active'
  },
  {
    id: '3',
    name: 'Wireless Mouse',
    sku: 'WM-003',
    category: 'Electronics',
    price: 49.99,
    cost: 25.00,
    stockQuantity: 8,
    reorderLevel: 20,
    supplier: 'TechSupplies Inc.',
    lastRestocked: '2025-03-28',
    status: 'active'
  },
  {
    id: '4',
    name: 'Standing Desk',
    sku: 'SD-004',
    category: 'Furniture',
    price: 449.99,
    cost: 300.00,
    stockQuantity: 15,
    reorderLevel: 5,
    supplier: 'Office Essentials',
    lastRestocked: '2025-02-10',
    status: 'active'
  },
  {
    id: '5',
    name: 'Printer ink',
    sku: 'PI-005',
    category: 'Supplies',
    price: 29.99,
    cost: 15.00,
    stockQuantity: 3,
    reorderLevel: 10,
    supplier: 'Office Supplies Co.',
    lastRestocked: '2025-04-05',
    status: 'active'
  },
];

// Customers
export const customers: Customer[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'orders@acme.com',
    phone: '555-123-4567',
    address: '123 Business Ave, Commerce City, CA 90210',
    totalOrders: 24,
    totalSpent: 28500.50,
    lastPurchase: '2025-04-10',
    status: 'active'
  },
  {
    id: '2',
    name: 'TechStart Solutions',
    email: 'purchasing@techstart.io',
    phone: '555-987-6543',
    address: '456 Innovation Blvd, Tech Valley, TX 75001',
    totalOrders: 15,
    totalSpent: 12800.75,
    lastPurchase: '2025-03-28',
    status: 'active'
  },
  {
    id: '3',
    name: 'Global Services Ltd',
    email: 'procurement@globalservices.com',
    phone: '555-456-7890',
    address: '789 Enterprise St, Metro City, NY 10001',
    totalOrders: 8,
    totalSpent: 9200.25,
    lastPurchase: '2025-04-05',
    status: 'active'
  },
];

// Suppliers
export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'TechSupplies Inc.',
    contactName: 'Robert Chen',
    email: 'robert.chen@techsupplies.com',
    phone: '555-222-3333',
    address: '100 Supplier Road, Industry Park, CA 92101',
    products: ['1', '3'],
    lastOrder: '2025-03-15',
    paymentTerms: 'Net 30',
    status: 'active'
  },
  {
    id: '2',
    name: 'Office Essentials',
    contactName: 'Sarah Williams',
    email: 'sarah.w@officeessentials.com',
    phone: '555-444-5555',
    address: '200 Commerce Blvd, Business District, TX 75001',
    products: ['2', '4'],
    lastOrder: '2025-04-02',
    paymentTerms: 'Net 45',
    status: 'active'
  },
  {
    id: '3',
    name: 'Office Supplies Co.',
    contactName: 'David Martinez',
    email: 'dmartinez@officesupplies.co',
    phone: '555-666-7777',
    address: '300 Manufacturing Ave, Industrial Zone, IL 60007',
    products: ['5'],
    lastOrder: '2025-04-05',
    paymentTerms: 'Net 15',
    status: 'active'
  },
];

// Orders
export const orders: Order[] = [
  {
    id: '1',
    customer: '1',
    orderDate: '2025-04-10T14:30:00',
    status: 'delivered',
    items: [
      {
        productId: '1',
        productName: 'Laptop Pro X',
        quantity: 5,
        unitPrice: 1299.99,
        total: 6499.95
      },
      {
        productId: '3',
        productName: 'Wireless Mouse',
        quantity: 5,
        unitPrice: 49.99,
        total: 249.95
      }
    ],
    total: 6749.90,
    paymentStatus: 'paid',
    shippingAddress: '123 Business Ave, Commerce City, CA 90210',
    trackingNumber: 'TRK123456789'
  },
  {
    id: '2',
    customer: '2',
    orderDate: '2025-03-28T11:15:00',
    status: 'shipped',
    items: [
      {
        productId: '2',
        productName: 'Office Chair Ergonomic',
        quantity: 10,
        unitPrice: 249.99,
        total: 2499.90
      },
      {
        productId: '4',
        productName: 'Standing Desk',
        quantity: 5,
        unitPrice: 449.99,
        total: 2249.95
      }
    ],
    total: 4749.85,
    paymentStatus: 'paid',
    shippingAddress: '456 Innovation Blvd, Tech Valley, TX 75001',
    trackingNumber: 'TRK987654321'
  },
  {
    id: '3',
    customer: '3',
    orderDate: '2025-04-05T09:45:00',
    status: 'processing',
    items: [
      {
        productId: '1',
        productName: 'Laptop Pro X',
        quantity: 2,
        unitPrice: 1299.99,
        total: 2599.98
      },
      {
        productId: '3',
        productName: 'Wireless Mouse',
        quantity: 5,
        unitPrice: 49.99,
        total: 249.95
      },
      {
        productId: '5',
        productName: 'Printer ink',
        quantity: 10,
        unitPrice: 29.99,
        total: 299.90
      }
    ],
    total: 3149.83,
    paymentStatus: 'pending',
    shippingAddress: '789 Enterprise St, Metro City, NY 10001'
  },
];

// Equipment
export const equipment: Equipment[] = [
  {
    id: '1',
    name: 'Production Line A',
    type: 'Manufacturing',
    model: 'ProdTech 5000',
    serialNumber: 'PT5K-123456',
    purchaseDate: '2023-01-15',
    warranty: '2026-01-15',
    department: 'Production',
    lastMaintenance: '2025-03-01',
    status: 'operational'
  },
  {
    id: '2',
    name: 'Forklift #3',
    type: 'Warehouse',
    model: 'LiftMaster 2000',
    serialNumber: 'LM2K-789012',
    purchaseDate: '2022-06-10',
    warranty: '2025-06-10',
    department: 'Logistics',
    lastMaintenance: '2025-02-15',
    status: 'maintenance'
  },
  {
    id: '3',
    name: 'HVAC System - Main Office',
    type: 'Facility',
    model: 'CoolAir Pro',
    serialNumber: 'CAP-345678',
    purchaseDate: '2021-11-28',
    warranty: '2024-11-28',
    department: 'Facilities',
    lastMaintenance: '2025-03-20',
    status: 'operational'
  },
  {
    id: '4',
    name: 'CNC Machine #2',
    type: 'Manufacturing',
    model: 'PrecisionTech CNC-X',
    serialNumber: 'PTCX-901234',
    purchaseDate: '2023-09-05',
    warranty: '2026-09-05',
    department: 'Production',
    lastMaintenance: '2025-01-10',
    status: 'operational'
  },
];

// Maintenance Tasks
export const maintenanceTasks: MaintenanceTask[] = [
  {
    id: '1',
    equipmentId: '1',
    equipmentName: 'Production Line A',
    taskType: 'preventive',
    description: 'Quarterly maintenance checkup and lubrication',
    assignedTo: '3',
    scheduledDate: '2025-06-15',
    status: 'scheduled',
    notes: 'Focus on conveyor belt tensioning and motor inspection'
  },
  {
    id: '2',
    equipmentId: '2',
    equipmentName: 'Forklift #3',
    taskType: 'corrective',
    description: 'Repair hydraulic lift system',
    assignedTo: '3',
    scheduledDate: '2025-04-20',
    status: 'in_progress',
    notes: 'Hydraulic fluid leak detected, replacement parts ordered',
    parts: [
      {
        id: 'p1',
        name: 'Hydraulic cylinder',
        quantity: 1,
        cost: 350.00
      },
      {
        id: 'p2',
        name: 'Hydraulic fluid',
        quantity: 2,
        cost: 45.00
      }
    ]
  },
  {
    id: '3',
    equipmentId: '3',
    equipmentName: 'HVAC System - Main Office',
    taskType: 'inspection',
    description: 'Annual HVAC system inspection',
    assignedTo: '3',
    scheduledDate: '2025-05-10',
    status: 'scheduled',
    notes: 'Check filters, coils, and refrigerant levels'
  },
];

// Work Orders
export const workOrders: WorkOrder[] = [
  {
    id: '1',
    title: 'Office Renovation - Phase 1',
    description: 'Install new partitions and workstations in marketing department',
    requestedBy: '2',
    assignedTo: '3',
    priority: 'medium',
    createdDate: '2025-04-01',
    dueDate: '2025-05-15',
    status: 'in_progress',
    category: 'Facility'
  },
  {
    id: '2',
    title: 'Production Line A Upgrade',
    description: 'Install new control system software and calibrate sensors',
    requestedBy: '1',
    assignedTo: '3',
    priority: 'high',
    createdDate: '2025-04-10',
    dueDate: '2025-04-25',
    status: 'open',
    category: 'Equipment',
    relatedEquipment: '1'
  },
  {
    id: '3',
    title: 'Warehouse Lighting Replacement',
    description: 'Replace old fluorescent lights with LED lighting throughout the warehouse',
    requestedBy: '2',
    assignedTo: '3',
    priority: 'medium',
    createdDate: '2025-03-28',
    dueDate: '2025-05-30',
    status: 'open',
    category: 'Facility'
  },
];

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalRevenue: 154280.50,
  revenueChange: 12.5,
  totalOrders: 47,
  ordersChange: 8.2,
  inventoryValue: 78500.25,
  lowStockItems: 6,
  pendingMaintenance: 4,
  openWorkOrders: 5
};

// Chart data for dashboard
export const revenueChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12500, 15600, 14750, 18200, 17800, 22500],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.5)'
    }
  ]
};

export const ordersChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Orders',
      data: [18, 22, 19, 25, 24, 30],
      borderColor: '#14B8A6',
      backgroundColor: 'rgba(20, 184, 166, 0.5)'
    }
  ]
};

export const inventoryStatusData = {
  labels: ['In Stock', 'Low Stock', 'Out of Stock'],
  datasets: [
    {
      label: 'Inventory Status',
      data: [65, 15, 20],
      backgroundColor: ['#3B82F6', '#F59E0B', '#EF4444']
    }
  ]
};

export const maintenanceStatusData = {
  labels: ['Completed', 'Scheduled', 'In Progress', 'Overdue'],
  datasets: [
    {
      label: 'Maintenance Status',
      data: [42, 28, 15, 15],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
    }
  ]
};