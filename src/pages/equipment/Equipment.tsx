import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Boxes, 
  AlertOctagon, 
  Settings, 
  CheckSquare
} from 'lucide-react';
import Button from '../../components/post-auth/ui/Button';
import Card from '../../components/post-auth/ui/omniCards/Card';
import Badge from '../../components/post-auth/ui/Badge';

interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  serialNumber: string;
  location: string;
  status: 'operational' | 'maintenance' | 'out_of_service' | 'repair';
  lastInspection: Date;
  nextMaintenance: Date;
  purchaseDate: Date;
  notes: string;
}

const equipmentData: Equipment[] = [
  {
    id: 'EQ001',
    name: 'Forklift #F-123',
    type: 'Material Handling',
    model: 'Toyota 8FGCU25',
    serialNumber: 'TYT-8FGCU25-12345',
    location: 'Warehouse A - Loading Dock',
    status: 'operational',
    lastInspection: new Date('2023-08-15'),
    nextMaintenance: new Date('2023-10-15'),
    purchaseDate: new Date('2021-05-10'),
    notes: 'Regular maintenance performed on schedule.',
  },
  {
    id: 'EQ002',
    name: 'HVAC System',
    type: 'Facility Equipment',
    model: 'Carrier 48TC',
    serialNumber: 'CAR-48TC-67890',
    location: 'Main Warehouse',
    status: 'maintenance',
    lastInspection: new Date('2023-07-05'),
    nextMaintenance: new Date('2023-09-20'),
    purchaseDate: new Date('2020-03-12'),
    notes: 'Scheduled for filter replacement and general check.',
  },
  {
    id: 'EQ003',
    name: 'Server Rack #SR-01',
    type: 'IT Equipment',
    model: 'Dell PowerEdge R740',
    serialNumber: 'DELL-R740-54321',
    location: 'Server Room',
    status: 'operational',
    lastInspection: new Date('2023-09-01'),
    nextMaintenance: new Date('2023-12-01'),
    purchaseDate: new Date('2022-01-20'),
    notes: 'Running at optimal performance.',
  },
  {
    id: 'EQ004',
    name: 'Conveyor Belt System',
    type: 'Production Equipment',
    model: 'Dematic Roller Conveyor',
    serialNumber: 'DEM-RC-98765',
    location: 'Shipping Area',
    status: 'repair',
    lastInspection: new Date('2023-08-30'),
    nextMaintenance: new Date('2023-09-10'),
    purchaseDate: new Date('2019-11-05'),
    notes: 'Motor issue detected. Scheduled for repair.',
  },
  {
    id: 'EQ005',
    name: 'Industrial Printer',
    type: 'Office Equipment',
    model: 'HP LaserJet Enterprise M507x',
    serialNumber: 'HP-M507X-24680',
    location: 'Shipping Office',
    status: 'out_of_service',
    lastInspection: new Date('2023-07-20'),
    nextMaintenance: new Date('2023-09-15'),
    purchaseDate: new Date('2020-10-15'),
    notes: 'Paper feed mechanism broken. Awaiting replacement parts.',
  },
  {
    id: 'EQ006',
    name: 'Pallet Jack #PJ-22',
    type: 'Material Handling',
    model: 'Crown PTH50',
    serialNumber: 'CRW-PTH50-13579',
    location: 'Warehouse B',
    status: 'operational',
    lastInspection: new Date('2023-08-10'),
    nextMaintenance: new Date('2023-11-10'),
    purchaseDate: new Date('2022-04-18'),
    notes: 'New wheels installed during last maintenance.',
  },
];

function Equipment() {
  const [equipment, setEquipment] = useState<Equipment[]>(equipmentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'all' || 
      item.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge variant="success">Operational</Badge>;
      case 'maintenance':
        return <Badge variant="warning">Maintenance</Badge>;
      case 'repair':
        return <Badge variant="primary">Repair</Badge>;
      case 'out_of_service':
        return <Badge variant="danger">Out of Service</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const counts = {
    all: equipment.length,
    operational: equipment.filter(e => e.status === 'operational').length,
    maintenance: equipment.filter(e => e.status === 'maintenance').length,
    repair: equipment.filter(e => e.status === 'repair').length,
    out_of_service: equipment.filter(e => e.status === 'out_of_service').length,
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Equipment Asset Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track, monitor, and maintain your equipment assets
          </p>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          icon={<Plus size={18} />}
        >
          Add New Equipment
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-blue-100">
              <Boxes size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Assets</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.all}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-green-100">
              <CheckSquare size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Operational</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.operational}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-amber-100">
              <Settings size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Maintenance/Repair</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.maintenance + counts.repair}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-red-100">
              <AlertOctagon size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Out of Service</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.out_of_service}</p>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                statusFilter === 'all' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setStatusFilter('all')}
            >
              All Equipment
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                statusFilter === 'operational' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setStatusFilter('operational')}
            >
              Operational
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                statusFilter === 'maintenance' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setStatusFilter('maintenance')}
            >
              Maintenance
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                statusFilter === 'repair' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setStatusFilter('repair')}
            >
              Repair
            </button>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                className="form-input pl-10 w-full md:w-64"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
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
      </div>
      
      {/* Equipment list */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEquipment.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <Card.Body>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    {getStatusBadge(item.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 mb-2">
                    <div>
                      <p className="font-medium text-gray-700">Type</p>
                      <p>{item.type}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Model</p>
                      <p>{item.model}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Location</p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div>
                      <p className="font-medium text-gray-700">Serial Number</p>
                      <p>{item.serialNumber}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Last Inspection</p>
                      <p>{item.lastInspection.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Next Maintenance</p>
                      <p className={`${
                        item.nextMaintenance < new Date() ? 'text-red-600 font-medium' : ''
                      }`}>
                        {item.nextMaintenance.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500 mb-4">
                    <p>
                      <span className="font-medium mr-1">Purchase Date:</span> 
                      {item.purchaseDate.toLocaleDateString()}
                    </p>
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
                      Maintenance History
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
        
        {filteredEquipment.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No equipment found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Equipment;