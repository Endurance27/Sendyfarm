import React from 'react';
import { Product } from '../App';

interface HomePageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onNavigate: (page: 'products' | 'contact') => void;
}

export function HomePage({ products, onViewProduct, onNavigate }: HomePageProps) {
  const eggProducts = products.filter(p => p.type === 'eggs').slice(0, 3);
  const chickenProducts = products.filter(p => p.type === 'chickens').slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[450px] overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full">
            <img 
              src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1080" 
              alt="Farm Hens"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 h-full">
            <img 
              src="https://images.unsplash.com/photo-1664339307400-9c22e5f44496?w=1080" 
              alt="Fresh Eggs"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#973c00]/70 via-[#7b3306]/60 to-[#7b3306]/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Fresh from Our Farm to Your Table
            </h1>
            <p className="text-xl mb-8 text-amber-100 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              Premium quality eggs and healthy chickens raised with care on our family farm.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                className="bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Shop Eggs
              </button>
              <button 
                onClick={() => window.scrollTo({ top: 1300, behavior: 'smooth' })}
                className="bg-white hover:bg-gray-100 text-[#7b3306] px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Shop Chickens
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 100% Organic */}
            <div className="text-center">
              <div className="bg-[#fef3c6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#973c00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7b3306]">100% Organic</h3>
              <p className="text-gray-600">
                All our chickens are raised naturally without hormones or antibiotics.
              </p>
            </div>

            {/* Fresh Daily */}
            <div className="text-center">
              <div className="bg-[#fef9c2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#a65f00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7b3306]">Fresh Daily</h3>
              <p className="text-gray-600">
                Eggs collected fresh every morning and delivered to you quickly.
              </p>
            </div>

            {/* Quality Guaranteed */}
            <div className="text-center">
              <div className="bg-[#dcfce7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#008236]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7b3306]">Quality Guaranteed</h3>
              <p className="text-gray-600">
                We stand behind the quality of every product we sell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Eggs Section */}
      <section className="py-16 bg-[#fffbeb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#7b3306] mb-4">Fresh Eggs</h2>
            <p className="text-xl text-gray-600">
              Farm-fresh eggs collected daily from our healthy, happy chickens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eggProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#7b3306] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 min-h-[48px]">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-[#7b3306]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.stock} available
                    </span>
                  </div>
                  <button
                    onClick={() => onViewProduct(product)}
                    className="w-full bg-[#973c00] hover:bg-[#7b3306] text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Chickens Section */}
      <section className="py-16 bg-[#fffbeb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#7b3306] mb-4">Quality Chickens</h2>
            <p className="text-xl text-gray-600">
              Healthy, well-raised chickens perfect for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chickenProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.stock <= 20 && (
                    <div className="absolute top-4 right-4 bg-[#f0b100] text-[#7b3306] px-3 py-1 rounded-full text-sm font-semibold">
                      Low Stock
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#7b3306] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 min-h-[48px]">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-[#7b3306]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.stock} available
                    </span>
                  </div>
                  <button
                    onClick={() => onViewProduct(product)}
                    className="w-full bg-[#973c00] hover:bg-[#7b3306] text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#973c00] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Get in touch with us today to place your order or visit our farm
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] px-10 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}