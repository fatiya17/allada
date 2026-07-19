"use client";

import { useState } from "react";
import { Star, ShoppingCart, Minus, Plus, Store, CheckCircle, MapPin, Package, BadgeCheck, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const { addToCart } = useCart();

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  const originalPrice = product.price / (1 - (product.discountPercentage / 100));
  const formattedOriginalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(originalPrice);

  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity(prev => Math.min(product.stock, prev + 1));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-10">
      
      {/* Product Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-[33%_1fr] gap-8 lg:gap-12">
        {/* Left: Image & Store */}
        <div className="self-start md:sticky md:top-8 flex flex-col gap-6">
          <div className="w-full bg-gray-50 rounded-[32px] overflow-hidden aspect-square flex items-center justify-center p-6 sm:p-10 border border-gray-100 relative group">
            {product.condition?.toLowerCase() === 'new' && (
              <span className="absolute top-5 left-5 md:top-6 md:left-6 px-4 py-1.5 bg-[#d0e3f8] text-[#093e87] text-[11px] md:text-[13px] font-bold rounded-full z-10 tracking-wider uppercase">
                NEW
              </span>
            )}
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-contain max-h-[290px] sm:max-h-[340px] lg:max-h-[390px] hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </div>

          {/* Store Profile Card */}
          <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                  {product.store.logoUrl ? (
                    <img src={product.store.logoUrl} alt={product.store.name} className="w-full h-full object-cover" />
                  ) : (
                    <Store className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-teal-700 text-[9px] leading-tight font-bold bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded-full z-10 shadow-sm whitespace-nowrap">
                  {product.store.status || 'Active'}
                </span>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
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
            <span className="text-xl sm:text-4xl font-bold text-[var(--color-card-coral)]">
              {formattedPrice}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-sm sm:text-lg text-gray-400 line-through font-medium mb-0.5 sm:mb-1">
                  {formattedOriginalPrice}
                </span>
                <span className="bg-[var(--color-card-coral)] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md mb-1 sm:mb-1.5">
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

          {/* Action Row */}
          <div className="flex flex-row items-stretch sm:items-center gap-3 pt-2 mt-auto">
            {/* Buy Now Button */}
            <button 
              onClick={() => setShowBuyModal(true)}
              className="flex-1 sm:flex-none sm:w-[220px] px-6 h-[54px] shrink-0 bg-[var(--color-primary)] hover:brightness-95 text-black rounded-full font-semibold text-base flex items-center justify-center transition-all"
            >
              Buy Now
            </button>

            {/* Add to Cart Button */}
            <button 
              onClick={() => addToCart(1)}
              className="w-[54px] h-[54px] sm:w-auto sm:px-6 shrink-0 border-2 border-gray-900 text-gray-900 font-semibold text-base rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200 shadow-xl">
            <button 
              onClick={() => setShowBuyModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-6">Confirm Purchase</h3>
            
            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
              <img src={product.imageUrl} alt={product.name} className="w-[75px] h-[75px] object-contain bg-gray-50 rounded-xl p-1" />
              <div>
                <h4 className="text-lg font-bold text-gray-900 line-clamp-2 mb-1">{product.name}</h4>
                <div className="font-bold text-[var(--color-card-coral)]">{formattedPrice}</div>
              </div>
            </div>

            <div className="mb-8">
              <span className="block text-sm font-semibold text-gray-700 mb-3">Quantity</span>
              <div className="flex items-center justify-between border-2 border-gray-200 rounded-2xl p-2">
                <button onClick={handleDecrease} className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors">
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                <span className="w-16 text-center font-bold text-gray-900 text-xl">
                  {quantity}
                </span>
                <button onClick={handleIncrease} className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors">
                  <Plus className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <button 
              onClick={() => {
                alert(`Purchased ${quantity} items!`);
                setShowBuyModal(false);
              }}
              className="w-full h-[54px] bg-[var(--color-primary)] hover:brightness-95 text-black rounded-full font-semibold text-base transition-all"
            >
              Confirm Buy ({quantity} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
