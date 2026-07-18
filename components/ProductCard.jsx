"use client";

import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="relative w-full bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 group cursor-pointer hover:shadow-md transition-all flex flex-col">
      
      {/* Discount Ribbon (Wraps around the card) */}
      {product.discountPercentage > 0 && (
        <>
          {/* Ribbon Fold (Kebelakang) */}
          <div 
            className="absolute z-10 bg-[#ad2630]"
            style={{
              top: '12px',
              left: '-6px',
              width: '6px',
              height: '6px',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
            }}
          ></div>
          
          {/* Main Ribbon */}
          <div className="absolute top-[18px] -left-[6px] bg-[#e62437] text-white px-2.5 py-1 rounded-r-lg text-[13px] font-extrabold shadow-sm z-20 tracking-tight">
            {product.discountPercentage}% off
          </div>
        </>
      )}

      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-t-3xl rounded-b-2xl overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain p-2 sm:p-3 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Ad Badge */}
        {product.isFeatured && (
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-bold z-10">
            Ad
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow">
        {/* Subtitle / Meta */}
        <div className="text-[12px] text-gray-500 font-medium mb-1.5 line-clamp-1">
          {product.store.city} • {product.category.name}
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-[13px] sm:text-[14px] lg:text-[15px] leading-snug line-clamp-2 mb-1">
          {product.name}
        </h3>
        
        <div className="flex-grow"></div>
        
        {/* Price and Rating Row */}
        <div className="flex items-center justify-between mt-1">
          {/* Price */}
          <div className="font-bold text-[var(--color-card-coral)] text-[13px] sm:text-[14px] lg:text-[15px]">
            {formattedPrice}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] sm:text-[12px] lg:text-[13px] font-bold text-gray-800 shrink-0 ml-2">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f58322]" fill="#f58322" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
