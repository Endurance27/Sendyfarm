import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { EggsPage } from './components/EggsPage';
import { ChickensPage } from './components/ChickensPage';
import { ProductDetail } from './components/ProductDetail';
import { OrderForm } from './components/OrderForm';
import { ContactPage } from './components/ContactPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { BuyerDashboard } from './components/BuyerDashboard';
import { CartPage } from './components/CartPage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { ProfilePage } from './components/ProfilePage';
import { ShoppingCart, User } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  type: 'eggs' | 'chickens';
  price: number;
  description: string;
  image: string;
  stock: number;
  available: boolean;
  details?: string;
};

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  date: string;
  status: 'pending' | 'completed';
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'eggs' | 'chickens' | 'product-detail' | 'order' | 'contact' | 'admin-login' | 'admin-dashboard' | 'buyer-dashboard' | 'cart' | 'order-history' | 'profile'>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Free Range Brown Eggs',
      type: 'eggs',
      price: 5.99,
      description: 'Fresh organic brown eggs from free-range chickens',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc1f3ca54d?w=800',
      stock: 120,
      available: true,
      details: 'Our eggs come from free-range hens fed with organic grain. Rich in nutrients and perfect for all your cooking needs.'
    },
    {
      id: '2',
      name: 'White Eggs',
      type: 'eggs',
      price: 4.99,
      description: 'Premium quality white eggs',
      image: 'https://images.unsplash.com/photo-1679602598477-8864ee59bec0?w=800',
      stock: 200,
      available: true,
      details: 'Certified organic eggs from hens that roam freely on our farm. Superior taste and quality.'
    },
    {
      id: '3',
      name: 'Organic Duck Eggs',
      type: 'eggs',
      price: 8.99,
      description: 'Rich and creamy duck eggs',
      image: 'https://images.unsplash.com/photo-1664339307400-9c22e5f44496?w=800',
      stock: 50,
      available: true,
      details: 'Duck eggs are larger and richer than chicken eggs. Perfect for baking.'
    },
    {
      id: '7',
      name: 'Organic Brown Eggs Basket',
      type: 'eggs',
      price: 6.99,
      description: 'Premium organic brown eggs in basket',
      image: 'https://images.unsplash.com/photo-1708783741126-327ed87d63f0?w=800',
      stock: 80,
      available: true,
      details: 'Carefully selected organic brown eggs from our happiest hens. Rich flavor and beautiful golden yolks.'
    },
    {
      id: '8',
      name: 'Quail Eggs',
      type: 'eggs',
      price: 7.99,
      description: 'Delicate speckled quail eggs',
      image: 'https://images.unsplash.com/photo-1740476371489-835643ee9791?w=800',
      stock: 60,
      available: true,
      details: 'Small but packed with flavor. Perfect for gourmet dishes and appetizers.'
    },
    {
      id: '9',
      name: 'Farm Fresh Dozen Eggs',
      type: 'eggs',
      price: 5.49,
      description: 'Mixed brown and white eggs, farm fresh',
      image: 'https://images.unsplash.com/photo-1660224286794-fc173fa9295c?w=800',
      stock: 150,
      available: true,
      details: 'A beautiful mix of our finest eggs. Collected daily and delivered fresh to you.'
    },
    {
      id: '10',
      name: 'Nest Fresh Eggs',
      type: 'eggs',
      price: 6.49,
      description: 'Eggs fresh from the nest with straw',
      image: 'https://images.unsplash.com/photo-1650370551364-358f9cea4198?w=800',
      stock: 90,
      available: true,
      details: 'The freshest eggs possible - straight from the nesting boxes to your table.'
    },
    {
      id: '11',
      name: 'Blue-Green Duck Eggs',
      type: 'eggs',
      price: 9.99,
      description: 'Unique blue-green colored duck eggs',
      image: 'https://images.unsplash.com/photo-1742643905754-9c3dedc88385?w=800',
      stock: 40,
      available: true,
      details: 'Beautiful blue-green shelled duck eggs. Higher in protein and omega-3s than chicken eggs.'
    },
    {
      id: '12',
      name: 'White Eggs Carton',
      type: 'eggs',
      price: 4.79,
      description: 'Classic white eggs in carton',
      image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=800',
      stock: 180,
      available: true,
      details: 'Pure white eggs from our healthy white leghorn hens. Consistent size and excellent quality.'
    },
    {
      id: '4',
      name: 'Broiler Chickens',
      type: 'chickens',
      price: 15.99,
      description: 'Ready-to-cook broiler chickens (6-8 weeks)',
      image: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=800',
      stock: 45,
      available: true,
      details: '6-8 weeks old, healthy and well-fed. Perfect size for family meals.'
    },
    {
      id: '5',
      name: 'Rhode Island Red Hens',
      type: 'chickens',
      price: 25.00,
      description: 'Excellent egg-laying hens (5-6 months)',
      image: 'https://images.unsplash.com/photo-1589985002172-2fc5a9fa75b7?w=800',
      stock: 20,
      available: true,
      details: 'High-quality breed known for excellent egg production. Hardy and friendly disposition.'
    },
    {
      id: '6',
      name: 'Plymouth Rock Chickens',
      type: 'chickens',
      price: 22.00,
      description: 'Dual-purpose breed for eggs and meat',
      image: 'https://images.unsplash.com/photo-1649815846511-7640f28ba9a6?w=800',
      stock: 15,
      available: true,
      details: 'Versatile breed perfect for backyard farming.'
    },
    {
      id: '13',
      name: 'White Leghorn Chickens',
      type: 'chickens',
      price: 24.00,
      description: 'Prolific white egg layers',
      image: 'https://images.unsplash.com/photo-1666256360831-0a8a0ce0aeaa?w=800',
      stock: 25,
      available: true,
      details: 'The most popular egg-laying breed. Produces large white eggs consistently. Active and hardy.'
    },
    {
      id: '14',
      name: 'Sussex Speckled Chickens',
      type: 'chickens',
      price: 26.00,
      description: 'Beautiful speckled dual-purpose breed',
      image: 'https://images.unsplash.com/photo-1583077926202-fa3b858fde33?w=800',
      stock: 18,
      available: true,
      details: 'Stunning speckled plumage with excellent egg production. Friendly and great for families.'
    },
    {
      id: '15',
      name: 'Wyandotte Chickens',
      type: 'chickens',
      price: 27.00,
      description: 'Laced feather pattern, cold-hardy breed',
      image: 'https://images.unsplash.com/photo-1608872689366-4cbcf0c7e72c?w=800',
      stock: 12,
      available: true,
      details: 'Beautiful laced pattern feathers. Excellent for cold climates and great egg producers.'
    },
    {
      id: '16',
      name: 'Buff Orpington Chickens',
      type: 'chickens',
      price: 28.00,
      description: 'Large, friendly, golden-colored birds',
      image: 'https://images.unsplash.com/photo-1758589421217-000ee9ae0dc0?w=800',
      stock: 16,
      available: true,
      details: 'Known for their docile temperament and beautiful buff coloring. Great mothers and steady layers.'
    },
    {
      id: '17',
      name: 'Heritage Rooster',
      type: 'chickens',
      price: 32.00,
      description: 'Large heritage breed rooster',
      image: 'https://images.unsplash.com/photo-1737900580272-512651bfa710?w=800',
      stock: 8,
      available: true,
      details: 'Majestic heritage breed rooster. Perfect for breeding programs and flock protection.'
    },
    {
      id: '18',
      name: 'Free Range Hens',
      type: 'chickens',
      price: 23.00,
      description: 'Mixed breed free-range laying hens',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800',
      stock: 30,
      available: true,
      details: 'Healthy mixed breed hens raised on pasture. Great egg layers with varied egg colors.'
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([]);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleOrderProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('order');
  };

  const handlePlaceOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending'
    };
    setOrders([...orders, newOrder]);
    
    // Update stock
    setProducts(products.map(p => 
      p.id === orderData.productId 
        ? { ...p, stock: p.stock - orderData.quantity, available: p.stock - orderData.quantity > 0 }
        : p
    ));
    
    setCurrentPage('home');
  };

  const handleAdminLogin = (username: string, password: string) => {
    // Simple mock authentication
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      setCurrentPage('admin-dashboard');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  // Cart Management Functions
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Update quantity if item already in cart
      updateCartQuantity(product.id, existingItem.quantity + quantity);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { product, quantity }]);
    }
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    setCartItems(cartItems.map(item =>
      item.product.id === productId
        ? { ...item, quantity: Math.min(newQuantity, item.product.stock) }
        : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    // For now, just navigate to order form with first item
    // In a real app, you'd handle multiple items
    if (cartItems.length > 0) {
      setSelectedProduct(cartItems[0].product);
      setCurrentPage('order');
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <nav className="bg-[#973c00] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <div className="bg-[#f0b100] rounded-full p-2">
                <span className="text-2xl">🐔</span>
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">Sendy Poultry Farm</div>
                <div className="text-xs text-amber-200">Fresh Eggs & Local Chickens</div>
              </div>
            </div>
            
            <div className="flex gap-6 items-center">
              <button 
                onClick={() => setCurrentPage('home')}
                className="hover:text-[#f0b100] transition-colors font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('eggs')}
                className="hover:text-[#f0b100] transition-colors font-medium"
              >
                Eggs
              </button>
              <button 
                onClick={() => setCurrentPage('chickens')}
                className="hover:text-[#f0b100] transition-colors font-medium"
              >
                Chickens
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="hover:text-[#f0b100] transition-colors font-medium"
              >
                Contact
              </button>
              <button 
                onClick={() => setCurrentPage('order-history')}
                className="hover:text-[#f0b100] transition-colors font-medium"
              >
                My Orders
              </button>
              
              {/* Cart Icon with Badge */}
              <button 
                onClick={() => setCurrentPage('cart')}
                className="hover:text-[#f0b100] transition-colors font-medium relative"
              >
                <ShoppingCart className="size-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#f0b100] text-[#7b3306] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              
              {/* Profile Icon */}
              <button 
                onClick={() => setCurrentPage('profile')}
                className="hover:text-[#f0b100] transition-colors font-medium"
              >
                <User className="size-6" />
              </button>
              
              {!isAdminLoggedIn ? (
                <button 
                  onClick={() => setCurrentPage('admin-login')}
                  className="bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Admin Login
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentPage('admin-dashboard')}
                  className="bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <HomePage 
            products={products}
            onViewProduct={handleViewProduct}
            onNavigate={setCurrentPage} 
          />
        )}
        
        {currentPage === 'eggs' && (
          <EggsPage 
            products={products}
            onViewProduct={handleViewProduct}
            onOrderProduct={handleOrderProduct}
          />
        )}
        
        {currentPage === 'chickens' && (
          <ChickensPage 
            products={products}
            onViewProduct={handleViewProduct}
            onOrderProduct={handleOrderProduct}
          />
        )}
        
        {currentPage === 'products' && (
          <ProductsPage 
            products={products}
            onViewProduct={handleViewProduct}
            onOrderProduct={handleOrderProduct}
          />
        )}
        
        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setCurrentPage('home')}
            onOrder={() => handleOrderProduct(selectedProduct)}
          />
        )}
        
        {currentPage === 'order' && selectedProduct && (
          <OrderForm 
            product={selectedProduct}
            onSubmit={handlePlaceOrder}
            onCancel={() => setCurrentPage('home')}
          />
        )}
        
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        
        {currentPage === 'admin-login' && (
          <AdminLogin 
            onLogin={handleAdminLogin}
            onBack={() => setCurrentPage('home')}
          />
        )}
        
        {currentPage === 'admin-dashboard' && isAdminLoggedIn && (
          <AdminDashboard 
            products={products}
            orders={orders}
            onUpdateProducts={setProducts}
            onUpdateOrders={setOrders}
            onLogout={handleAdminLogout}
          />
        )}
        
        {currentPage === 'buyer-dashboard' && (
          <BuyerDashboard 
            orders={orders}
            onBack={() => setCurrentPage('home')}
          />
        )}
        
        {currentPage === 'cart' && (
          <CartPage 
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
            onContinueShopping={() => setCurrentPage('home')}
          />
        )}
        
        {currentPage === 'order-history' && (
          <OrderHistoryPage 
            orders={orders}
          />
        )}
        
        {currentPage === 'profile' && (
          <ProfilePage />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#2d2d2d] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3 text-[#f0b100]">Sendy Poultry Farm</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Quality poultry products and farm-fresh eggs delivered with care. We're committed to sustainable, ethical farming practices.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-[#f0b100]">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => setCurrentPage('home')} className="text-gray-300 hover:text-white text-left text-sm">
                  Home
                </button>
                <button onClick={() => setCurrentPage('eggs')} className="text-gray-300 hover:text-white text-left text-sm">
                  Eggs
                </button>
                <button onClick={() => setCurrentPage('chickens')} className="text-gray-300 hover:text-white text-left text-sm">
                  Chickens
                </button>
                <button onClick={() => setCurrentPage('contact')} className="text-gray-300 hover:text-white text-left text-sm">
                  Contact Us
                </button>
                <button onClick={() => setCurrentPage('order-history')} className="text-gray-300 hover:text-white text-left text-sm">
                  My Orders
                </button>
                <button onClick={() => setCurrentPage('admin-login')} className="text-gray-300 hover:text-white text-left text-sm">
                  Admin Panel
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-[#f0b100]">Contact Info</h3>
              <p className="text-gray-300 text-sm mb-2">📧 info@sendypoultry.farm</p>
              <p className="text-gray-300 text-sm mb-2">📞 +1 (555) 123-4567</p>
              <p className="text-gray-300 text-sm">📍 123 Farm Road, Countryside</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
            <p>© 2026 Sendy Poultry Farm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}