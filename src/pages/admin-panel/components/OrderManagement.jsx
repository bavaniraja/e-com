
import React, { useState, useEffect } from 'react';
import { Search, Eye, Package, Truck, CheckCircle, Download, Printer } from 'lucide-react';
import dataService from '../../../services/dataService';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { downloadInvoice, printInvoice } from '../../../utils/invoiceGenerator';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    const allOrders = dataService.getOrders();
    setOrders(allOrders);
    setLoading(false);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toString().includes(searchTerm) ||
                         order.shippingAddress?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    dataService.updateOrder(orderId, { status: newStatus });
    loadOrders();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Package className="w-4 h-4 text-warning" />;
      case 'processing':
        return <Package className="w-4 h-4 text-primary" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-primary" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Package className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'processing':
        return 'text-primary bg-primary/10';
      case 'shipped':
        return 'text-primary bg-primary/10';
      case 'delivered':
        return 'text-success bg-success/10';
      case 'cancelled':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const handleDownloadInvoice = (order) => {
    try {
      const settings = dataService.getSettings();
      const customer = dataService.getUser(order.userId) || { 
        name: order.customerName, 
        email: order.customerEmail, 
        phone: order.customerPhone 
      };
      downloadInvoice(order, customer, settings);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  const handlePrintInvoice = (order) => {
    try {
      const settings = dataService.getSettings();
      const customer = dataService.getUser(order.userId) || { 
        name: order.customerName, 
        email: order.customerEmail, 
        phone: order.customerPhone 
      };
      printInvoice(order, customer, settings);
    } catch (error) {
      console.error('Error printing invoice:', error);
      alert('Failed to print invoice. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Order Management</h1>
        <p className="text-muted-foreground">Track and manage customer orders</p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">#{order.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.items?.length} item(s)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {order.shippingAddress?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.shippingAddress?.city}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">₹{order.total}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {order.paymentMethod}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="text-xs px-2 py-1 rounded border border-border bg-background"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => handleDownloadInvoice(order)}
                        className="p-1 text-primary hover:text-primary/80 transition-colors"
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrintInvoice(order)}
                        className="p-1 text-primary hover:text-primary/80 transition-colors"
                        title="Print Invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
