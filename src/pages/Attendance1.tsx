import React, { useState } from 'react';
import { Check, Clock, Filter, UserPlus, X } from 'lucide-react';
import { FaceRecognition } from '../components/attendance/FaceRecognition';
import { AttendanceTable } from '../components/attendance/AttendanceTable';
import { AttendanceCalendar } from '../components/attendance/AttendanceCalendar';

const AttendancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'history' | 'calendar'>('today');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100">
            <Clock size={16} />
            Today's Report
          </button>
          <button className="flex items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
            <UserPlus size={16} />
            Manual Entry
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Present Today</h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800">
              <Check size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">231</p>
          <p className="mt-1 text-sm text-gray-500">
            <span className="text-green-600">+12</span> from yesterday
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Absent Today</h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-800">
              <X size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">16</p>
          <p className="mt-1 text-sm text-gray-500">
            <span className="text-red-600">+3</span> from yesterday
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">On Leave</h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800">
              <Clock size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">8</p>
          <p className="mt-1 text-sm text-gray-500">
            Approved leaves for today
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Late Arrivals</h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <Clock size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">17</p>
          <p className="mt-1 text-sm text-gray-500">
            <span className="text-amber-600">-4</span> from yesterday
          </p>
        </div>
      </div>

      {/* Face Recognition for Attendance */}
      <div className="rounded-lg bg-white p-6 shadow">
        <FaceRecognition />
      </div>

      {/* Attendance Tabs */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'today'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Today's Attendance
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'history'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Attendance History
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'calendar'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Calendar View
            </button>
          </nav>
        </div>

        <div className="p-4">
          {activeTab === 'today' && <AttendanceTable />}
          {activeTab === 'history' && <AttendanceTable isHistory={true} />}
          {activeTab === 'calendar' && <AttendanceCalendar />}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;