"use client";

import { useState } from "react";
import ProductSidebar from "@/components/ProductSidebar";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { Filter, X } from "lucide-react";
export default function ProductsPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full px-4 md:px-8 py-8 md:py-12 relative flex-1">
        
        {/* Breadcrumbs & Mobile Filter Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Products</span>
          </div>

          <button 
            className="lg:hidden flex items-center gap-2 text-sm font-medium bg-white px-3 py-1.5 rounded-md border border-gray-200 text-gray-900 hover:text-black transition-colors shadow-sm"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            All Products
          </h1>
          <form onSubmit={(e) => e.preventDefault()} className="relative w-full md:w-auto md:min-w-[320px] lg:min-w-[400px]">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full h-12 pl-6 pr-28 rounded-full border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-black transition-colors"
            />
            <button type="submit" className="absolute right-1 top-1 bottom-1 px-6 rounded-full bg-[var(--color-primary)] text-black font-semibold hover:brightness-95 transition-colors text-sm sm:text-base">
              Search
            </button>
          </form>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Mobile Overlay & Sidebar */}
          <div className={`
            fixed inset-0 z-50 lg:static lg:z-auto lg:block lg:w-72 lg:flex-shrink-0 lg:max-w-none
            ${isMobileFilterOpen ? 'block' : 'hidden'}
          `}>
            {/* Backdrop for mobile */}
            <div 
              className="absolute inset-0 bg-black/50 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            
            {/* Sidebar content */}
            <div className="absolute top-0 right-0 bottom-0 w-10/12 max-w-sm bg-gray-50 lg:bg-transparent overflow-y-auto p-6 lg:p-0 lg:static lg:w-full shadow-2xl lg:shadow-none transition-transform">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="font-bold text-xl text-gray-900">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>
              <ProductSidebar />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            <ProductGrid />
          </div>
        </div>
        
      </div>
    </div>
  );
}
