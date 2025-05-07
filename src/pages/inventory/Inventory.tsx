import { useState } from 'react';
import { Plus, FileText, BarChart2, Truck } from 'lucide-react';
import Button from '../../components/post-auth/ui/Button';
import Card from '../../components/post-auth/ui/omniCards/Card';
import InventoryTable from '../../components/post-auth/inventory/InventoryTable';

// Sample inventory data
const inventoryItems = [
  {
    id: 'INV001',
    name: 'Printer Ink Cartridge',
    category: 'Office Supplies',
    stockLevel: 5,
    status: 'Low Stock',
    location: 'Shelf A3',
    lastUpdated: new Date('2023-09-10'),
  },
  {
    id: 'INV002',
    name: 'Laptop Dell XPS 13',
    category: 'Electronics',
    stockLevel: 12,
    status: 'In Stock',
    location: 'Storage Room B',
    lastUpdated: new Date('2023-09-05'),
  },
  {
    id: 'INV003',
    name: 'Safety Helmets',
    category: 'Safety Equipment',
    stockLevel: 28,
    status: 'In Stock',
    location: 'Warehouse C2',
    lastUpdated: new Date('2023-09-15'),
  },
  {
    id: 'INV004',
    name: 'Network Switches',
    category: 'IT Equipment',
    stockLevel: 0,
    status: 'Out of Stock',
    location: 'IT Storage',
    lastUpdated: new Date('2023-09-01'),
  },
  {
    id: 'INV005',
    name: 'Office Chairs',
    category: 'Furniture',
    stockLevel: 8,
    status: 'In Stock',
    location: 'Warehouse A1',
    lastUpdated: new Date('2023-09-12'),
  },
  {
    id: 'INV006',
    name: 'Hand Sanitizer (1L)',
    category: 'Health & Safety',
    stockLevel: 3,
    status: 'Low Stock',
    location: 'Medical Cabinet',
    lastUpdated: new Date('2023-09-14'),
  },
  {
    id: 'INV007',
    name: 'Laser Printer',
    category: 'Electronics',
    stockLevel: 4,
    status: 'In Stock',
    location: 'IT Storage',
    lastUpdated: new Date('2023-09-07'),
  },
  {
    id: 'INV008',
    name: 'Whiteboard Markers',
    category: 'Office Supplies',
    stockLevel: 0,
    status: 'Out of Stock',
    location: 'Shelf B2',
    lastUpdated: new Date('2023-09-03'),
  },
];

function Inventory() {
  const [items, setItems] = useState(inventoryItems);
  
  const handleEdit = (id: string) => {
    // In a real app, this would open a modal or navigate to edit page
    alert(`Edit item with ID: ${id}`);
  };
  
  const handleDelete = (id: string) => {
    // In a real app, this would show a confirmation dialog first
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your inventory items, stock levels, and locations
          </p>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          icon={<Plus size={18} />}
        >
          Add New Item
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-blue-100">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Items</p>
              <p className="text-2xl font-semibold text-gray-900">248</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-amber-100">
              <BarChart2 size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-semibold text-gray-900">14</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-teal-100">
              <Truck size={24} className="text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Orders</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Inventory table */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-medium text-gray-900">Inventory Items</h2>
        </Card.Header>
        <Card.Body>
          <InventoryTable 
            items={items} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Inventory;