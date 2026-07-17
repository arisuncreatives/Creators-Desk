import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Global Contexts
import { AuthProvider } from './context/AuthContext';

// Global Components
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

// E-Commerce Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category'; // <-- ADDED: Dynamic Category Page
import Search from './pages/Search'; // <-- ADDED: Search Results Page

// Checkout Flow
import OrderDetails from './pages/OrderDetails';
import Payment from './pages/Payment';

// Utility Pages
import Contact from './pages/Contact';
import Help from './pages/Help';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile'; 
import Login from './pages/Login';

function App() {
  const location = useLocation();
  // Hide Navbar/Cart during the focused checkout flow
  const isCheckoutFlow = location.pathname === '/order' || location.pathname === '/payment';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-creator-white text-creator-black font-sans relative selection:bg-creator-black selection:text-white">
        
        {!isCheckoutFlow && <Navbar />}
        {!isCheckoutFlow && <CartDrawer />}
        
        <Routes>
          {/* Core Shopping */}
          <Route path="/" element={<Home />} />
          
          {/* --- Category & Search Routes --- */}
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/search" element={<Search />} />
          
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          
          {/* Checkout Pipeline */}
          <Route path="/order" element={<OrderDetails />} />
          <Route path="/payment" element={<Payment />} />
          
          {/* User & Support */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
        </Routes>
        
        {!isCheckoutFlow && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;