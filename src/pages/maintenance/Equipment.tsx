import React, { useState } from 'react';
import { Wrench, Search, PlusCircle, Filter, ArrowDown, ArrowUp, AlertTriangle, PenTool as Tool } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from '../../components/post-auth/ui/Button';
import Card from '../../components/post-auth/ui/Card';
import Badge from '../../components/post-auth/ui/Badge';
import { formatDate } from '../../utils/formatters';

const Equipment: React.FC = () => {
  const { equipment } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const filteredEquipment = equipment
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      }
      return 0;
    });

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge variant="success">Operational</Badge>;
      case 'maintenance':
        return <Badge variant="warning">Maintenance</Badge>;
      case 'broken':
        return <Badge variant="danger">Broken</Badge>;
      case 'retired':
        return <Badge variant="secondary">Retired</Badge>;
      default:
        return <Badge variant="info">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Equipment Management</h1>
        <Button 
          icon={<PlusCircle size={16} />}
          variant="primary"
        >
          Add New Equipment
        </Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search equipment..."
            />
          </div>
          <Button 
            icon={<Filter size={16} />}
            variant="outline"
          >
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <div className="inline-block min-w-full align-middle px-4 sm:px-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('name')}
                  >
                    <div className="flex items-center">
                      <span>Equipment</span>
                      <span className="ml-1">{getSortIcon('name')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('type')}
                  >
                    <div className="flex items-center">
                      <span>Type</span>
                      <span className="ml-1">{getSortIcon('type')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('department')}
                  >
                    <div className="flex items-center">
                      <span>Department</span>
                      <span className="ml-1">{getSortIcon('department')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('lastMaintenance')}
                  >
                    <div className="flex items-center">
                      <span>Last Maintenance</span>
                      <span className="ml-1">{getSortIcon('lastMaintenance')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('status')}
                  >
                    <div className="flex items-center">
                      <span>Status</span>
                      <span className="ml-1">{getSortIcon('status')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                          <Wrench size={20} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">Model: {item.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.lastMaintenance)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900 mr-2">View</button>
                      <button className="text-teal-600 hover:text-teal-900">
                        <Tool size={16} className="inline mr-1" />
                        Maintenance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredEquipment.length === 0 && (
              <div className="text-center py-10">
                <Wrench size={40} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No equipment found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Equipment;