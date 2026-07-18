"use client";

import { useState } from "react";
import { Star, ShoppingCart, Minus, Plus, Store, CheckCircle, MapPin, Package, BadgeCheck } from "lucide-react";

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  const originalPrice = product.price / (1 - (product.discountPercentage / 100));
  const formattedOriginalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(originalPrice);

  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity(prev => Math.min(product.stock, prev + 1));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-10">
      
      {/* Product Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-8 lg:gap-12">
        {/* Left: Image & Store */}
        <div className="self-start md:sticky md:top-8 flex flex-col gap-6">
          <div className="w-full bg-gray-50 rounded-[32px] overflow-hidden aspect-square flex items-center justify-center p-6 sm:p-10 border border-gray-100 relative group">
            {product.condition?.toLowerCase() === 'new' && (
              <span className="absolute top-5 left-5 md:top-6 md:left-6 px-3 py-1 bg-[var(--color-card-teal)] text-gray-900 text-sm font-semibold rounded-lg z-10 shadow-sm">
                New
              </span>
            )}
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-contain max-h-[300px] sm:max-h-[350px] lg:max-h-[400px] hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </div>

          {/* Store Profile Card */}
          <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                {product.store.logoUrl ? (
                  <img src={product.store.logoUrl} alt={product.store.name} className="w-full h-full object-cover" />
                ) : (
                  <Store className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-bold text-gray-900">{product.store.name}</h3>
                  {product.store.isOfficial && (
                    <span className="text-blue-600 text-[13px] font-bold flex items-center gap-1.5 ml-1">
                      <BadgeCheck className="w-4 h-4 text-white fill-blue-500" />
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-gray-600 font-medium">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {product.store.city}</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#f58322] fill-[#f58322]" /> {product.store.rating}</span>
                  <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-gray-400" /> {product.store.productCount || 0} Products</span>
                  <span className="text-teal-700 text-[10px] font-bold bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded-full">{product.store.status || 'Active'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-[#f58322] fill-[#f58322]" />
              <Star className="w-4 h-4 text-[#f58322] fill-[#f58322]" />
              <Star className="w-4 h-4 text-[#f58322] fill-[#f58322]" />
              <Star className="w-4 h-4 text-[#f58322] fill-[#f58322]" />
              <Star className="w-4 h-4 text-[#f58322] fill-[#f58322]" />
            </div>
            <span className="text-gray-600 font-medium text-sm">
              {product.rating} (128 Reviews)
            </span>
          </div>

          <div className="flex flex-wrap items-end gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-[var(--color-header-text)]">
              {formattedPrice}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through font-medium mb-1">
                  {formattedOriginalPrice}
                </span>
                <span className="bg-[var(--color-card-coral)] text-white text-xs font-bold px-2.5 py-1 rounded-md mb-1.5">
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>


          <p className="text-gray-600 leading-relaxed mb-8 mt-6">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-sm font-semibold text-gray-800">
              {product.brand.name}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-sm font-semibold text-gray-800">
              {product.category.name}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-sm font-semibold text-gray-800">
              Stock: {product.stock}
            </span>
          </div>

          {/* Quantity */}
          <div className="mb-4 mt-auto">
            <span className="block text-sm font-semibold text-gray-700 mb-2">Quantity</span>
            <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden h-[54px] w-fit">
              <button onClick={handleDecrease} className="w-12 h-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Minus className="w-5 h-5 text-gray-700" />
              </button>
              <span className="w-10 text-center font-bold text-gray-900 text-lg">
                {quantity}
              </span>
              <button onClick={handleIncrease} className="w-12 h-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Plus className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
            {/* Buy Now Button */}
            <button className="w-full sm:w-[220px] px-6 h-[54px] shrink-0 bg-[var(--color-primary)] hover:brightness-95 text-black rounded-full font-semibold text-base flex items-center justify-center transition-all">
              Buy Now
            </button>

            {/* Add to Cart Button */}
            <button className="w-full sm:w-auto px-6 h-[54px] shrink-0 border-2 border-gray-900 text-gray-900 font-semibold text-base rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
