import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    // Explicitly open the cart when adding
    setIsCartOpen(true); 
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // This is the critical fix for the Navbar button
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, 
      isCartOpen, toggleCart, cartTotal, cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};