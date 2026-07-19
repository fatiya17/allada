"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, Search, ShoppingBag, ArrowRight, Menu, X, Sparkle } from "lucide-react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const { cartCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-100 z-50">
      <nav className="flex items-center justify-between px-6 md:px-8 py-4">
      {/* logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-baseline">
          <span className="text-2xl font-serif font-extrabold text-black tracking-tighter">allada</span>
          <Sparkle className="ml-0.5 w-3 h-3 text-[var(--color-card-orange)] fill-[var(--color-card-orange)]" />
        </Link>
      </div>

      {/* navigasi dan pencarian desktop */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <Link
          href="/products"
          className="text-[15px] font-medium text-black hover:text-gray-600 transition flex items-center gap-1.5 shrink-0"
        >
          Products
          <ChevronDown className="w-4 h-4 text-black" strokeWidth={2.5} />
        </Link>
        <Link
          href="/stores"
          className="text-[15px] font-medium text-black hover:text-gray-600 transition shrink-0"
        >
          Stores
        </Link>
        
        {/* kolom pencarian desktop */}
        <form onSubmit={handleSearch} className="w-[300px] bg-gray-100 rounded-full px-4 h-10 flex items-center gap-2">
          <Search className="w-[18px] h-[18px] text-gray-400 shrink-0" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
          />
        </form>
      </div>

      {/* tombol aksi */}
      <div className="flex items-center gap-6">
        <form 
          onSubmit={handleSearch}
          className={`md:hidden flex items-center h-10 transition-all duration-300 ease-in-out overflow-hidden ${
            isSearchOpen 
              ? "bg-gray-100 rounded-full px-4 gap-2 w-56" 
              : "bg-transparent rounded-none px-0 gap-0 w-8 justify-center"
          }`}
        >
          <button 
            type="button"
            className="text-black hover:text-gray-600 transition shrink-0 flex items-center justify-center w-8 h-8"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className={`w-[18px] h-[18px] md:w-5 md:h-5 ${isSearchOpen ? "text-gray-400" : ""}`} strokeWidth={2} />
          </button>
          
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-300 ${
              isSearchOpen ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
            onBlur={() => {
              // jeda sebentar agar tombol submit bisa diklik
              setTimeout(() => setIsSearchOpen(false), 200);
            }}
          />
        </form>
        <Link href="/cart" className={`text-black hover:text-gray-600 transition relative ${isSearchOpen ? 'hidden md:block' : 'block'}`}>
          <ShoppingBag className="w-5 h-5" strokeWidth={2} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--color-card-coral)] text-white text-[9px] font-bold flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        <Link
          href="/signup"
          className="hidden md:flex bg-[var(--color-primary)] text-black font-semibold px-5 py-2.5 rounded-full hover:brightness-95 transition items-center gap-2 text-sm"
        >
          Sign Up
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </Link>
        
        {/* tombol menu mobile */}
        <button 
          className={`${isSearchOpen ? 'hidden' : 'flex'} md:hidden text-black hover:text-gray-600 transition`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
        </button>
      </div>
    </nav>

    {/* menu dropdown mobile */}
    {isMobileMenuOpen && (
      <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 flex flex-col px-6 py-6 gap-6 shadow-sm z-40">
        <Link href="/products" className="text-[15px] font-medium text-black flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
          Products
          <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
        </Link>
        <Link href="/stores" className="text-[15px] font-medium text-black" onClick={() => setIsMobileMenuOpen(false)}>
          Stores
        </Link>

        
        <div className="pt-4 border-t border-gray-100">
          <Link
            href="/signup"
            className="bg-[var(--color-primary)] text-black font-semibold px-5 py-3 rounded-full flex items-center justify-center gap-2 text-sm w-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign Up
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    )}
    </header>
  );
}
