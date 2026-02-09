import React, { useState } from 'react';
import { Product } from '../App';

interface ProductsPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onOrderProduct: (product: Product) => void;
}

export function ProductsPage({ products, onViewProduct, onOrderProduct }: ProductsPageProps) {
  const [filter, setFilter] = useState<'all' | 'eggs' | 'chickens'>('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-8">Our Products</h1>
      
      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'all' 
              ? 'bg-stone-700 text-white' 
              : 'bg-white text-stone-700 border-2 border-stone-700 hover:bg-amber-50'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setFilter('eggs')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'eggs' 
              ? 'bg-stone-700 text-white' 
              : 'bg-white text-stone-700 border-2 border-stone-700 hover:bg-amber-50'
          }`}
        >
          🥚 Eggs
        </button>
        <button
          onClick={() => setFilter('chickens')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'chickens' 
              ? 'bg-stone-700 text-white' 
              : 'bg-white text-stone-700 border-2 border-stone-700 hover:bg-amber-50'
          }`}
        >
          🐔 Chickens
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              {!product.available && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                    Out of Stock
                  </span>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full font-semibold">
                ${product.price.toFixed(2)}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-stone-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-500">
                  Stock: <span className={product.stock > 10 ? 'text-amber-600' : 'text-orange-600'}>
                    {product.stock} available
                  </span>
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onViewProduct(product)}
                  className="flex-1 bg-amber-100 text-stone-700 hover:bg-amber-200 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => onOrderProduct(product)}
                  disabled={!product.available}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    product.available
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.available ? 'Order Now' : 'Unavailable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}