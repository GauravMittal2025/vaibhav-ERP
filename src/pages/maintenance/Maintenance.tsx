import { useState } from 'react';
import { 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  Filter,
  Search
} from 'lucide-react';
import Button from '../../components/post-auth/ui/Button';
import Card from '../../components/post-auth/ui/omniCards/Card';
import Badge from '../../components/post-auth/ui/Badge';

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  equipmentId: string;
  equipmentName: string;
  location: string;
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  scheduledDate: Date;
  completedDate?: Date;
}

const initialTasks: MaintenanceTask[] = [
  {
    id: 'MT001',
    title: 'HVAC System Inspection',
    description: 'Regular inspection of the HVAC system in the main warehouse',
    equipmentId: 'EQ023',
    equipmentName: 'HVAC System',
    location: 'Main Warehouse',
    assignedTo: 'John Smith',
    status: 'pending',
    priority: 'medium',
    scheduledDate: new Date('2023-09-22'),
  },
  {
    id: 'MT002',
    title: 'Forklift Repair',
    description: 'Repair hydraulic system failure on forklift #F-123',
    equipmentId: 'EQ056',
    equipmentName: 'Forklift #F-123',
    location: 'Loading Dock',
    assignedTo: 'Mike Johnson',
    status: 'in_progress',
    priority: 'high',
    scheduledDate: new Date('2023-09-18'),
  },
  {
    id: 'MT003',
    title: 'Printer Maintenance',
    description: 'Regular maintenance for office printer',
    equipmentId: 'EQ078',
    equipmentName: 'HP LaserJet Printer',
    location: 'Finance Department',
    assignedTo: 'Sarah Chen',
    status: 'completed',
    priority: 'low',
    scheduledDate: new Date('2023-09-15'),
    completedDate: new Date('2023-09-15'),
  },
  {
    id: 'MT004',
    title: 'Server Room Cooling Check',
    description: 'Inspect and test cooling systems in the server room',
    equipmentId: 'EQ089',
    equipmentName: 'Cooling System',
    location: 'Server Room',
    assignedTo: 'Amy Wilson',
    status: 'pending',
    priority: 'critical',
    scheduledDate: new Date('2023-09-20'),
  },
  {
    id: 'MT005',
    title: 'Conveyor Belt Adjustment',
    description: 'Adjust tension and alignment of conveyor belt system',
    equipmentId: 'EQ034',
    equipmentName: 'Conveyor Belt System',
    location: 'Shipping Area',
    assignedTo: 'John Smith',
    status: 'cancelled',
    priority: 'medium',
    scheduledDate: new Date('2023-09-10'),
  },
];

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

function Maintenance() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(initialTasks);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' || 
      filter === task.status || 
      (filter === 'active' && (task.status === 'pending' || task.status === 'in_progress'));
      
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesFilter && matchesSearch;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'in_progress':
        return <Badge variant="primary">In Progress</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="default">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="success">Low</Badge>;
      case 'medium':
        return <Badge variant="primary">Medium</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'critical':
        return <Badge variant="danger">Critical</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };
  
  const counts = {
    all: tasks.length,
    active: tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    cancelled: tasks.filter(t => t.status === 'cancelled').length,
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Maintenance Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Schedule and track equipment maintenance tasks
          </p>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          icon={<Plus size={18} />}
        >
          New Maintenance Task
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-blue-100">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">All Tasks</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.all}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-amber-100">
              <Clock size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.pending}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-purple-100">
              <AlertTriangle size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.in_progress}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-teal-100">
              <CheckCircle size={24} className="text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{counts.completed}</p>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Filter tabs and search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'all' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'active' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'pending' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'completed' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setFilter('completed')}
            >
              Completed
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
                placeholder="Search tasks..."
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
          </div>
        </div>
      </div>
      
      {/* Maintenance tasks list */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <Card.Body>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div>
                      <p className="font-medium text-gray-700">Equipment</p>
                      <p>{task.equipmentName}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Location</p>
                      <p>{task.location}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Assigned To</p>
                      <p>{task.assignedTo}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500 mb-4">
                    <p>
                      <span className="font-medium mr-1">Scheduled:</span> 
                      {task.scheduledDate.toLocaleDateString()}
                    </p>
                    {task.completedDate && (
                      <p>
                        <span className="font-medium mr-1">Completed:</span>
                        {task.completedDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      View Details
                    </Button>
                    {task.status !== 'completed' && task.status !== 'cancelled' && (
                      <Button 
                        variant="primary" 
                        size="sm"
                      >
                        Update Status
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No maintenance tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Maintenance;