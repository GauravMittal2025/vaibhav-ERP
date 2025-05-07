import React from 'react';
import { DollarSign, ShoppingCart, Package, AlertTriangle, PenTool as Tool, ClipboardList, Activity, Clock, BarChart2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import StatCard from '../components/post-auth/dashboard/StatCard';
import ChartCard from '../components/post-auth/dashboard/ChartCard';
import Card from '../components/post-auth/ui/Card';
import ActivityItem from '../components/post-auth/dashboard/ActivityItem';
import { formatCurrency } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const { dashboardStats } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm">
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Last month</option>
            <option>This quarter</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Revenue"
          value={formatCurrency(dashboardStats.totalRevenue)}
          icon={<DollarSign size={20} />}
          change={dashboardStats.revenueChange}
          changeLabel="from last period"
          color="blue"
        />
        <StatCard
          title="Orders"
          value={dashboardStats.totalOrders}
          icon={<ShoppingCart size={20} />}
          change={dashboardStats.ordersChange}
          changeLabel="from last period"
          color="purple"
        />
        <StatCard
          title="Inventory Value"
          value={formatCurrency(dashboardStats.inventoryValue)}
          icon={<Package size={20} />}
          color="green"
        />
        <StatCard
          title="Low Stock Items"
          value={dashboardStats.lowStockItems}
          icon={<AlertTriangle size={20} />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Revenue Trends"
          subtitle="Last 6 months"
          icon={<BarChart2 size={20} />}
        >
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Chart visualization would go here</p>
          </div>
        </ChartCard>
        <ChartCard
          title="Order Activity"
          subtitle="Last 6 months"
          icon={<ShoppingCart size={20} />}
        >
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Chart visualization would go here</p>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="Maintenance Tasks"
          subtitle="Recently scheduled tasks"
          icon={<Tool size={20} />}
          className="lg:col-span-1"
        >
          <div className="space-y-4">
            <ActivityItem
              title="HVAC System Inspection"
              description="Annual HVAC system inspection scheduled"
              timestamp="2 days ago"
              icon={<Clock size={16} />}
              status="info"
            />
            <ActivityItem
              title="Forklift #3 Repair"
              description="Hydraulic lift system repair in progress"
              timestamp="1 day ago"
              icon={<Tool size={16} />}
              status="warning"
            />
            <ActivityItem
              title="Production Line A Maintenance"
              description="Quarterly maintenance scheduled"
              timestamp="5 hours ago"
              icon={<Clock size={16} />}
              status="info"
            />
          </div>
        </Card>

        <Card
          title="Recent Orders"
          subtitle="Latest customer orders"
          icon={<ShoppingCart size={20} />}
          className="lg:col-span-1"
        >
          <div className="space-y-4">
            <ActivityItem
              title="Acme Corporation"
              description="$6,749.90 - 5 Laptops, 5 Mice"
              timestamp="Today"
              icon={<ShoppingCart size={16} />}
              status="success"
            />
            <ActivityItem
              title="TechStart Solutions"
              description="$4,749.85 - 10 Chairs, 5 Desks"
              timestamp="2 days ago"
              icon={<ShoppingCart size={16} />}
              status="success"
            />
            <ActivityItem
              title="Global Services Ltd"
              description="$3,149.83 - 2 Laptops, 5 Mice, 10 Ink"
              timestamp="3 days ago"
              icon={<ShoppingCart size={16} />}
              status="warning"
            />
          </div>
        </Card>

        <Card
          title="Work Orders"
          subtitle="Recently created work orders"
          icon={<ClipboardList size={20} />}
          className="lg:col-span-1"
        >
          <div className="space-y-4">
            <ActivityItem
              title="Office Renovation - Phase 1"
              description="Install new partitions and workstations"
              timestamp="2 weeks ago"
              icon={<Activity size={16} />}
              status="warning"
            />
            <ActivityItem
              title="Production Line A Upgrade"
              description="Install new control system software"
              timestamp="1 week ago"
              icon={<Activity size={16} />}
              status="danger"
            />
            <ActivityItem
              title="Warehouse Lighting Replacement"
              description="Replace old fluorescent lights with LED lighting"
              timestamp="3 days ago"
              icon={<Activity size={16} />}
              status="warning"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;