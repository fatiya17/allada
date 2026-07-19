"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getProducts } from "@/lib/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // muat keranjang dari localstorage saat awal
  useEffect(() => {
    const saved = localStorage.getItem("alldae_cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // simpan keranjang ke localstorage saat ada perubahan
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("alldae_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // ambil data produk di awal agar keranjang cepat dimuat
  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('cart_products_cache')) {
      getProducts()
        .then(data => {
          if (data && data.length > 0) {
            sessionStorage.setItem('cart_products_cache', JSON.stringify(data));
          }
        })
        .catch(e => console.error("Prefetch products failed", e));
    }
  }, []);

  const addToCart = (productId, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

