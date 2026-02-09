import React from 'react';
import { Product } from '../App';
import { ShoppingCart, Eye } from 'lucide-react';

interface EggsPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onOrderProduct: (product: Product) => void;
}

export function EggsPage({ products, onViewProduct, onOrderProduct }: EggsPageProps) {
  const eggProducts = products.filter(p => p.type === 'eggs');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1664339307400-9c22e5f44496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGVnZ3MlMjBjcmF0ZSUyMGZhcm0lMjBmcmVzaHxlbnwxfHx8fDE3NzA2MzI3NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Fresh Eggs"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#973c00]/80 via-[#7b3306]/70 to-[#7b3306]/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Farm Fresh Eggs</h1>
            <p className="text-xl text-amber-100 max-w-2xl drop-shadow-md">
              Discover our selection of premium quality eggs from free-range chickens, ducks, and quail. 
              Fresh from our farm to your table daily.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#7b3306] mb-2">Our Egg Selection</h2>
          <p className="text-gray-600">Choose from {eggProducts.length} varieties of fresh, quality eggs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eggProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-200"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {!product.available && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
                {product.available && product.stock < 50 && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Low Stock
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#7b3306] mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-3xl font-bold text-[#973c00]">${product.price}</p>
                    <p className="text-sm text-gray-500">per dozen</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Stock:</p>
                    <p className="font-semibold text-[#7b3306]">{product.stock} available</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => onViewProduct(product)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#7b3306] py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="size-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => onOrderProduct(product)}
                    disabled={!product.available}
                    className="flex-1 bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] py-2 px-4 rounded-lg font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="size-4" />
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-amber-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🥚</div>
              <h3 className="text-xl font-bold text-[#7b3306] mb-2">Farm Fresh Daily</h3>
              <p className="text-gray-700">Collected fresh every morning from our healthy, happy hens</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="text-xl font-bold text-[#7b3306] mb-2">Organic Feed</h3>
              <p className="text-gray-700">Our birds are fed premium organic grain for superior egg quality</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏡</div>
              <h3 className="text-xl font-bold text-[#7b3306] mb-2">Free Range</h3>
              <p className="text-gray-700">Our chickens roam freely on pasture for healthier, tastier eggs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}