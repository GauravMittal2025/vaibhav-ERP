import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Filter, 
  ArrowDown, ArrowUp, Truck, PackageCheck, 
  PackageX, CreditCard 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from '../../components/post-auth/ui/Button';
import Card from '../../components/post-auth/ui/Card';
import Badge from '../../components/post-auth/ui/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const Orders: React.FC = () => {
  const { orders, customers } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('orderDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

  const filteredOrders = orders
    .filter(order => {
      const customerName = getCustomerName(order.customer).toLowerCase();
      return customerName.includes(searchTerm.toLowerCase()) ||
             order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
             order.status.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortField === 'orderDate') {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'total') {
        return sortDirection === 'asc' ? a.total - b.total : b.total - a.total;
      } else if (sortField === 'customer') {
        const customerA = getCustomerName(a.customer);
        const customerB = getCustomerName(b.customer);
        return sortDirection === 'asc' 
          ? customerA.localeCompare(customerB) 
          : customerB.localeCompare(customerA);
      } else if (sortField === 'status') {
        return sortDirection === 'asc' 
          ? a.status.localeCompare(b.status) 
          : b.status.localeCompare(a.status);
      }
      return 0;
    });

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="info">Pending</Badge>;
      case 'processing':
        return <Badge variant="primary">Processing</Badge>;
      case 'shipped':
        return <Badge variant="warning">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'refunded':
        return <Badge variant="info">Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ShoppingCart size={16} className="text-blue-500" />;
      case 'processing':
        return <PackageCheck size={16} className="text-blue-500" />;
      case 'shipped':
        return <Truck size={16} className="text-amber-500" />;
      case 'delivered':
        return <PackageCheck size={16} className="text-green-500" />;
      case 'cancelled':
        return <PackageX size={16} className="text-red-500" />;
      default:
        return <ShoppingCart size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <Button 
          icon={<ShoppingCart size={16} />}
          variant="primary"
        >
          New Order
        </Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search orders..."
            />
          </div>
          <Button 
            icon={<Filter size={16} />}
            variant="outline"
          >
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <div className="inline-block min-w-full align-middle px-4 sm:px-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('customer')}
                  >
                    <div className="flex items-center">
                      <span>Customer</span>
                      <span className="ml-1">{getSortIcon('customer')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('orderDate')}
                  >
                    <div className="flex items-center">
                      <span>Date</span>
                      <span className="ml-1">{getSortIcon('orderDate')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('status')}
                  >
                    <div className="flex items-center">
                      <span>Status</span>
                      <span className="ml-1">{getSortIcon('status')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('total')}
                  >
                    <div className="flex items-center">
                      <span>Total</span>
                      <span className="ml-1">{getSortIcon('total')}</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getCustomerName(order.customer)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStatusIcon(order.status)}
                        <span className="ml-2">
                          {renderStatusBadge(order.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CreditCard size={16} className="text-gray-500 mr-2" />
                        {renderPaymentStatusBadge(order.paymentStatus)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-10">
                <ShoppingCart size={40} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Orders;