import React, { useState } from 'react';
import { 
  Calendar, Clock, Filter, Plus, Search, UserCheck, UserMinus, 
  Calendar as CalendarIcon, FileText, CheckCircle, XCircle, 
  AlertCircle, Users
} from 'lucide-react';
import { 
  Card, CardHeader, CardTitle, CardContent 
} from '../components/ui/attendanceCard';
import { Button } from '../components/ui/att_btn';
import { Badge } from '../components/ui/att_badge';
import { Avatar } from '../components/ui/Avatar';
import { format } from 'date-fns';

export const Attendance = () => {
  // Mock data
  const today = new Date();
  const currentDate = format(today, 'MMMM d, yyyy');
  const currentDay = format(today, 'EEEE');
  const currentTime = format(today, 'h:mm a');

  const [activeTab, setActiveTab] = useState<'daily' | 'leaves'>('daily');

  const attendanceStats = [
    { label: 'Present', value: 132, color: 'success' },
    { label: 'Absent', value: 8, color: 'error' },
    { label: 'Late', value: 12, color: 'warning' },
    { label: 'On Leave', value: 5, color: 'accent' },
  ];

  const employees = [
    {
      id: '1',
      name: 'John Doe',
      department: 'Production',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      status: 'present',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      name: 'Jane Smith',
      department: 'HR',
      checkIn: '09:05 AM',
      checkOut: '05:45 PM',
      status: 'late',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      department: 'Logistics',
      checkIn: '08:30 AM',
      checkOut: null,
      status: 'present',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '4',
      name: 'Emily Wilson',
      department: 'Accounting',
      checkIn: null,
      checkOut: null,
      status: 'absent',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '5',
      name: 'Robert Brown',
      department: 'IT',
      checkIn: null,
      checkOut: null,
      status: 'on-leave',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const leaveRequests = [
    {
      id: '1',
      employee: {
        name: 'Sarah Johnson',
        department: 'Marketing',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      type: 'Sick Leave',
      startDate: '2025-04-15',
      endDate: '2025-04-16',
      duration: '2 days',
      status: 'pending',
      reason: 'Medical appointment and recovery',
    },
    {
      id: '2',
      employee: {
        name: 'David Miller',
        department: 'Engineering',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      type: 'Annual Leave',
      startDate: '2025-05-10',
      endDate: '2025-05-17',
      duration: '8 days',
      status: 'approved',
      reason: 'Family vacation',
    },
    {
      id: '3',
      employee: {
        name: 'Lisa Thompson',
        department: 'Sales',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      type: 'Personal Leave',
      startDate: '2025-04-20',
      endDate: '2025-04-20',
      duration: '1 day',
      status: 'rejected',
      reason: 'Personal matters',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: string; label: string }> = {
      present: { variant: 'success', label: 'Present' },
      absent: { variant: 'error', label: 'Absent' },
      late: { variant: 'warning', label: 'Late' },
      'on-leave': { variant: 'accent', label: 'On Leave' },
      pending: { variant: 'warning', label: 'Pending' },
      approved: { variant: 'success', label: 'Approved' },
      rejected: { variant: 'error', label: 'Rejected' },
    };

    const { variant, label } = statusMap[status] || { variant: 'default', label: status };

    return <Badge variant={variant as any}>{label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      pending: <AlertCircle size={16} className="text-warning-500" />,
      approved: <CheckCircle size={16} className="text-success-500" />,
      rejected: <XCircle size={16} className="text-error-500" />,
    };

    return iconMap[status] || null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage employee attendance, leaves, and schedules
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" leftIcon={<Calendar size={16} />}>
            {currentDate}
          </Button>
          <Button variant="outline" leftIcon={<Clock size={16} />}>
            {currentTime}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {attendanceStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`rounded-full bg-${stat.color}-100 p-2 text-${stat.color}-600`}>
                  {stat.label === 'Present' ? (
                    <UserCheck size={20} />
                  ) : stat.label === 'Absent' ? (
                    <UserMinus size={20} />
                  ) : stat.label === 'Late' ? (
                    <Clock size={20} />
                  ) : (
                    <CalendarIcon size={20} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <CardTitle>Attendance Management</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex w-full max-w-xs items-center rounded-md border border-gray-300 bg-white px-3 py-1 sm:w-auto">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employee..."
                  className="ml-2 w-full border-0 bg-transparent p-1 text-sm focus:outline-none focus:ring-0"
                />
              </div>
              <Button variant="outline" leftIcon={<Filter size={16} />}>
                Filter
              </Button>
              <Button leftIcon={<Plus size={16} />}>Mark Attendance</Button>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4 border-t border-gray-200 pt-4">
            <button
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${
                activeTab === 'daily'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('daily')}
            >
              <UserCheck size={16} />
              Daily Attendance
            </button>
            <button
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${
                activeTab === 'leaves'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('leaves')}
            >
              <FileText size={16} />
              Leave Requests
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {activeTab === 'daily' ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">Employee</th>
                    <th className="table-header-cell">Department</th>
                    <th className="table-header-cell">Check In</th>
                    <th className="table-header-cell">Check Out</th>
                    <th className="table-header-cell">Status</th>
                    <th className="table-header-cell text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <Avatar src={employee.avatar} alt={employee.name} size="sm" />
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </td>
                      <td className="table-cell">{employee.department}</td>
                      <td className="table-cell">
                        {employee.checkIn || '-'}
                      </td>
                      <td className="table-cell">
                        {employee.checkOut || '-'}
                      </td>
                      <td className="table-cell">
                        {getStatusBadge(employee.status)}
                      </td>
                      <td className="table-cell text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">Employee</th>
                    <th className="table-header-cell">Type</th>
                    <th className="table-header-cell">Duration</th>
                    <th className="table-header-cell">Dates</th>
                    <th className="table-header-cell">Reason</th>
                    <th className="table-header-cell">Status</th>
                    <th className="table-header-cell text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <Avatar src={request.employee.avatar} alt={request.employee.name} size="sm" />
                          <div>
                            <div className="font-medium">{request.employee.name}</div>
                            <div className="text-xs text-gray-500">{request.employee.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">{request.type}</td>
                      <td className="table-cell">{request.duration}</td>
                      <td className="table-cell">
                        <div className="text-sm">
                          <div>{new Date(request.startDate).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">
                            to {new Date(request.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">{request.reason}</td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          {getStatusBadge(request.status)}
                        </div>
                      </td>
                      <td className="table-cell text-right">
                        <div className="flex justify-end gap-2">
                          {request.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="sm" className="text-success-600 hover:bg-success-50 hover:text-success-700">
                                Approve
                              </Button>
                              <Button variant="ghost" size="sm" className="text-error-600 hover:bg-error-50 hover:text-error-700">
                                Reject
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;