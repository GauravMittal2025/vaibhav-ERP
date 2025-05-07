import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Search, 
  SlidersHorizontal, 
  Check, 
  X, 
  Clock 
} from 'lucide-react';

interface AttendanceTableProps {
  isHistory?: boolean;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ isHistory = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock attendance data
  const attendanceData = [
    {
      id: 1,
      name: 'Alex Johnson',
      empId: 'EMP-1024',
      department: 'Engineering',
      date: '2025-11-01',
      checkIn: '08:45',
      checkOut: '17:30',
      status: 'present',
      hours: '8.75',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      empId: 'EMP-1032',
      department: 'Marketing',
      date: '2025-11-01',
      checkIn: '09:10',
      checkOut: '18:15',
      status: 'late',
      hours: '9.08',
    },
    {
      id: 3,
      name: 'Michael Chen',
      empId: 'EMP-1018',
      department: 'Design',
      date: '2025-11-01',
      checkIn: '08:30',
      checkOut: '17:00',
      status: 'present',
      hours: '8.5',
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      empId: 'EMP-1045',
      department: 'HR',
      date: '2025-11-01',
      checkIn: '-',
      checkOut: '-',
      status: 'absent',
      hours: '0',
    },
    {
      id: 5,
      name: 'David Kim',
      empId: 'EMP-1029',
      department: 'Finance',
      date: '2025-11-01',
      checkIn: '-',
      checkOut: '-',
      status: 'leave',
      hours: '0',
    },
    {
      id: 6,
      name: 'Lisa Parker',
      empId: 'EMP-1037',
      department: 'Engineering',
      date: '2025-11-01',
      checkIn: '08:55',
      checkOut: '17:45',
      status: 'present',
      hours: '8.83',
    },
    {
      id: 7,
      name: 'James Wilson',
      empId: 'EMP-1022',
      department: 'Sales',
      date: '2025-11-01',
      checkIn: '09:20',
      checkOut: '18:20',
      status: 'late',
      hours: '9.0',
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            <Check size={12} />
            Present
          </span>
        );
      case 'absent':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
            <X size={12} />
            Absent
          </span>
        );
      case 'late':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            <Clock size={12} />
            Late
          </span>
        );
      case 'leave':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            <Clock size={12} />
            On Leave
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-medium text-gray-900">
          {isHistory ? 'Attendance History' : 'Today\'s Attendance'}
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {isHistory && (
            <div className="relative flex-1 sm:max-w-xs">
              <input
                type="date"
                className="w-full rounded-md border-gray-300 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                defaultValue="2025-11-01"
              />
            </div>
          )}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full rounded-md border-gray-300 pl-10 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <SlidersHorizontal size={14} />
            Filter
          </button>
          <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Employee
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Department
              </th>
              {isHistory && (
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
              )}
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Check In
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Check Out
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Hours
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {attendanceData.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100">
                      <div className="flex h-full w-full items-center justify-center font-medium text-gray-600">
                        {entry.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{entry.name}</p>
                      <p className="text-xs text-gray-500">{entry.empId}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  {entry.department}
                </td>
                {isHistory && (
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                )}
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  {entry.checkIn}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  {entry.checkOut}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm">
                  {getStatusBadge(entry.status)}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  {entry.hours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of <span className="font-medium">247</span> results
        </div>
        
        <div className="flex gap-1">
          <button
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft size={16} />
          </button>
          <button className="inline-flex items-center rounded-md border border-blue-500 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
            1
          </button>
          <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50">
            2
          </button>
          <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50">
            3
          </button>
          <button
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};