import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, colorName = null, currentImage = null) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id && item.selectedColor === colorName
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.selectedColor === colorName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: currentImage || product.image_path,
        selectedColor: colorName,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (productId, colorName) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === productId && item.selectedColor === colorName)
      )
    );
  };

  const updateQuantity = (productId, colorName, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.selectedColor === colorName
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}