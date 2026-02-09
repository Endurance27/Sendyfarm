import React, { useState } from 'react';
import { Order } from '../App';
import { Package, Calendar, DollarSign, User, Mail, Phone, Search, Filter } from 'lucide-react';

interface OrderHistoryPageProps {
  orders: Order[];
  userEmail?: string;
}

export function OrderHistoryPage({ orders, userEmail }: OrderHistoryPageProps) {
  const [searchEmail, setSearchEmail] = useState(userEmail || '');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Filter orders by email
  const userOrders = orders.filter(order => 
    searchEmail ? order.email.toLowerCase() === searchEmail.toLowerCase() : true
  );

  // Filter by status
  const filteredOrders = statusFilter === 'all' 
    ? userOrders 
    : userOrders.filter(order => order.status === statusFilter);

  // Sort by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalSpent = userOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = userOrders.filter(o => o.status === 'pending').length;
  const completedOrders = userOrders.filter(o => o.status === 'completed').length;

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="size-8 text-[#7b3306]" />
            <h1 className="text-4xl font-bold text-[#7b3306]">Order History</h1>
          </div>
          <p className="text-gray-600">View and track all your orders</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Search */}
            <div>
              <label className="block text-sm font-semibold text-[#7b3306] mb-2">
                Search by Email
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-[#7b3306] mb-2">
                Filter by Status
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {searchEmail && userOrders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <Package className="size-6 text-[#973c00]" />
                <h3 className="font-semibold text-gray-700">Total Orders</h3>
              </div>
              <p className="text-3xl font-bold text-[#7b3306]">{userOrders.length}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="size-6 text-orange-600" />
                <h3 className="font-semibold text-gray-700">Pending</h3>
              </div>
              <p className="text-3xl font-bold text-[#7b3306]">{pendingOrders}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <Package className="size-6 text-green-600" />
                <h3 className="font-semibold text-gray-700">Completed</h3>
              </div>
              <p className="text-3xl font-bold text-[#7b3306]">{completedOrders}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="size-6 text-[#f0b100]" />
                <h3 className="font-semibold text-gray-700">Total Spent</h3>
              </div>
              <p className="text-3xl font-bold text-[#7b3306]">${totalSpent.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Orders List */}
        {sortedOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-[#7b3306] mb-2">No orders found</h2>
            <p className="text-gray-600">
              {searchEmail 
                ? "No orders found for this email address." 
                : "Enter your email to view your order history."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-amber-200"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#7b3306]">
                        Order #{order.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="size-4" />
                      <span>{new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-[#973c00]">${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Info */}
                  <div>
                    <h4 className="font-semibold text-[#7b3306] mb-3">Product Details</h4>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <p className="font-bold text-[#7b3306] mb-1">{order.productName}</p>
                      <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h4 className="font-semibold text-[#7b3306] mb-3">Customer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-gray-500" />
                        <span className="text-gray-700">{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="size-4 text-gray-500" />
                        <span className="text-gray-700">{order.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="size-4 text-gray-500" />
                        <span className="text-gray-700">{order.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
