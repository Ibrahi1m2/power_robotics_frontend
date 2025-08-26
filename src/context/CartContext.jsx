import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);

    // Load wishlist items from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(savedWishlist);
  }, []);

  const addToCart = (product) => {
    // Generate a unique ID for the cart item
    const cartItemId = `${product.id}-${Date.now()}`;
    
    // Create cart item with unique ID and ensure price is a number
    const cartItem = {
      ...product,
      price: Number(product.price),
      cartItemId, // Add unique cart item ID
      quantity: 1 // Add quantity field
    };

    const updatedCart = [...cartItems, cartItem];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return true; // Return true to indicate success
  };

  const removeFromCart = (cartItemId) => {
    const updatedCart = cartItems.filter(item => item.cartItemId !== cartItemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    const updatedCart = cartItems.map(item => 
      item.cartItemId === cartItemId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const addToWishlist = (product) => {
    const updatedWishlist = [...wishlistItems, { ...product, price: Number(product.price) }];
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    return true; // Return true to indicate success
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        cartCount: cartItems.length,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 