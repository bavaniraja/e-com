import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { downloadInvoice, printInvoice } from '../../../utils/invoiceGenerator';
import dataService from '../../../services/dataService';

const OrderHistory = ({ orders }) => {
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders?.filter(order => order?.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'Shipped':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Processing':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleDownloadInvoice = (order) => {
    try {
      const settings = dataService.getSettings();
      downloadInvoice(order, user, settings);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  const handlePrintInvoice = (order) => {
    try {
      const settings = dataService.getSettings();
      printInvoice(order, user, settings);
    } catch (error) {
      console.error('Error printing invoice:', error);
      alert('Failed to print invoice. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Order History
        </h1>
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="font-body text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {statusOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders?.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading font-semibold text-foreground mb-2">
              No orders found
            </h3>
            <p className="font-body text-muted-foreground mb-4">
              {filterStatus === 'all' ? "You haven't placed any orders yet." : `No orders with status"${filterStatus}" found.`
              }
            </p>
            <Button variant="default">
              Start Shopping
            </Button>
          </div>
        ) : (
          filteredOrders?.map((order) => (
            <div key={order?.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="p-4 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-body font-semibold text-foreground">
                        Order #{order?.orderNumber}
                      </h3>
                      <p className="font-caption text-sm text-muted-foreground">
                        Placed on {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : order?.date} • {order?.items?.length} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-data font-semibold text-foreground">
                        ₹{order?.total?.toFixed(2)}
                      </p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium border ${getStatusColor(order?.status)}`}>
                        {order?.status}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleOrderExpansion(order?.id)}
                      className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                    >
                      <Icon 
                        name={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-muted-foreground"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {expandedOrder === order?.id && (
                <div className="p-4 space-y-4">
                  {/* Items */}
                  <div>
                    <h4 className="font-body font-medium text-foreground mb-3">
                      Order Items
                    </h4>
                    <div className="space-y-3">
                      {order?.items?.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item?.image}
                              alt={item?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-body font-medium text-foreground truncate">
                              {item?.name}
                            </h5>
                            <p className="font-caption text-sm text-muted-foreground">
                              {item?.variant} • Qty: {item?.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-data font-semibold text-foreground">
                              ₹{(item?.price * item?.quantity)?.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-body font-medium text-foreground mb-2">
                        Shipping Address
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="font-body text-sm text-foreground">
                          {order?.shippingAddress?.name}
                        </p>
                        <p className="font-caption text-sm text-muted-foreground">
                          {order?.shippingAddress?.street}
                        </p>
                        <p className="font-caption text-sm text-muted-foreground">
                          {order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.pincode}
                        </p>
                        <p className="font-caption text-sm text-muted-foreground">
                          {order?.shippingAddress?.phone}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-body font-medium text-foreground mb-2">
                        Order Summary
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between font-caption text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-data">₹{order?.subtotal?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-caption text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="font-data">
                            {order?.shipping === 0 ? 'Free' : `₹${order?.shipping?.toFixed(2)}`}
                          </span>
                        </div>
                        {order?.discount > 0 && (
                          <div className="flex justify-between font-caption text-sm">
                            <span className="text-muted-foreground">Discount</span>
                            <span className="font-data text-success">-₹{order?.discount?.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-body font-semibold pt-2 border-t border-border">
                          <span>Total</span>
                          <span className="font-data">₹{order?.total?.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Info */}
                  {order?.trackingNumber && (
                    <div>
                      <h4 className="font-body font-medium text-foreground mb-2">
                        Tracking Information
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="font-caption text-sm text-muted-foreground mb-1">
                          Tracking Number
                        </p>
                        <p className="font-data font-medium text-foreground">
                          {order?.trackingNumber}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {order?.status === 'Delivered' && (
                      <Button variant="default" size="sm">
                        Reorder
                      </Button>
                    )}
                    {(order?.status === 'Processing' || order?.status === 'Shipped') && (
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    )}
                    {order?.status === 'Processing' && (
                      <Button variant="destructive" size="sm">
                        Cancel Order
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadInvoice(order)}
                    >
                      Download Invoice
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePrintInvoice(order)}
                    >
                      Print Invoice
                    </Button>
                    {order?.status === 'Delivered' && (
                      <Button variant="outline" size="sm">
                        Return/Exchange
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;