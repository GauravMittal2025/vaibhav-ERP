import React, { useState } from 'react';
import {
  Box, Filter, Package, Plus, Search, ShoppingCart, AlertCircle,
  TrendingDown, TrendingUp, Download, BarChart3, Clipboard, RefreshCw
} from 'lucide-react';
import {
  Card, CardHeader, CardTitle, CardContent,
} from '../../components/post-auth/ui/Card';
import { Button } from '../../components/post-auth/ui/Button';
import { Badge } from '../../components/post-auth/ui/Badge';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const Inventory = () => {
  const [activeTab, setActiveTab] = useState<'items' | 'transactions'>('items');

  // Mock data
  const inventoryStats = [
    { label: 'Total Items', value: 1254, icon: <Package size={20} /> },
    { label: 'Low Stock Items', value: 28, icon: <AlertCircle size={20} />, trend: { value: 12, isPositive: false } },
    { label: 'Inward Today', value: 156, icon: <TrendingUp size={20} />, trend: { value: 8, isPositive: true } },
    { label: 'Outward Today', value: 89, icon: <TrendingDown size={20} />, trend: { value: 5, isPositive: true } },
  ];

  const inventoryItems = [
    {
      id: '1',
      name: 'Raw Material A',
      category: 'Raw Materials',
      sku: 'RM-A-001',
      quantity: 450,
      unit: 'kg',
      price: 12.5,
      supplier: 'Supplier Co.',
      location: 'Warehouse A',
      status: 'in-stock',
    },
    {
      id: '2',
      name: 'Component B',
      category: 'Components',
      sku: 'CMP-B-002',
      quantity: 230,
      unit: 'pcs',
      price: 8.75,
      supplier: 'Parts Ltd.',
      location: 'Warehouse B',
      status: 'in-stock',
    },
    {
      id: '3',
      name: 'Packaging Material C',
      category: 'Packaging',
      sku: 'PKG-C-003',
      quantity: 12,
      unit: 'boxes',
      price: 5.25,
      supplier: 'PackCo',
      location: 'Warehouse A',
      status: 'low-stock',
    },
    {
      id: '4',
      name: 'Finished Product D',
      category: 'Finished Goods',
      sku: 'FG-D-004',
      quantity: 78,
      unit: 'pcs',
      price: 45.99,
      supplier: 'Self',
      location: 'Warehouse C',
      status: 'in-stock',
    },
    {
      id: '5',
      name: 'Chemical E',
      category: 'Chemicals',
      sku: 'CHM-E-005',
      quantity: 8,
      unit: 'liters',
      price: 32.75,
      supplier: 'ChemSupply',
      location: 'Warehouse B',
      status: 'low-stock',
    },
  ];

  const transactions = [
    {
      id: '1',
      date: '2025-04-10',
      time: '09:30 AM',
      type: 'inward',
      item: 'Raw Material A',
      quantity: 200,
      unit: 'kg',
      performedBy: 'John Doe',
      reference: 'PO-2025-042',
    },
    {
      id: '2',
      date: '2025-04-10',
      time: '11:45 AM',
      type: 'outward',
      item: 'Component B',
      quantity: 50,
      unit: 'pcs',
      performedBy: 'Sarah Johnson',
      reference: 'PRD-2025-098',
    },
    {
      id: '3',
      date: '2025-04-09',
      time: '03:15 PM',
      type: 'inward',
      item: 'Packaging Material C',
      quantity: 15,
      unit: 'boxes',
      performedBy: 'Robert Brown',
      reference: 'PO-2025-041',
    },
    {
      id: '4',
      date: '2025-04-09',
      time: '04:30 PM',
      type: 'adjustment',
      item: 'Chemical E',
      quantity: -2,
      unit: 'liters',
      performedBy: 'Emily Wilson',
      reference: 'ADJ-2025-012',
    },
    {
      id: '5',
      date: '2025-04-08',
      time: '10:00 AM',
      type: 'outward',
      item: 'Finished Product D',
      quantity: 25,
      unit: 'pcs',
      performedBy: 'Mike Johnson',
      reference: 'SO-2025-076',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: string; label: string }> = {
      'in-stock': { variant: 'success', label: 'In Stock' },
      'low-stock': { variant: 'warning', label: 'Low Stock' },
      'out-of-stock': { variant: 'error', label: 'Out of Stock' },
      'inward': { variant: 'success', label: 'Inward' },
      'outward': { variant: 'primary', label: 'Outward' },
      'adjustment': { variant: 'secondary', label: 'Adjustment' },
    };

    const { variant, label } = statusMap[status] || { variant: 'default', label: status };

    return <Badge variant={variant as any}>{label}</Badge>;
  };

  const inventoryTrendOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#4F46E5', '#10B981', '#F59E0B'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
        },
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
    },
    grid: {
      borderColor: '#F1F5F9',
      strokeDashArray: 4,
    },
    markers: {
      size: 4,
      strokeWidth: 0,
      hover: {
        size: 6,
      },
    },
  };

  const inventoryTrendSeries = [
    {
      name: 'Raw Materials',
      data: [400, 430, 448, 470, 540, 580, 620],
    },
    {
      name: 'Components',
      data: [350, 340, 360, 380, 400, 390, 420],
    },
    {
      name: 'Finished Goods',
      data: [250, 280, 300, 340, 380, 400, 450],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage inventory items, track stock levels, and monitor movements
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Export
          </Button>
          <Button leftIcon={<Plus size={16} />}>Add Item</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {inventoryStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                  {stat.trend && (
                    <div className="mt-1 flex items-center gap-1 text-xs">
                      <span
                        className={
                          stat.trend.isPositive === (stat.label !== 'Low Stock Items')
                            ? 'text-success-600'
                            : 'text-error-600'
                        }
                      >
                        {stat.trend.isPositive ? (
                          <TrendingUp size={12} className="inline mr-1" />
                        ) : (
                          <TrendingDown size={12} className="inline mr-1" />
                        )}
                        {stat.trend.value}%
                      </span>
                      <span className="text-gray-500">from last month</span>
                    </div>
                  )}
                </div>
                <div
                  className={`rounded-full ${
                    stat.label === 'Low Stock Items'
                      ? 'bg-warning-100 text-warning-600'
                      : stat.label === 'Inward Today'
                      ? 'bg-success-100 text-success-600'
                      : stat.label === 'Outward Today'
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-secondary-100 text-secondary-600'
                  } p-3`}
                >
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="border-b border-gray-200 px-6 py-4">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <CardTitle>Inventory Items</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex w-full max-w-xs items-center rounded-md border border-gray-300 bg-white px-3 py-1 sm:w-auto">
                  <Search size={18} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="ml-2 w-full border-0 bg-transparent p-1 text-sm focus:outline-none focus:ring-0"
                  />
                </div>
                <Button variant="outline" leftIcon={<Filter size={16} />}>
                  Filter
                </Button>
                <Button leftIcon={<RefreshCw size={16} />}>Sync</Button>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-4 border-t border-gray-200 pt-4">
              <button
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === 'items'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('items')}
              >
                <Box size={16} />
                Inventory Items
              </button>
              <button
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === 'transactions'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('transactions')}
              >
                <Clipboard size={16} />
                Transactions
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {activeTab === 'items' ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">Item</th>
                      <th className="table-header-cell">SKU</th>
                      <th className="table-header-cell">Category</th>
                      <th className="table-header-cell">Quantity</th>
                      <th className="table-header-cell">Price</th>
                      <th className="table-header-cell">Status</th>
                      <th className="table-header-cell">Location</th>
                      <th className="table-header-cell text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {inventoryItems.map((item) => (
                      <tr key={item.id} className="table-row">
                        <td className="table-cell font-medium">{item.name}</td>
                        <td className="table-cell">{item.sku}</td>
                        <td className="table-cell">{item.category}</td>
                        <td className="table-cell">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="table-cell">${item.price.toFixed(2)}</td>
                        <td className="table-cell">{getStatusBadge(item.status)}</td>
                        <td className="table-cell">{item.location}</td>
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
                      <th className="table-header-cell">Date & Time</th>
                      <th className="table-header-cell">Type</th>
                      <th className="table-header-cell">Item</th>
                      <th className="table-header-cell">Quantity</th>
                      <th className="table-header-cell">Performed By</th>
                      <th className="table-header-cell">Reference</th>
                      <th className="table-header-cell text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="table-row">
                        <td className="table-cell">
                          <div className="text-sm">
                            <div>{new Date(transaction.date).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">{transaction.time}</div>
                          </div>
                        </td>
                        <td className="table-cell">{getStatusBadge(transaction.type)}</td>
                        <td className="table-cell font-medium">{transaction.item}</td>
                        <td className="table-cell">
                          <span
                            className={
                              transaction.type === 'outward' || transaction.quantity < 0
                                ? 'text-error-600'
                                : 'text-success-600'
                            }
                          >
                            {transaction.type === 'outward' || transaction.quantity < 0 ? '-' : '+'}
                            {Math.abs(transaction.quantity)} {transaction.unit}
                          </span>
                        </td>
                        <td className="table-cell">{transaction.performedBy}</td>
                        <td className="table-cell">
                          <span className="text-xs font-medium uppercase tracking-wider text-gray-800">
                            {transaction.reference}
                          </span>
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
            <CardTitle>Inventory Trend</CardTitle>
            <Button variant="outline" size="sm" leftIcon={<BarChart3 size={16} />}>
              Reports
            </Button>
          </CardHeader>
          <CardContent className="px-2 pt-6">
            <Chart
              options={inventoryTrendOptions}
              series={inventoryTrendSeries}
              type="line"
              height={350}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;