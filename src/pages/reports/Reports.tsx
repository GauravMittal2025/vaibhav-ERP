import { useState } from 'react';
import { 
  BarChart2, 
  Calendar, 
  Download, 
  FileText, 
  Filter,
  Printer
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import Button from '../../components/post-auth/ui/Button';
import Card from '../../components/post-auth/ui/omniCards/Card';

// Sample data
const inventoryData = [
  { name: 'Electronics', value: 120 },
  { name: 'Furniture', value: 45 },
  { name: 'Office Supplies', value: 78 },
  { name: 'Safety Equipment', value: 34 },
  { name: 'IT Equipment', value: 56 },
];

const maintenanceData = [
  { name: 'Jan', completed: 42, scheduled: 45 },
  { name: 'Feb', completed: 38, scheduled: 40 },
  { name: 'Mar', completed: 45, scheduled: 50 },
  { name: 'Apr', completed: 40, scheduled: 42 },
  { name: 'May', completed: 35, scheduled: 40 },
  { name: 'Jun', completed: 48, scheduled: 52 },
  { name: 'Jul', completed: 50, scheduled: 55 },
  { name: 'Aug', completed: 55, scheduled: 60 },
  { name: 'Sep', completed: 40, scheduled: 48 },
];

const equipmentStatusData = [
  { name: 'Operational', value: 180 },
  { name: 'Maintenance', value: 25 },
  { name: 'Repair', value: 15 },
  { name: 'Out of Service', value: 8 },
];

const equipmentAgeData = [
  { name: '<1 year', count: 42 },
  { name: '1-2 years', count: 78 },
  { name: '2-3 years', count: 56 },
  { name: '3-5 years', count: 34 },
  { name: '>5 years', count: 18 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const reportOptions = [
  { id: 'inventory', name: 'Inventory Status' },
  { id: 'maintenance', name: 'Maintenance Performance' },
  { id: 'equipment', name: 'Equipment Status' },
  { id: 'age', name: 'Equipment Age Distribution' },
  { id: 'failures', name: 'Common Failure Points' },
  { id: 'costs', name: 'Maintenance Costs' },
];

function Reports() {
  const [selectedReport, setSelectedReport] = useState('inventory');
  const [dateRange, setDateRange] = useState('month');
  
  // Function to render the selected report chart
  const renderChart = () => {
    switch (selectedReport) {
      case 'inventory':
        return (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'maintenance':
        return (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={maintenanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="scheduled" fill="#0088FE" name="Scheduled" />
                <Bar dataKey="completed" fill="#00C49F" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'equipment':
        return (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={equipmentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {equipmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} units`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'age':
        return (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={equipmentAgeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Equipment Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Select a report to view</p>
          </div>
        );
    }
  };
  
  // Get report title
  const getReportTitle = () => {
    const report = reportOptions.find(r => r.id === selectedReport);
    return report ? report.name : 'Report';
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate insights and analytics about your operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="md" 
            icon={<Printer size={16} />}
          >
            Print
          </Button>
          <Button 
            variant="primary" 
            size="md" 
            icon={<Download size={16} />}
          >
            Export
          </Button>
        </div>
      </div>
      
      {/* Report options */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="col-span-1">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-medium text-gray-900">Report Types</h2>
            </Card.Header>
            <div className="p-4">
              <ul className="space-y-2">
                {reportOptions.map((option) => (
                  <li key={option.id}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedReport === option.id 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedReport(option.id)}
                    >
                      {option.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          
          <Card className="mt-4">
            <Card.Header>
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            </Card.Header>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select 
                  className="form-input w-full" 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              {dateRange === 'custom' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input type="date" className="form-input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input type="date" className="form-input w-full" />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select className="form-input w-full">
                  <option value="all">All Locations</option>
                  <option value="warehouse-a">Warehouse A</option>
                  <option value="warehouse-b">Warehouse B</option>
                  <option value="office">Main Office</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select className="form-input w-full">
                  <option value="all">All Departments</option>
                  <option value="operations">Operations</option>
                  <option value="it">IT</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="logistics">Logistics</option>
                </select>
              </div>
              
              <Button 
                variant="primary" 
                size="sm" 
                fullWidth
                icon={<Filter size={16} />}
              >
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="col-span-1 md:col-span-3">
          <Card>
            <Card.Header className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">{getReportTitle()}</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1" />
                <span>Data for: {dateRange === 'month' ? 'Last Month' : dateRange === 'week' ? 'Last Week' : dateRange === 'quarter' ? 'Last Quarter' : 'Last Year'}</span>
              </div>
            </Card.Header>
            <Card.Body>
              {renderChart()}
            </Card.Body>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-medium text-gray-900">Summary</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  {selectedReport === 'inventory' && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Inventory Items</p>
                        <p className="text-xl font-semibold text-gray-900">333</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Categories</p>
                        <p className="text-xl font-semibold text-gray-900">5</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                        <p className="text-xl font-semibold text-gray-900">14</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Out of Stock Items</p>
                        <p className="text-xl font-semibold text-gray-900">6</p>
                      </div>
                    </>
                  )}
                  
                  {selectedReport === 'maintenance' && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Maintenance Tasks</p>
                        <p className="text-xl font-semibold text-gray-900">432</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                        <p className="text-xl font-semibold text-gray-900">93%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Average Response Time</p>
                        <p className="text-xl font-semibold text-gray-900">1.2 days</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Average Completion Time</p>
                        <p className="text-xl font-semibold text-gray-900">3.5 days</p>
                      </div>
                    </>
                  )}
                  
                  {selectedReport === 'equipment' && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Equipment</p>
                        <p className="text-xl font-semibold text-gray-900">228</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Operational Rate</p>
                        <p className="text-xl font-semibold text-gray-900">78.9%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Equipment Types</p>
                        <p className="text-xl font-semibold text-gray-900">12</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Average Age</p>
                        <p className="text-xl font-semibold text-gray-900">2.7 years</p>
                      </div>
                    </>
                  )}
                  
                  {selectedReport === 'age' && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Newest Equipment</p>
                        <p className="text-xl font-semibold text-gray-900">42 units</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Oldest Equipment</p>
                        <p className="text-xl font-semibold text-gray-900">18 units</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Average Lifespan</p>
                        <p className="text-xl font-semibold text-gray-900">4.2 years</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Replacement Due</p>
                        <p className="text-xl font-semibold text-gray-900">12 units</p>
                      </div>
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Header>
                <h3 className="text-lg font-medium text-gray-900">Insights</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  {selectedReport === 'inventory' && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Electronic items make up the largest category</p>
                        <p className="text-sm text-gray-600">36% of your inventory is electronic equipment.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-600">Low stock alert for safety equipment</p>
                        <p className="text-sm text-gray-600">Safety equipment is running low with only 34 items in stock.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-600">Furniture inventory is stable</p>
                        <p className="text-sm text-gray-600">No stock issues detected in the furniture category.</p>
                      </div>
                    </>
                  )}
                  
                  {selectedReport === 'maintenance' && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Maintenance completion rate is improving</p>
                        <p className="text-sm text-gray-600">Completion rate has increased by 8% compared to the previous period.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-600">March had the largest gap in completion</p>
                        <p className="text-sm text-gray-600">March showed a 5-task difference between scheduled and completed maintenance.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-600">August had the highest completion rate</p>
                        <p className="text-sm text-gray-600">91.7% of scheduled maintenance tasks were completed in August.</p>
                      </div>
                    </>
                  )}
                  
                  {selectedReport === 'equipment' && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Most equipment is operational</p>
                        <p className="text-sm text-gray-600">78.9% of equipment is fully operational without issues.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-600">Maintenance backlog detected</p>
                        <p className="text-sm text-gray-600">11% of equipment is awaiting scheduled maintenance.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-600">Critical equipment out of service</p>
                        <p className="text-sm text-gray-600">3.5% of equipment is out of service, including some critical assets.</p>
                      </div>
                    </>
                  )}
                  
                  {selectedReport === 'age' && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Balanced age distribution</p>
                        <p className="text-sm text-gray-600">Equipment ages are well-distributed, indicating a healthy replacement cycle.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-600">Aging equipment needs attention</p>
                        <p className="text-sm text-gray-600">18 units are over 5 years old and may need replacement soon.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-600">Recent investments show</p>
                        <p className="text-sm text-gray-600">42 units are less than a year old, showing investment in new equipment.</p>
                      </div>
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
          
          <Card className="mt-6">
            <Card.Header>
              <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
            </Card.Header>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Generated By
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Monthly Inventory Report
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Inventory
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Sep 15, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      John Smith
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<FileText size={14} />}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Q3 Maintenance Analysis
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Maintenance
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Sep 10, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Sarah Chen
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<FileText size={14} />}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Equipment Status Report
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Equipment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Sep 05, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Mike Johnson
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<FileText size={14} />}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Reports;