import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Search, 
  SlidersHorizontal, 
  Check, 
  X, 
  Clock,
  AlertTriangle
} from 'lucide-react';

export const LeaveRequestsTab: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock leave requests data
  const leaveRequests = [
    {
      id: 1,
      employee: 'Sarah Williams',
      empId: 'EMP-1032',
      department: 'Marketing',
      type: 'Annual Leave',
      fromDate: '2025-11-15',
      toDate: '2025-11-22',
      days: 5,
      reason: 'Family vacation',
      status: 'pending',
      urgent: true,
    },
    {
      id: 2,
      employee: 'Michael Chen',
      empId: 'EMP-1018',
      department: 'Design',
      type: 'Sick Leave',
      fromDate: '2025-11-10',
      toDate: '2025-11-12',
      days: 3,
      reason: 'Flu',
      status: 'approved',
      urgent: false,
    },
    {
      id: 3,
      employee: 'Alex Johnson',
      empId: 'EMP-1024',
      department: 'Engineering',
      type: 'Annual Leave',
      fromDate: '2025-11-25',
      toDate: '2025-11-29',
      days: 5,
      reason: 'Personal time',
      status: 'pending',
      urgent: false,
    },
    {
      id: 4,
      employee: 'Emily Rodriguez',
      empId: 'EMP-1045',
      department: 'HR',
      type: 'Maternity Leave',
      fromDate: '2025-12-01',
      toDate: '2026-03-01',
      days: 90,
      reason: 'Maternity',
      status: 'approved',
      urgent: false,
    },
    {
      id: 5,
      employee: 'David Kim',
      empId: 'EMP-1029',
      department: 'Finance',
      type: 'Sick Leave',
      fromDate: '2025-11-08',
      toDate: '2025-11-08',
      days: 1,
      reason: 'Doctor appointment',
      status: 'rejected',
      urgent: false,
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            <Check size={12} />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
            <X size={12} />
            Rejected
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            <Clock size={12} />
            Pending
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
          Leave Requests
        </h3>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
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
                Leave Type
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Period
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Days
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Reason
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leaveRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100">
                      <div className="flex h-full w-full items-center justify-center font-medium text-gray-600">
                        {request.employee.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-medium text-gray-900">{request.employee}</p>
                        {request.urgent && (
                          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-red-500" title="Urgent"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{request.department}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                    {request.type}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  {new Date(request.fromDate).toLocaleDateString()} to {new Date(request.toDate).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  {request.days}
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">
                  <div className="max-w-xs truncate">{request.reason}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm">
                  {getStatusBadge(request.status)}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm">
                  <div className="flex gap-2">
                    {request.status === 'pending' && (
                      <>
                        <button className="rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700">
                          Approve
                        </button>
                        <button className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700">
                          Reject
                        </button>
                      </>
                    )}
                    <button className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> results
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