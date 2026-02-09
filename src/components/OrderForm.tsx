import React, { useState } from 'react';
import { Product, Order } from '../App';

interface OrderFormProps {
  product: Product;
  onSubmit: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  onCancel: () => void;
}

export function OrderForm({ product, onSubmit, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    quantity: 1,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }

    if (formData.quantity > product.stock) {
      newErrors.quantity = `Only ${product.stock} available`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const orderData = {
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email,
      productId: product.id,
      productName: product.name,
      quantity: formData.quantity,
      totalPrice: product.price * formData.quantity,
    };

    onSubmit(orderData);
  };

  const totalPrice = product.price * formData.quantity;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onCancel}
        className="text-stone-700 hover:text-stone-800 mb-6 flex items-center gap-2"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-stone-700 text-white p-6">
          <h1 className="text-3xl font-bold">Place Your Order</h1>
          <p className="text-amber-100 mt-2">Fill in your details to complete the order</p>
        </div>

        <div className="p-8">
          {/* Product Summary */}
          <div className="bg-amber-50 p-6 rounded-lg mb-8">
            <h2 className="font-semibold text-stone-900 mb-4">Order Summary</h2>
            <div className="flex gap-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-amber-600 font-bold mt-2">${product.price.toFixed(2)} each</p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.customerName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max={product.stock}
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.quantity ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  Available stock: {product.stock}
                </p>
              </div>

              {/* Total Price */}
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Total Price:</span>
                  <span className="text-2xl font-bold text-amber-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 text-white hover:bg-amber-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>

          {/* Order Note */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              📋 <strong>Note:</strong> After placing your order, our team will contact you within 24 hours to confirm delivery details and payment method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}