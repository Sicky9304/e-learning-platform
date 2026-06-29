import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (course) => {
    if (cart.some((item) => item._id === course._id)) {
      toast.error('Course is already in your cart!');
      return;
    }
    setCart((prev) => [...prev, course]);
    toast.success('Course added to cart! 🛒');
  };

  const removeFromCart = (courseId) => {
    setCart((prev) => prev.filter((item) => item._id !== courseId));
    toast.success('Course removed from cart.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (courseId) => {
    return cart.some((item) => item._id === courseId);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const cartCount = cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
