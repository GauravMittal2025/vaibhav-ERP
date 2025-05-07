import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, Users, ShoppingCart, DollarSign, Clipboard, BarChart2 } from 'lucide-react';

// Dashboard stat card component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeType }) => {
  const changeColor = 
    changeType === 'positive' ? 'text-green-600' : 
    changeType === 'negative' ? 'text-red-600' : 
    'text-gray-600';
  
  const changeIcon = 
    changeType === 'positive' ? '↑' : 
    changeType === 'negative' ? '↓' : 
    '';

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-50 rounded-md p-3">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <span className={`${changeColor} font-medium`}>
            {changeIcon} {change}
          </span>{' '}
          <span className="text-gray-500">from last month</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { auth } = useAuth();
  const { user } = auth;

  // Role-specific dashboard content
  const renderRoleSpecificContent = () => {
    if (user?.role === 'admin') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Users"
              value="1,254"
              icon={<Users className="h-6 w-6 text-blue-600" />}
              change="12%"
              changeType="positive"
            />
            <StatCard
              title="Revenue"
              value="$24,563"
              icon={<DollarSign className="h-6 w-6 text-blue-600" />}
              change="8.2%"
              changeType="positive"
            />
            <StatCard
              title="Active Projects"
              value="42"
              icon={<Clipboard className="h-6 w-6 text-blue-600" />}
              change="4.1%"
              changeType="positive"
            />
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">System Overview</h3>
              <div className="mt-5">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Server Status</h4>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-4 w-4 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-900">All systems operational</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Database</h4>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">95%</span> capacity
                    </p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-2 bg-blue-600 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">API Requests</h4>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">1.2M</span> requests today
                    </p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (user?.role === 'manager') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Team Members"
              value="12"
              icon={<Users className="h-6 w-6 text-blue-600" />}
              change="2"
              changeType="positive"
            />
            <StatCard
              title="Projects"
              value="8"
              icon={<Clipboard className="h-6 w-6 text-blue-600" />}
              change="1"
              changeType="positive"
            />
            <StatCard
              title="Tasks Completed"
              value="87"
              icon={<Activity className="h-6 w-6 text-blue-600" />}
              change="23%"
              changeType="positive"
            />
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Project Status</h3>
              <div className="mt-5 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">Website Redesign</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">Mobile App Development</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">On Track</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>40%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">API Integration</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Delayed</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Regular user dashboard
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <StatCard
              title="Tasks Assigned"
              value="5"
              icon={<Clipboard className="h-6 w-6 text-blue-600" />}
              change="2"
              changeType="positive"
            />
            <StatCard
              title="Completed Tasks"
              value="12"
              icon={<Activity className="h-6 w-6 text-blue-600" />}
              change="8"
              changeType="positive"
            />
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Your Tasks</h3>
              <div className="mt-5 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">Complete user testing</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Due in 2 days</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">Update documentation</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Urgent</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Due today</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">Review code PR #42</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">New</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Due in 3 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your account today.
        </p>
      </div>
      
      {renderRoleSpecificContent()}
    </>
  );
};

export default Dashboard;