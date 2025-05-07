import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const RequestsOverview: React.FC = () => {
  const requests = [
    { type: 'Leave Request', count: 12, color: 'bg-blue-500' },
    { type: 'Permission', count: 8, color: 'bg-green-500' },
    { type: 'Shift Change', count: 5, color: 'bg-amber-500' },
    { type: 'Advance', count: 3, color: 'bg-purple-500' },
    { type: 'Resignation', count: 2, color: 'bg-red-500' },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Pending Requests</h2>
        <a
          href="/requests"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View all
          <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="mt-6 space-y-4">
        {requests.map((request, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${request.color}`}></span>
              <span className="text-sm font-medium text-gray-700">{request.type}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-900">{request.count}</span>
              <span className="ml-1 text-xs text-gray-500">pending</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-gray-500">
          <span>By Department</span>
          <span>Count</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-3/5 rounded-full bg-blue-500"></div>
            </div>
            <span className="ml-2 text-xs font-medium">Engineering (18)</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-2/5 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2 text-xs font-medium">HR (12)</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-1/5 rounded-full bg-amber-500"></div>
            </div>
            <span className="ml-2 text-xs font-medium">Sales (6)</span>
          </div>
        </div>
      </div>
    </div>
  );
};