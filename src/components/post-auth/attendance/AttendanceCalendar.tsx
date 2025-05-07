import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

export const AttendanceCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(10); // 0-based, 10 = November
  const [currentYear, setCurrentYear] = useState(2025);
  
  // Generate calendar days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Mock attendance data for the month
  const attendanceData: Record<number, string> = {
    1: 'present',
    2: 'present',
    3: 'present',
    4: 'weekend',
    5: 'weekend',
    6: 'present',
    7: 'present',
    8: 'present',
    9: 'present',
    10: 'present',
    11: 'weekend',
    12: 'weekend',
    13: 'present',
    14: 'late',
    15: 'present',
    16: 'leave',
    17: 'leave',
    18: 'weekend',
    19: 'weekend',
    20: 'leave',
    21: 'present',
    22: 'present',
    23: 'present',
    24: 'present',
    25: 'weekend',
    26: 'weekend',
    27: 'present',
    28: 'absent',
    29: 'present',
    30: 'present',
  };
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'absent':
        return 'bg-red-500';
      case 'late':
        return 'bg-amber-500';
      case 'leave':
        return 'bg-blue-500';
      case 'weekend':
        return 'bg-gray-300';
      default:
        return 'bg-gray-200';
    }
  };
  
  const getDayClass = (day: number) => {
    const status = attendanceData[day] || 'unknown';
    const isToday = day === 1; // For demo purposes, let's assume day 1 is today
    
    let baseClass = "relative h-12 border border-gray-200 p-1";
    
    if (isToday) {
      baseClass += " bg-blue-50 font-bold";
    }
    
    return baseClass;
  };
  
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Generate calendar grid
  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="border border-gray-100 bg-gray-50 p-1"></div>);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const status = attendanceData[day] || 'unknown';
    days.push(
      <div key={day} className={getDayClass(day)}>
        <div className="flex justify-between">
          <span className="text-sm">{day}</span>
          {status !== 'weekend' && status !== 'unknown' && (
            <span className={`inline-block h-2 w-2 rounded-full ${getStatusColor(status)}`}></span>
          )}
        </div>
        {status !== 'weekend' && status !== 'unknown' && (
          <div className="mt-1 text-xs capitalize text-gray-600">{status}</div>
        )}
      </div>
    );
  }
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousMonth}
            className="rounded-md border border-gray-300 p-1 text-gray-600 hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-medium text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={handleNextMonth}
            className="rounded-md border border-gray-300 p-1 text-gray-600 hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex gap-2">
          <select className="rounded-md border-gray-300 py-1 pl-3 pr-10 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500">
            <option>All Employees</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
          </select>
          <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>
      
      {/* Calendar Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
          <span className="text-xs text-gray-600">Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-amber-500"></span>
          <span className="text-xs text-gray-600">Late</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-red-500"></span>
          <span className="text-xs text-gray-600">Absent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
          <span className="text-xs text-gray-600">Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-gray-300"></span>
          <span className="text-xs text-gray-600">Weekend/Holiday</span>
        </div>
      </div>
      
      {/* Calendar */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {dayNames.map((day, index) => (
            <div key={day} className={`p-2 text-center text-sm font-medium text-gray-700 ${index === 0 || index === 6 ? 'text-red-600' : ''}`}>
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days}
        </div>
      </div>
      
      {/* Monthly Summary */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="text-sm font-medium text-gray-500">Present Days</h4>
          <p className="mt-1 text-2xl font-semibold text-gray-900">18</p>
          <p className="mt-1 text-xs text-gray-500">Out of 22 working days</p>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="text-sm font-medium text-gray-500">Late Days</h4>
          <p className="mt-1 text-2xl font-semibold text-amber-600">1</p>
          <p className="mt-1 text-xs text-gray-500">Average delay: 25 mins</p>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="text-sm font-medium text-gray-500">Absent Days</h4>
          <p className="mt-1 text-2xl font-semibold text-red-600">1</p>
          <p className="mt-1 text-xs text-gray-500">4.5% of working days</p>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="text-sm font-medium text-gray-500">Leave Days</h4>
          <p className="mt-1 text-2xl font-semibold text-blue-600">4</p>
          <p className="mt-1 text-xs text-gray-500">3 approved, 1 sick leave</p>
        </div>
      </div>
    </div>
  );
};