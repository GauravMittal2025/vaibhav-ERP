import React from 'react';
import { UserMinus, Search, SlidersHorizontal, Check, X, Clock } from 'lucide-react';

export const ResignationsTab: React.FC = () => {
  // Mock resignation requests
  const resignationRequests = [
    {
      id: 1,
      employee: 'Emma Wilson',
      department: 'Sales',
      submitDate: '2025-11-02',
      lastWorkingDay: '2025-12-02',
      reason: 'Better opportunity elsewhere',
      noticePeriod: '30 days',
      status: 'pending'
    },
    {
      id: 2,
      employee: 'James Rodriguez',
      department: 'Engineering',
      submitDate: '2025-10-15',
      lastWorkingDay: '2025-11-15',
      reason: 'Relocation',
      noticePeriod: '30 days',
      status: 'approved'
    },
    {
      id: 3,
      employee: 'Lisa Chen',
      department: 'Marketing',
      submitDate: '2025-10-20',
      lastWorkingDay: '2025-11-03',
      reason: 'Personal reasons',
      noticePeriod: '14 days',
      status: 'rejected'
    }
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
          Resignation Requests
        </h3>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resignations..."
              className="w-full rounded-md border-gray-300 pl-10 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <SlidersHorizontal size={14} />
            Filter
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
                Submit Date
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Last Working Day
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Notice Period
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
            {resignationRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100">
                      <div className="flex h-full w-full items-center justify-center font-medium text-gray-600">
                        {request.employee.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{request.employee}</p>
                      <p className="text-xs text-gray-500">{request.department}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  {new Date(request.submitDate).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  {new Date(request.lastWorkingDay).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-600">
                  {request.noticePeriod}
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
    </div>
  );
};