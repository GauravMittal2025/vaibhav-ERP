import React from 'react';
import { 
  Clock, 
  Calendar, 
  UserCheck, 
  UserMinus, 
  ArrowLeftRight,
  DollarSign,
  File 
} from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'check-in',
      user: 'Sarah Johnson',
      department: 'Engineering',
      time: '08:30 AM',
      icon: Clock,
      iconColor: 'bg-green-100 text-green-600',
    },
    {
      id: 2,
      type: 'leave-request',
      user: 'Michael Chen',
      department: 'Marketing',
      time: '09:15 AM',
      icon: Calendar,
      iconColor: 'bg-blue-100 text-blue-600',
    },
    {
      id: 3,
      type: 'check-out',
      user: 'Alex Rodriguez',
      department: 'Support',
      time: '05:45 PM',
      icon: Clock,
      iconColor: 'bg-amber-100 text-amber-600',
    },
    {
      id: 4,
      type: 'advance-request',
      user: 'Priya Patel',
      department: 'Finance',
      time: '11:30 AM',
      icon: DollarSign,
      iconColor: 'bg-purple-100 text-purple-600',
    },
    {
      id: 5,
      type: 'transfer',
      user: 'David Kim',
      department: 'HR',
      time: '02:00 PM',
      icon: ArrowLeftRight,
      iconColor: 'bg-indigo-100 text-indigo-600',
    },
    {
      id: 6,
      type: 'resignation',
      user: 'Emma Wilson',
      department: 'Sales',
      time: '03:45 PM',
      icon: UserMinus,
      iconColor: 'bg-red-100 text-red-600',
    },
  ];

  const getActivityText = (activity: typeof activities[0]) => {
    switch (activity.type) {
      case 'check-in':
        return 'checked in';
      case 'check-out':
        return 'checked out';
      case 'leave-request':
        return 'requested leave';
      case 'advance-request':
        return 'requested salary advance';
      case 'transfer':
        return 'requested department transfer';
      case 'resignation':
        return 'submitted resignation';
      default:
        return 'performed an action';
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <div className="flex gap-2">
          <select className="rounded-md border-gray-200 bg-gray-50 px-2 py-1 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500">
            <option>All Activities</option>
            <option>Attendance</option>
            <option>Requests</option>
            <option>HR Operations</option>
          </select>
          <select className="rounded-md border-gray-200 bg-gray-50 px-2 py-1 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500">
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <li key={activity.id} className="py-3">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${activity.iconColor}`}
                >
                  <activity.icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    <span className="font-semibold">{activity.user}</span> {getActivityText(activity)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.department} • {activity.time} • Today
                  </p>
                </div>
                <div className="ml-auto flex items-center">
                  {activity.type !== 'check-in' && activity.type !== 'check-out' && (
                    <button className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      Review
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          View All Activity
        </button>
      </div>
    </div>
  );
};