import React from 'react';
import { Product } from '../App';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onOrder: () => void;
}

export function ProductDetail({ product, onBack, onOrder }: ProductDetailProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="text-stone-700 hover:text-stone-800 mb-6 flex items-center gap-2"
      >
        ← Back to Products
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.available && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-8">
            <div className="mb-4">
              <span className="inline-block bg-amber-100 text-stone-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {product.type === 'eggs' ? '🥚 Eggs' : '🐔 Chickens'}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-stone-900 mb-4">
              {product.name}
            </h1>

            <div className="text-4xl font-bold text-amber-600 mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-700 mb-6 text-lg">
              {product.description}
            </p>

            {product.details && (
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-stone-900 mb-2">Product Details</h3>
                <p className="text-gray-700">{product.details}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Availability:</span>
                <span className={`font-semibold ${product.available ? 'text-amber-600' : 'text-red-600'}`}>
                  {product.available ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stock Quantity:</span>
                <span className="font-semibold text-gray-900">{product.stock} available</span>
              </div>
            </div>

            <button
              onClick={onOrder}
              disabled={!product.available}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                product.available
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.available ? 'Order Now' : 'Currently Unavailable'}
            </button>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📦 Delivery Information</h4>
              <p className="text-sm text-blue-800">
                Local delivery available. Contact us for shipping options and bulk orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">Why Choose Our Products?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-semibold text-stone-800 mb-2">Quality Assured</h3>
            <p className="text-gray-600 text-sm">
              All products are carefully inspected for quality and freshness.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="font-semibold text-stone-800 mb-2">Naturally Raised</h3>
            <p className="text-gray-600 text-sm">
              Our chickens are raised with organic feed and care.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">💚</div>
            <h3 className="font-semibold text-stone-800 mb-2">Local & Fresh</h3>
            <p className="text-gray-600 text-sm">
              Supporting local farming with fresh, sustainable products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}