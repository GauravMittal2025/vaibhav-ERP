import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  TruckIcon,
  Building2,
  PhoneCall,
  Mail
} from 'lucide-react';
import Button from '../../components/post-auth/ui/Button';
import Card from '../../components/post-auth/ui/omniCards/Card';
import Badge from '../../components/post-auth/ui/Badge';

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
  rating: number;
  lastOrder: Date;
}

const suppliersData: Supplier[] = [
  {
    id: 'SUP001',
    name: 'Tech Solutions Ltd',
    contactPerson: 'John Smith',
    email: 'john.smith@techsolutions.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Park, Silicon Valley, CA',
    category: 'Electronics',
    status: 'active',
    rating: 4.5,
    lastOrder: new Date('2023-09-10'),
  },
  {
    id: 'SUP002',
    name: 'Office Supplies Co',
    contactPerson: 'Sarah Chen',
    email: 'sarah.chen@officesupplies.com',
    phone: '+1 (555) 234-5678',
    address: '456 Business Ave, New York, NY',
    category: 'Office Supplies',
    status: 'active',
    rating: 4.8,
    lastOrder: new Date('2023-09-15'),
  },
  {
    id: 'SUP003',
    name: 'Industrial Equipment Inc',
    contactPerson: 'Mike Johnson',
    email: 'mike.j@industrialeq.com',
    phone: '+1 (555) 345-6789',
    address: '789 Industrial Blvd, Detroit, MI',
    category: 'Heavy Equipment',
    status: 'inactive',
    rating: 3.5,
    lastOrder: new Date('2023-08-20'),
  },
  {
    id: 'SUP004',
    name: 'Safety Gear Pro',
    contactPerson: 'Lisa Rodriguez',
    email: 'lisa@safetygear.com',
    phone: '+1 (555) 456-7890',
    address: '321 Safety Road, Houston, TX',
    category: 'Safety Equipment',
    status: 'active',
    rating: 4.2,
    lastOrder: new Date('2023-09-12'),
  },
  {
    id: 'SUP005',
    name: 'Maintenance Parts Ltd',
    contactPerson: 'David Lee',
    email: 'david@maintenanceparts.com',
    phone: '+1 (555) 567-8901',
    address: '654 Parts Lane, Chicago, IL',
    category: 'Maintenance',
    status: 'active',
    rating: 4.0,
    lastOrder: new Date('2023-09-08'),
  },
];

function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(suppliersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'all' || 
      supplier.status === statusFilter;
      
    const matchesCategory = 
      categoryFilter === 'all' || 
      supplier.category === categoryFilter;
      
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
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
  
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.0) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const categories = Array.from(new Set(suppliers.map(s => s.category)));
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Supplier Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your suppliers and track their performance
          </p>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          icon={<Plus size={18} />}
        >
          Add New Supplier
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-blue-100">
              <TruckIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Suppliers</p>
              <p className="text-2xl font-semibold text-gray-900">{suppliers.length}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-green-100">
              <Building2 size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Suppliers</p>
              <p className="text-2xl font-semibold text-gray-900">
                {suppliers.filter(s => s.status === 'active').length}
              </p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-amber-100">
              <PhoneCall size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <p className="text-2xl font-semibold text-gray-900">{categories.length}</p>
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
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                className="form-input pl-10 w-full md:w-64"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="md" 
              icon={<Filter size={16} />}
            >
              Filter
            </Button>
            <Button 
              variant="outline" 
              size="md" 
              icon={<Download size={16} />}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      
      {/* Suppliers list */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-md transition-shadow">
            <Card.Body>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{supplier.name}</h3>
                    <div className="flex gap-2">
                      {getStatusBadge(supplier.status)}
                      <Badge variant="secondary">{supplier.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Contact Person</p>
                      <p className="text-gray-600">{supplier.contactPerson}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-700">Contact Info</p>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={14} />
                        <a href={`mailto:${supplier.email}`} className="hover:text-blue-600">
                          {supplier.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <PhoneCall size={14} />
                        <a href={`tel:${supplier.phone}`} className="hover:text-blue-600">
                          {supplier.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="font-medium text-gray-700">Address</p>
                      <p className="text-gray-600">{supplier.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-sm mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-700">Rating:</span>
                      <span className={`font-semibold ${getRatingColor(supplier.rating)}`}>
                        {supplier.rating.toFixed(1)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Order:</span>
                      <span className="ml-2 text-gray-600">
                        {supplier.lastOrder.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
        
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No suppliers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Suppliers;