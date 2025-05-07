import React from 'react';
import {
  Users, Package, Calendar, TrendingUp, Truck, ClipboardList,
  BoxesIcon, Building2, Layers, ListChecks, UsersRound, FileBarChart,
  MessageCircle
} from 'lucide-react';
import { StatsCard } from '../../components/post-auth/dashboard/stats-card';
import { ModuleCard } from '../../components/post-auth/dashboard/module-card';
import { ChartCard } from '../../components/post-auth/dashboard/chart-card';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const Dashboard = () => {
  const attendanceChartOptions: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#4F46E5', '#10B981'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
      markers: {
        radius: 12,
      },
    },
    grid: {
      borderColor: '#F1F5F9',
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  const attendanceSeries = [
    {
      name: 'Present',
      data: [76, 85, 90, 92, 88, 60, 0],
    },
    {
      name: 'Absent',
      data: [24, 15, 10, 8, 12, 40, 0],
    },
  ];

  const inventoryChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    colors: ['#4F46E5', '#F59E0B', '#10B981'],
    xaxis: {
      categories: ['Raw Materials', 'Work in Progress', 'Finished Goods', 'Packaging', 'Spare Parts'],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Units',
        style: {
          color: '#64748B',
        },
      },
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
    },
    grid: {
      borderColor: '#F1F5F9',
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} units`,
      },
    },
  };

  const inventorySeries = [
    {
      name: 'Current Stock',
      data: [430, 230, 320, 180, 150],
    },
    {
      name: 'Reorder Level',
      data: [200, 100, 150, 100, 50],
    },
    {
      name: 'Optimal Level',
      data: [500, 300, 350, 200, 180],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back to your ERP system.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value="152"
          icon={<Users size={24} />}
          trend={{ value: 2.5, isPositive: true }}
        />
        <StatsCard
          title="Inventory Items"
          value="1,254"
          icon={<Package size={24} />}
          trend={{ value: 1.8, isPositive: true }}
        />
        <StatsCard
          title="Today's Attendance"
          value="92%"
          icon={<Calendar size={24} />}
          trend={{ value: 4.2, isPositive: true }}
        />
        <StatsCard
          title="Production Efficiency"
          value="87%"
          icon={<TrendingUp size={24} />}
          trend={{ value: 1.3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Weekly Attendance">
          <Chart 
            options={attendanceChartOptions} 
            series={attendanceSeries} 
            type="area" 
            height={320} 
          />
        </ChartCard>
        <ChartCard title="Inventory Status">
          <Chart 
            options={inventoryChartOptions} 
            series={inventorySeries} 
            type="bar" 
            height={320} 
          />
        </ChartCard>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-medium text-gray-900">Modules</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ModuleCard
            title="Attendance Management"
            description="Track employee attendance, manage shifts, and handle leave requests."
            icon={<Calendar size={24} />}
            href="/attendance"
            color="primary"
            badge={{ text: "2 Approvals" }}
          />
          <ModuleCard
            title="Inventory Management"
            description="Monitor stock levels, manage items, and track inventory movements."
            icon={<Package size={24} />}
            href="/inventory"
            color="secondary"
            badge={{ text: "3 Low Stock", variant: "warning" }}
          />
          <ModuleCard
            title="Unloading Management"
            description="Schedule and monitor unloading operations and dock assignments."
            icon={<BoxesIcon size={24} />}
            href="/unloading"
            color="accent"
          />
          <ModuleCard
            title="Store & Maintenance"
            description="Track store operations and manage maintenance requests and schedules."
            icon={<Building2 size={24} />}
            href="/store"
            color="primary"
          />
          <ModuleCard
            title="Production Management"
            description="Plan and monitor production activities, workflows, and outputs."
            icon={<Layers size={24} />}
            href="/production"
            color="secondary"
          />
          <ModuleCard
            title="Task Sheets"
            description="Create and assign task sheets to track work completion and progress."
            icon={<ListChecks size={24} />}
            href="/tasks"
            color="accent"
            badge={{ text: "5 Due Today", variant: "error" }}
          />
          <ModuleCard
            title="Logistics Management"
            description="Coordinate shipments, track deliveries, and manage transportation."
            icon={<Truck size={24} />}
            href="/logistics"
            color="success"
          />
          <ModuleCard
            title="Materials & Brokers"
            description="Manage suppliers, brokers, and keep track of raw materials."
            icon={<ClipboardList size={24} />}
            href="/materials"
            color="warning"
          />
          <ModuleCard
            title="Visitor Management"
            description="Register visitors, track appointments, and manage security passes."
            icon={<UsersRound size={24} />}
            href="/visitors"
            color="error"
          />
          <ModuleCard
            title="Reports"
            description="Generate, schedule, and analyze reports across all modules."
            icon={<FileBarChart size={24} />}
            href="/reports"
            color="primary"
          />
          <ModuleCard
            title="WhatsApp Notifications"
            description="Configure and send automated notifications via WhatsApp."
            icon={<MessageCircle size={24} />}
            href="/notifications"
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;