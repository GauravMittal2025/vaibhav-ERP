import React, { useState } from 'react';
import { Plus, Filter, Check, X, Clock, AlertTriangle } from 'lucide-react';
import { LeaveRequestsTab } from '../../components/post-auth/requests/LeaveRequestsTab';
import { ShiftChangeTab } from '../../components/post-auth/requests/ShiftChangeTab';
import { AdvancesTab } from '../../components/post-auth/requests/AdvancesTab';
import { ResignationsTab } from '../../components/post-auth/requests/ResignationsTab';

const RequestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leave' | 'shift' | 'advance' | 'resignation'>('leave');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Requests Management</h1>
        
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
            <Plus size={16} />
            New Request
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-800">
              <Clock size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
              <p className="text-2xl font-semibold text-gray-900">18</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-500">
            <span>Requires your attention</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <AlertTriangle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Urgent</h3>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-500">
            <span>Needs immediate review</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-800">
              <Check size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Approved</h3>
              <p className="text-2xl font-semibold text-gray-900">42</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500">
            <span>This month so far</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
              <X size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
              <p className="text-2xl font-semibold text-gray-900">7</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-500">
            <span>This month so far</span>
          </div>
        </div>
      </div>

      {/* Request Tabs */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('leave')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'leave'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Leave Requests
            </button>
            <button
              onClick={() => setActiveTab('shift')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'shift'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Shift Changes
            </button>
            <button
              onClick={() => setActiveTab('advance')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'advance'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Advances
            </button>
            <button
              onClick={() => setActiveTab('resignation')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'resignation'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Resignations
            </button>
          </nav>
        </div>

        <div className="p-4">
          {activeTab === 'leave' && <LeaveRequestsTab />}
          {activeTab === 'shift' && <ShiftChangeTab />}
          {activeTab === 'advance' && <AdvancesTab />}
          {activeTab === 'resignation' && <ResignationsTab />}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;