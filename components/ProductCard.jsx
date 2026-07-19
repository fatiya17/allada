"use client";

import { useState } from "react";
import { Star, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const originalPrice = product.price;
  const finalPrice = product.discountPercentage > 0 ? product.price * (1 - (product.discountPercentage / 100)) : product.price;

  const formattedFinalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(finalPrice);

  const formattedOriginalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(originalPrice);

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="relative w-full bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 group cursor-pointer hover:shadow-md transition-all flex flex-col"
    >
      
      {/* pita diskon (membungkus kartu) */}
      {product.discountPercentage > 0 && (
        <>
          {/* lipatan pita di belakang */}
          <div 
            className="absolute z-10 bg-[var(--color-discount-dark)]"
            style={{
              top: '12px',
              left: '-6px',
              width: '6px',
              height: '6px',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
            }}
          ></div>
          
          {/* pita utama */}
          <div className="absolute top-[18px] -left-[6px] bg-[var(--color-discount-main)] text-white px-2.5 py-1 rounded-r-lg text-[13px] font-extrabold shadow-sm z-20 tracking-tight">
            {product.discountPercentage}% off
          </div>
        </>
      )}

      {/* bagian gambar */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-t-3xl rounded-b-2xl overflow-hidden flex items-center justify-center">
        {(!product.imageUrl || imgError) ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
            <span className="text-[11px] font-medium opacity-60">No Image</span>
          </div>
        ) : (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-contain p-2 sm:p-3 group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}
        {product.isNewArrival && (
          <div className="absolute bottom-2 left-2 flex flex-col gap-1 z-10">
            <div className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm w-fit">
              New Arrival
            </div>
          </div>
        )}
      </div>

      {/* bagian konten */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow">
        {/* meta info */}
        <div className="text-[12px] text-gray-500 font-medium mb-1.5 line-clamp-1">
          {product.store.city} • {product.category.name}
        </div>
        
        {/* judul */}
        <h3 className="font-semibold text-gray-900 text-[13px] sm:text-[14px] lg:text-[15px] leading-snug line-clamp-2 mb-1">
          {product.name}
        </h3>
        
        <div className="flex-grow"></div>
        
        {/* baris harga dan rating */}
        <div className="flex items-center justify-between mt-1">
          {/* Price */}
          <div className="flex flex-col">
            <div className="font-bold text-[var(--color-card-coral)] text-[13px] sm:text-[14px] lg:text-[15px]">
              {formattedFinalPrice}
            </div>
            {product.discountPercentage > 0 && (
              <div className="text-gray-400 line-through text-[10px] sm:text-[11px] lg:text-[12px] font-medium -mt-0.5">
                {formattedOriginalPrice}
              </div>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] sm:text-[12px] lg:text-[13px] font-bold text-gray-800 shrink-0 ml-2">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-star)]" fill="var(--color-star)" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
