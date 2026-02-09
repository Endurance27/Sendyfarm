import React, { useState } from 'react';
import { Order } from '../App';
import { Package, Clock, CheckCircle, Calendar, Mail, Phone, DollarSign, Search } from 'lucide-react';

interface BuyerDashboardProps {
  orders: Order[];
  onBack: () => void;
  customerEmail?: string;
}

export function BuyerDashboard({ orders, onBack, customerEmail: initialEmail }: BuyerDashboardProps) {
  const [emailFilter, setEmailFilter] = useState(initialEmail || '');
  const [showEmailInput, setShowEmailInput] = useState(!initialEmail);

  // Filter orders by customer email
  const customerOrders = emailFilter 
    ? orders.filter(order => order.email.toLowerCase() === emailFilter.toLowerCase())
    : [];

  const pendingOrders = customerOrders.filter(o => o.status === 'pending');
  const completedOrders = customerOrders.filter(o => o.status === 'completed');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-[#7b3306] hover:text-[#973c00] mb-4 flex items-center gap-2 font-semibold"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold text-[#7b3306] mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders from Sendy Poultry Farm</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-[#7b3306]">{customerOrders.length}</p>
              </div>
              <Package className="size-12 text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-[#7b3306]">{pendingOrders.length}</p>
              </div>
              <Clock className="size-12 text-yellow-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold text-[#7b3306]">{completedOrders.length}</p>
              </div>
              <CheckCircle className="size-12 text-green-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        {customerOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">No Orders Found</h3>
            <p className="text-gray-500 mb-6">
              {emailFilter 
                ? `No orders found for ${emailFilter}. Please check your email address or place a new order.`
                : 'You haven\'t placed any orders yet. Browse our products to get started!'}
            </p>
            <div className="flex gap-3 justify-center">
              {emailFilter && (
                <button
                  onClick={() => setShowEmailInput(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-[#7b3306] px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Try Different Email
                </button>
              )}
              <button
                onClick={onBack}
                className="bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {customerOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#7b3306]">{order.productName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {order.status === 'pending' ? '⏳ Pending' : '✓ Completed'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">Order #{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-[#973c00]">${order.totalPrice.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                      <Calendar className="size-5 text-[#973c00] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Order Date</p>
                        <p className="font-semibold text-[#7b3306] text-sm">{formatDate(order.date)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="size-5 text-[#973c00] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="font-semibold text-[#7b3306] text-sm break-all">{order.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="size-5 text-[#973c00] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone</p>
                        <p className="font-semibold text-[#7b3306] text-sm">{order.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="size-4" />
                      <span>Unit Price: ${(order.totalPrice / order.quantity).toFixed(2)}</span>
                      <span className="mx-2">•</span>
                      <span>Customer: {order.customerName}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-br from-[#973c00] to-[#7b3306] rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
          <p className="mb-6 text-amber-100">
            If you have any questions about your orders or need assistance, please don't hesitate to contact us.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Phone className="size-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-5" />
              <span>enduranceoffeibea36@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}