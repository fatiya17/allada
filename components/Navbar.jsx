"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const { cartCount } = useCart();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-100 z-50">
      <nav className="flex items-center justify-between px-6 md:px-8 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-baseline">
          <span className="text-2xl font-serif font-extrabold text-black tracking-tighter">alldae</span>
          <svg
            className="ml-1"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill="#FDB871"
            />
          </svg>
        </Link>
      </div>

      {/* Nav Links & Desktop Search */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <Link
          href="/products"
          className="text-[15px] font-medium text-black hover:text-gray-600 transition flex items-center gap-1.5 shrink-0"
        >
          Products
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </Link>
        <Link
          href="/stores"
          className="text-[15px] font-medium text-black hover:text-gray-600 transition shrink-0"
        >
          Stores
        </Link>
        
        {/* Desktop Search Bar */}
        <div className="w-[300px] bg-gray-100 rounded-full px-4 h-10 flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 shrink-0"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search Products"
            className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <div 
          className={`md:hidden flex items-center h-10 transition-all duration-300 ease-in-out overflow-hidden ${
            isSearchOpen 
              ? "bg-gray-100 rounded-full px-4 gap-2 w-56" 
              : "bg-transparent rounded-none px-0 gap-0 w-8 justify-center"
          }`}
        >
          <button 
            className="text-black hover:text-gray-600 transition shrink-0 flex items-center justify-center w-8 h-8"
            onClick={() => setIsSearchOpen(true)}
          >
            <svg
              width={isSearchOpen ? "18" : "20"}
              height={isSearchOpen ? "18" : "20"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isSearchOpen ? "text-gray-400" : ""}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search Products" 
            className={`bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-300 ${
              isSearchOpen ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
            onBlur={() => setIsSearchOpen(false)}
          />
        </div>
        <Link href="/cart" className={`text-black hover:text-gray-600 transition relative ${isSearchOpen ? 'hidden md:block' : 'block'}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#e98271] text-white text-[9px] font-bold flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        <Link
          href="/products"
          className="hidden md:flex bg-[var(--color-primary)] text-black font-semibold px-5 py-2.5 rounded-full hover:brightness-95 transition items-center gap-2 text-sm"
        >
          Juice Up
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
        
        {/* Mobile Hamburger Button */}
        <button 
          className={`${isSearchOpen ? 'hidden' : 'flex'} md:hidden text-black hover:text-gray-600 transition`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>
    </nav>

    {/* Mobile Menu Dropdown */}
    {isMobileMenuOpen && (
      <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 flex flex-col px-6 py-6 gap-6 shadow-sm z-40">
        <Link href="/products" className="text-[15px] font-medium text-black flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
          Products
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </Link>
        <Link href="/stores" className="text-[15px] font-medium text-black" onClick={() => setIsMobileMenuOpen(false)}>
          Stores
        </Link>

        
        <div className="pt-4 border-t border-gray-100">
          <Link
            href="/products"
            className="bg-[var(--color-primary)] text-black font-semibold px-5 py-3 rounded-full flex items-center justify-center gap-2 text-sm w-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Juice Up
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    )}
    </header>
  );
}
