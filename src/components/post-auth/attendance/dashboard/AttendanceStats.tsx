import React from 'react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

export const AttendanceStats: React.FC = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Attendance Overview</h2>
        <div className="flex items-center gap-2">
          <button className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <ArrowLeft size={16} />
          </button>
          <span className="text-sm font-medium">November 2025</span>
          <button className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="mb-4 flex">
        <div className="flex w-full items-center gap-2 rounded-lg bg-blue-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-600">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">This Month</h3>
            <p className="text-lg font-semibold text-gray-900">95.7% Attendance Rate</p>
          </div>
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="h-64 w-full">
        {/* This would be a real chart component in a full implementation */}
        <div className="flex h-full w-full flex-col justify-end">
          <div className="grid grid-cols-7 gap-2">
            {[88, 92, 95, 90, 96, 94, 97].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-full rounded-t-sm bg-blue-600" 
                  style={{ height: `${value * 0.6}%` }}
                ></div>
                <span className="mt-2 text-xs font-medium text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <span className="text-xs text-gray-500">Last Week</span>
            <span className="text-xs font-medium text-blue-600">Average: 93.1%</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600"></span>
          <span className="text-xs text-gray-500">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-amber-500"></span>
          <span className="text-xs text-gray-500">Late</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="text-xs text-gray-500">Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
          <span className="text-xs text-gray-500">Leave</span>
        </div>
      </div>
    </div>
  );
};