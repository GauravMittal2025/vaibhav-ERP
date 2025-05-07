import React from 'react';
import { Calendar, Clock, Users, FileText, AlertTriangle, BarChart3 } from 'lucide-react';
import { AttendanceStats } from '../../components/post-auth/attendance/dashboard/AttendanceStats';
import { RecentActivity } from '../../components/post-auth/attendance/dashboard/RecentActivity';
import { RequestsOverview } from '../../components/post-auth/attendance/dashboard/RequestsOverview';

const Overview: React.FC = () => {
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1 text-blue-800">
          <Clock size={16} />
          <span className="text-sm font-medium">Today: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-800">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
              <p className="text-2xl font-semibold text-gray-900">247</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <span>+12 this month</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-800">
              <Clock size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Today's Attendance</h3>
              <p className="text-2xl font-semibold text-gray-900">231 / 247</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <span>93.5% Present</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <Calendar size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
              <p className="text-2xl font-semibold text-gray-900">18</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-500">
            <span>8 require urgent attention</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
              <AlertTriangle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Absent Today</h3>
              <p className="text-2xl font-semibold text-gray-900">16</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-500">
            <span>6.5% of workforce</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Attendance Chart */}
        <div className="lg:col-span-2">
          <AttendanceStats />
        </div>

        {/* Requests Overview */}
        <div>
          <RequestsOverview />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <RecentActivity />
      </div>
    </div>
  );
};

export default Overview;