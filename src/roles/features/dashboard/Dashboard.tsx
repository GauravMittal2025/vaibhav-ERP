import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, ShieldCheck, Clock, ArrowUpRight, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { roles } from '../../data/roles';
import { users } from '../../data/users';
import { activityLogs } from '../../data/activity';
import { timeAgo } from '../../utils/helpers';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRoles: 0,
    recentActivities: 0,
  });

  useEffect(() => {
    // Calculate dashboard stats
    setStats({
      totalUsers: users.length,
      activeUsers: users.filter(user => user.status === 'active').length,
      totalRoles: roles.length,
      recentActivities: activityLogs.length,
    });
  }, []);

  const StatCard = ({ title, value, icon, change }: { title: string; value: number; icon: React.ReactNode; change?: string }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            {change && (
              <div className="flex items-center mt-1 text-sm font-medium text-green-600">
                <ArrowUpRight size={16} className="mr-1" />
                {change}
              </div>
            )}
          </div>
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">Welcome to the Role Management System.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<Users size={24} />} 
          change="12% from last month"
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers} 
          icon={<Eye size={24} />} 
        />
        <StatCard 
          title="Total Roles" 
          value={stats.totalRoles} 
          icon={<ShieldCheck size={24} />} 
        />
        <StatCard 
          title="Recent Activities" 
          value={stats.recentActivities} 
          icon={<Clock size={24} />} 
          change="8 new today"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users size={18} className="mr-2 text-blue-600" />
              Recent Users
            </CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(0, 5).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 mr-2">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white">
                            {user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-gray-50 text-gray-700'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link 
                      to={`/users/${user.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-4 border-t border-gray-200">
            <Link 
              to="/users" 
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
            >
              View all users
              <ArrowUpRight size={14} className="ml-1" />
            </Link>
          </div>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock size={18} className="mr-2 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <div className="px-4 pb-4">
            <div className="space-y-4">
              {activityLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start">
                  <div className="relative mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500 absolute top-1 left-1"></div>
                    <div className="h-4 w-4 rounded-full border-2 border-blue-200"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{log.userName}</span>
                      {' '}
                      <span className="text-gray-500">
                        {log.action} a {log.resource}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{timeAgo(log.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <Link 
              to="/activity" 
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
            >
              View all activity
              <ArrowUpRight size={14} className="ml-1" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};