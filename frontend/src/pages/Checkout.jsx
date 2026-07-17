import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate order processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-creator-white flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 bg-creator-accent text-white rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-light tracking-tight mb-2">Order Confirmed.</h1>
        <p className="text-creator-muted mb-8">Your precision tools are being prepped for shipment.</p>
        <Link to="/" className="border border-creator-border px-8 py-3 text-sm hover:bg-creator-surface transition-colors">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-creator-white flex flex-col">
      {/* Minimal Header */}
      <header className="px-8 py-6 border-b border-creator-border flex justify-between items-center bg-white">
        <Link to="/" className="text-xl font-bold tracking-tight">
          CREATOR'S DESK.
        </Link>
        <span className="text-sm text-creator-muted uppercase tracking-widest">Secure Checkout</span>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 lg:p-12">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-7">
          <form onSubmit={handleCheckout} className="space-y-10">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-lg font-medium mb-4">Contact Information</h2>
              <input 
                type="email" 
                required
                placeholder="Email address" 
                className="w-full bg-creator-surface border border-creator-border p-4 text-sm focus:outline-none focus:border-creator-accent transition-colors"
              />
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" required placeholder="First name" className="w-full bg-creator-surface border border-creator-border p-4 text-sm focus:outline-none focus:border-creator-accent transition-colors" />
                  <input type="text" required placeholder="Last name" className="w-full bg-creator-surface border border-creator-border p-4 text-sm focus:outline-none focus:border-creator-accent transition-colors" />
                </div>
                <input type="text" required placeholder="Address" className="w-full bg-creator-surface border border-creator-border p-4 text-sm focus:outline-none focus:border-creator-accent transition-colors" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-creator-surface border border-creator-border p-4 text-sm focus:outline-none focus:border-creator-accent transition-colors" />
                <div className="grid grid-cols-3 gap-4">
                  <input type="text" required placeholder="City" className="w-full col-span-1 bg-creator-surface border border-creator-border p-4 text-sm focus:outline-none focus:border-creator-accent transition-colors" />
                  <input type="text" required placeholder="State" className="w-full col-span-1 bg-creator-surface border border-creator-border p-4 text-sm focus:outline-none focus:border-creator-accent transition-colors" />
                  <input type="text" required placeholder="ZIP code" className="w-full col-span-1 bg-creator-surface border border-creator-border p-4 text-sm focus:outline-none focus:border-creator-accent transition-colors" />
                </div>
              </div>
            </section>

            {/* Payment Info - Now exclusively COD */}
            <section>
              <h2 className="text-lg font-medium mb-4">Payment Details</h2>
              <div className="border border-creator-border p-6 bg-creator-surface flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-creator-text">Cash on Delivery (COD)</h3>
                  <p className="text-xs text-creator-muted mt-1">Pay with cash when your order is delivered.</p>
                </div>
                <div className="w-6 h-6 rounded-full border-[5px] border-creator-accent"></div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isProcessing || cartItems.length === 0}
              className="w-full bg-creator-accent text-white py-5 text-sm uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isProcessing ? 'Processing Order...' : `Place Order (COD)`}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-8 bg-creator-surface p-8 border border-creator-border">
            <h2 className="text-lg font-medium mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white flex-shrink-0 border border-creator-border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-creator-muted">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-creator-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-creator-muted">
                <span>Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between text-creator-muted">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
            </div>
            
            <div className="border-t border-creator-border mt-4 pt-4 flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="text-2xl font-light">${cartTotal}</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Checkout;