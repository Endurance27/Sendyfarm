import React from 'react';
import { Product } from '../App';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartPage({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout, 
  onContinueShopping 
}: CartPageProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="size-8 text-[#7b3306]" />
            <h1 className="text-4xl font-bold text-[#7b3306]">Shopping Cart</h1>
          </div>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-[#7b3306] mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start adding some products to your cart!</p>
            <button
              onClick={onContinueShopping}
              className="bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="size-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-amber-200"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-[#7b3306] mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600">{item.product.description}</p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from cart"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              className="p-2 hover:bg-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="size-4 text-[#7b3306]" />
                            </button>
                            <span className="w-12 text-center font-semibold text-[#7b3306]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                              disabled={item.quantity >= item.product.stock}
                              className="p-2 hover:bg-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="size-4 text-[#7b3306]" />
                            </button>
                          </div>
                          <span className="text-sm text-gray-500">
                            ({item.product.stock} available)
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Price per item</p>
                          <p className="text-2xl font-bold text-[#973c00]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-amber-200">
                <h2 className="text-2xl font-bold text-[#7b3306] mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.length} items):</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (8%):</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-lg font-bold text-[#7b3306]">
                      <span>Total:</span>
                      <span className="text-2xl">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  Proceed to Checkout
                  <ArrowRight className="size-5" />
                </button>

                <button
                  onClick={onContinueShopping}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-[#7b3306] py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue Shopping
                </button>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Free delivery on orders over $50</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Fresh products guaranteed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>100% satisfaction guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
