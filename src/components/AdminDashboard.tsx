import React, { useState } from 'react';
import { Product, Order } from '../App';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  Search,
  Download,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  Clock,
  Filter,
  X,
  BarChart3
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onLogout: () => void;
}

export function AdminDashboard({ 
  products, 
  orders, 
  onUpdateProducts, 
  onUpdateOrders,
  onLogout 
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'analytics'>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [productTypeFilter, setProductTypeFilter] = useState<'all' | 'eggs' | 'chickens'>('all');

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    type: 'eggs',
    price: 0,
    description: '',
    image: '',
    stock: 0,
    available: true,
    details: ''
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        type: newProduct.type as 'eggs' | 'chickens',
        price: Number(newProduct.price),
        description: newProduct.description || '',
        image: newProduct.image,
        stock: Number(newProduct.stock),
        available: newProduct.available ?? true,
        details: newProduct.details
      };
      onUpdateProducts([...products, product]);
      setIsAddingProduct(false);
      setNewProduct({
        name: '',
        type: 'eggs',
        price: 0,
        description: '',
        image: '',
        stock: 0,
        available: true,
        details: ''
      });
    }
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      onUpdateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onUpdateProducts(products.filter(p => p.id !== id));
    }
  };

  const handleToggleAvailability = (id: string) => {
    onUpdateProducts(products.map(p => 
      p.id === id ? { ...p, available: !p.available } : p
    ));
  };

  const handleUpdateOrderStatus = (orderId: string, status: 'pending' | 'completed') => {
    onUpdateOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      onUpdateOrders(orders.filter(o => o.id !== orderId));
    }
  };

  // Analytics calculations
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const completedOrdersCount = orders.filter(o => o.status === 'completed').length;
  const eggsRevenue = orders.filter(o => {
    const product = products.find(p => p.id === o.productId);
    return product?.type === 'eggs';
  }).reduce((sum, order) => sum + order.totalPrice, 0);
  const chickensRevenue = orders.filter(o => {
    const product = products.find(p => p.id === o.productId);
    return product?.type === 'chickens';
  }).reduce((sum, order) => sum + order.totalPrice, 0);
  
  const lowStockProducts = products.filter(p => p.stock <= 10 && p.stock > 0);
  const outOfStockProducts = products.filter(p => p.stock === 0);
  
  // Top selling products
  const productSales = products.map(product => {
    const sales = orders.filter(o => o.productId === product.id)
      .reduce((sum, o) => sum + o.quantity, 0);
    const revenue = orders.filter(o => o.productId === product.id)
      .reduce((sum, o) => sum + o.totalPrice, 0);
    return { ...product, sales, revenue };
  }).sort((a, b) => b.sales - a.sales).slice(0, 5);

  // Customer analytics
  const uniqueCustomers = new Set(orders.map(o => o.email)).size;
  const customerList = Array.from(new Set(orders.map(o => o.email))).map(email => {
    const customerOrders = orders.filter(o => o.email === email);
    const totalSpent = customerOrders.reduce((sum, o) => sum + o.totalPrice, 0);
    const customerName = customerOrders[0]?.customerName || 'Unknown';
    const phone = customerOrders[0]?.phone || 'N/A';
    return {
      email,
      name: customerName,
      phone,
      orderCount: customerOrders.length,
      totalSpent
    };
  }).sort((a, b) => b.totalSpent - a.totalSpent);

  // Filter functions
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.includes(searchTerm);
    const matchesFilter = orderFilter === 'all' || order.status === orderFilter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = productTypeFilter === 'all' || product.type === productTypeFilter;
    return matchesSearch && matchesType;
  });

  // Export functions
  const exportOrdersToCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Phone', 'Product', 'Quantity', 'Total', 'Status'];
    const rows = orders.map(o => [
      o.id,
      new Date(o.date).toLocaleString(),
      o.customerName,
      o.email,
      o.phone,
      o.productName,
      o.quantity,
      o.totalPrice.toFixed(2),
      o.status
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const exportCustomersToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Total Orders', 'Total Spent'];
    const rows = customerList.map(c => [
      c.name,
      c.email,
      c.phone,
      c.orderCount,
      c.totalSpent.toFixed(2)
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#7b3306]">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your poultry farm website</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 border border-amber-200">
          <div className="flex border-b border-amber-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 px-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-b-2 border-[#973c00] text-[#973c00]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="inline-block mr-2 size-5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-4 px-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'products'
                  ? 'border-b-2 border-[#973c00] text-[#973c00]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Package className="inline-block mr-2 size-5" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-4 px-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-b-2 border-[#973c00] text-[#973c00]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShoppingCart className="inline-block mr-2 size-5" />
              Orders 
              {pendingOrdersCount > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs ml-2">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex-1 py-4 px-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'customers'
                  ? 'border-b-2 border-[#973c00] text-[#973c00]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="inline-block mr-2 size-5" />
              Customers
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-4 px-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'border-b-2 border-[#973c00] text-[#973c00]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 className="inline-block mr-2 size-5" />
              Analytics
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-[#7b3306] mb-6">Dashboard Overview</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <Package className="size-10 text-[#973c00]" />
                      <span className="text-sm font-semibold text-[#973c00] bg-white px-3 py-1 rounded-full">Products</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Total Products</p>
                    <p className="text-4xl font-bold text-[#7b3306]">{products.length}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {products.filter(p => p.available).length} available
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <ShoppingCart className="size-10 text-orange-700" />
                      <span className="text-sm font-semibold text-orange-700 bg-white px-3 py-1 rounded-full">Orders</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                    <p className="text-4xl font-bold text-[#7b3306]">{orders.length}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {pendingOrdersCount} pending
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <DollarSign className="size-10 text-green-700" />
                      <span className="text-sm font-semibold text-green-700 bg-white px-3 py-1 rounded-full">Revenue</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                    <p className="text-4xl font-bold text-[#7b3306]">${totalRevenue.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {completedOrdersCount} completed orders
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <Users className="size-10 text-blue-700" />
                      <span className="text-sm font-semibold text-blue-700 bg-white px-3 py-1 rounded-full">Customers</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Total Customers</p>
                    <p className="text-4xl font-bold text-[#7b3306]">{uniqueCustomers}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Unique email addresses
                    </p>
                  </div>
                </div>

                {/* Alerts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Low Stock Alert */}
                  {lowStockProducts.length > 0 && (
                    <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="size-6 text-yellow-700" />
                        <h3 className="font-bold text-yellow-900 text-lg">⚠️ Low Stock Alert</h3>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {lowStockProducts.map(product => (
                          <div key={product.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
                            <div>
                              <p className="font-semibold text-gray-800">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.type}</p>
                            </div>
                            <span className="text-yellow-800 font-bold">{product.stock} left</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Out of Stock Alert */}
                  {outOfStockProducts.length > 0 && (
                    <div className="bg-red-50 border-2 border-red-300 p-6 rounded-xl">
                      <div className="flex items-center gap-2 mb-4">
                        <X className="size-6 text-red-700" />
                        <h3 className="font-bold text-red-900 text-lg">❌ Out of Stock</h3>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {outOfStockProducts.map(product => (
                          <div key={product.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
                            <div>
                              <p className="font-semibold text-gray-800">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.type}</p>
                            </div>
                            <span className="text-red-800 font-bold">Out of stock</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {lowStockProducts.length === 0 && outOfStockProducts.length === 0 && (
                    <div className="bg-green-50 border-2 border-green-300 p-6 rounded-xl lg:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="size-6 text-green-700" />
                        <h3 className="font-bold text-green-900 text-lg">✓ All Products in Stock</h3>
                      </div>
                      <p className="text-green-800">All products have sufficient inventory levels.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                {/* Header with Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-[#7b3306]">Product Management</h2>
                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="bg-[#973c00] hover:bg-[#7b3306] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Plus className="size-5" />
                    Add New Product
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                    />
                  </div>
                  <select
                    value={productTypeFilter}
                    onChange={(e) => setProductTypeFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="eggs">Eggs</option>
                    <option value="chickens">Chickens</option>
                  </select>
                </div>

                {/* Add Product Form */}
                {isAddingProduct && (
                  <div className="bg-amber-50 p-6 rounded-xl mb-6 border-2 border-amber-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-[#7b3306]">Add New Product</h3>
                      <button
                        onClick={() => setIsAddingProduct(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="size-6" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Product Name *"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                      />
                      <select
                        value={newProduct.type}
                        onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value as 'eggs' | 'chickens' })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                      >
                        <option value="eggs">Eggs</option>
                        <option value="chickens">Chickens</option>
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price *"
                        value={newProduct.price || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Stock *"
                        value={newProduct.stock || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Image URL *"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Short Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                      />
                      <textarea
                        placeholder="Detailed Description"
                        value={newProduct.details}
                        onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2 focus:ring-2 focus:ring-[#f0b100] focus:border-transparent resize-none h-24"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddProduct}
                        className="bg-[#973c00] hover:bg-[#7b3306] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Save Product
                      </button>
                      <button
                        onClick={() => setIsAddingProduct(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Products List */}
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white border border-amber-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                      {editingProduct?.id === product.id ? (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                              type="text"
                              value={editingProduct.name}
                              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                              className="px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            <input
                              type="number"
                              step="0.01"
                              value={editingProduct.price}
                              onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                              className="px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            <input
                              type="number"
                              value={editingProduct.stock}
                              onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                              className="px-4 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleUpdateProduct}
                              className="bg-[#973c00] hover:bg-[#7b3306] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingProduct(null)}
                              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg text-[#7b3306]">{product.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                product.type === 'eggs' ? 'bg-amber-100 text-amber-800' : 'bg-orange-100 text-orange-800'
                              }`}>
                                {product.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="font-bold text-[#973c00] text-lg">${product.price.toFixed(2)}</span>
                              <span className="flex items-center gap-1">
                                Stock: 
                                <span className={`font-semibold ${
                                  product.stock === 0 ? 'text-red-600' :
                                  product.stock <= 10 ? 'text-yellow-600' : 
                                  'text-green-600'
                                }`}>
                                  {product.stock}
                                </span>
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                product.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {product.available ? '✓ Available' : '✗ Unavailable'}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleToggleAvailability(product.id)}
                              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                product.available
                                  ? 'bg-amber-100 text-[#7b3306] hover:bg-amber-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {product.available ? 'Available' : 'Unavailable'}
                            </button>
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors flex items-center gap-1"
                            >
                              <Edit className="size-4" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors flex items-center gap-1"
                            >
                              <Trash2 className="size-4" /> Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="size-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-semibold">No products found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-[#7b3306]">Order Management</h2>
                  <button
                    onClick={exportOrdersToCSV}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Download className="size-5" />
                    Export to CSV
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders by customer, email, or order ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                    />
                  </div>
                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent"
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <ShoppingCart className="size-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-semibold">No orders found</p>
                    <p className="text-sm">
                      {orders.length === 0 ? 'No orders have been placed yet' : 'Try adjusting your search or filters'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div key={order.id} className="bg-white border border-amber-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg text-[#7b3306]">Order #{order.id}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                                order.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {order.status === 'pending' ? <Clock className="size-3" /> : <CheckCircle className="size-3" />}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {new Date(order.date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <p className="text-3xl font-bold text-[#973c00]">${order.totalPrice.toFixed(2)}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-amber-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-[#7b3306] mb-2 flex items-center gap-2">
                              <Users className="size-4" /> Customer Information
                            </h4>
                            <p className="text-sm mb-1"><strong>Name:</strong> {order.customerName}</p>
                            <p className="text-sm mb-1"><strong>Email:</strong> {order.email}</p>
                            <p className="text-sm"><strong>Phone:</strong> {order.phone}</p>
                          </div>

                          <div className="bg-amber-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-[#7b3306] mb-2 flex items-center gap-2">
                              <Package className="size-4" /> Order Details
                            </h4>
                            <p className="text-sm mb-1"><strong>Product:</strong> {order.productName}</p>
                            <p className="text-sm mb-1"><strong>Quantity:</strong> {order.quantity}</p>
                            <p className="text-sm"><strong>Unit Price:</strong> ${(order.totalPrice / order.quantity).toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                            >
                              <CheckCircle className="size-4" /> Mark as Completed
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, 'pending')}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                            >
                              <Clock className="size-4" /> Mark as Pending
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="size-4" /> Delete Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Customers Tab */}
            {activeTab === 'customers' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#7b3306]">Customer Management</h2>
                    <p className="text-gray-600 text-sm mt-1">{uniqueCustomers} unique customers</p>
                  </div>
                  <button
                    onClick={exportCustomersToCSV}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Download className="size-5" />
                    Export to CSV
                  </button>
                </div>

                {customerList.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="size-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-semibold">No customers yet</p>
                    <p className="text-sm">Customer data will appear here once orders are placed</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerList.map((customer, index) => (
                      <div key={customer.email} className="bg-white border border-amber-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#973c00] to-[#f0b100] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {customer.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-[#7b3306]">{customer.name}</h3>
                                <p className="text-sm text-gray-600">{customer.email}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm">
                              <span className="flex items-center gap-1">
                                <strong>Phone:</strong> {customer.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <strong>Orders:</strong> {customer.orderCount}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                            <p className="text-3xl font-bold text-[#973c00]">${customer.totalSpent.toFixed(2)}</p>
                            {index < 3 && (
                              <span className="inline-block mt-2 px-3 py-1 bg-[#f0b100] text-[#7b3306] rounded-full text-xs font-semibold">
                                🏆 Top Customer
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-2xl font-bold text-[#7b3306] mb-6">Sales Analytics</h2>

                {/* Revenue Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="size-8 text-[#973c00]" />
                      <h3 className="font-bold text-[#7b3306]">Total Revenue</h3>
                    </div>
                    <p className="text-4xl font-bold text-[#7b3306]">${totalRevenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mt-2">{orders.length} orders total</p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-3xl">🥚</span>
                      <h3 className="font-bold text-[#7b3306]">Eggs Revenue</h3>
                    </div>
                    <p className="text-4xl font-bold text-[#7b3306]">${eggsRevenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {((eggsRevenue / totalRevenue) * 100 || 0).toFixed(1)}% of total
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-3xl">🐔</span>
                      <h3 className="font-bold text-[#7b3306]">Chickens Revenue</h3>
                    </div>
                    <p className="text-4xl font-bold text-[#7b3306]">${chickensRevenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {((chickensRevenue / totalRevenue) * 100 || 0).toFixed(1)}% of total
                    </p>
                  </div>
                </div>

                {/* Top Selling Products */}
                <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-md mb-8">
                  <h3 className="text-xl font-bold text-[#7b3306] mb-4 flex items-center gap-2">
                    <TrendingUp className="size-6" />
                    Top Selling Products
                  </h3>
                  {productSales.filter(p => p.sales > 0).length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No sales data available yet</p>
                  ) : (
                    <div className="space-y-3">
                      {productSales.filter(p => p.sales > 0).map((product, index) => (
                        <div key={product.id} className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg">
                          <div className="flex items-center justify-center w-10 h-10 bg-[#973c00] text-white font-bold rounded-full">
                            #{index + 1}
                          </div>
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-bold text-[#7b3306]">{product.name}</h4>
                            <p className="text-sm text-gray-600">
                              {product.sales} units sold • ${product.revenue.toFixed(2)} revenue
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#973c00]">${product.price.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">per unit</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Order Status Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-[#7b3306] mb-4 flex items-center gap-2">
                      <Clock className="size-6" />
                      Pending Orders
                    </h3>
                    <p className="text-5xl font-bold text-yellow-600 mb-2">{pendingOrdersCount}</p>
                    <p className="text-gray-600">
                      ${orders.filter(o => o.status === 'pending').reduce((sum, o) => sum + o.totalPrice, 0).toFixed(2)} value
                    </p>
                  </div>

                  <div className="bg-white border border-amber-200 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-[#7b3306] mb-4 flex items-center gap-2">
                      <CheckCircle className="size-6" />
                      Completed Orders
                    </h3>
                    <p className="text-5xl font-bold text-green-600 mb-2">{completedOrdersCount}</p>
                    <p className="text-gray-600">
                      ${orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalPrice, 0).toFixed(2)} value
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
