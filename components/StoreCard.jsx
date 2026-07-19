"use client";

import { Bookmark, Star, BadgeCheck } from "lucide-react";
import Link from "next/link";

export default function StoreCard({ store }) {
  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-2 flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Banner */}
      <div className="w-full h-20 sm:h-24 rounded-2xl relative overflow-hidden bg-gray-100">
        <img 
          src="/banner-stores.webp" 
          alt="Store Banner" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="px-3 pb-3 flex flex-col flex-1">
        {/* Avatar */}
        <div className="mt-[-28px]">
          <div className="w-14 h-14 rounded-full border-[3px] border-white overflow-hidden bg-white shadow-sm inline-block relative">
            <img 
              src={store.logoUrl} 
              alt={store.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title and Bookmark */}
        <div className="mt-1.5 flex justify-between items-start gap-3">
          <div>
            <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 leading-tight line-clamp-1">{store.name}</h3>
            <p className="text-gray-500 text-[11px] sm:text-[12px] mt-0.5 line-clamp-1">{store.description}</p>
          </div>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0 text-gray-600 hover:text-black hover:border-gray-300 transition-colors bg-white">
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 items-center mt-2.5">
          {store.isOfficial && (
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-blue-100">
              <BadgeCheck className="w-3 h-3 text-white fill-blue-500" />
              Official
            </span>
          )}
          <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-100">
            {store.status}
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-0 border-t border-b border-gray-100 py-2 my-3 text-center">
          <div className="border-r border-gray-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-0.5 font-extrabold text-[12px] sm:text-[13px] text-gray-900">
              <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
              {store.rating}
            </div>
            <span className="text-[9px] text-gray-500 mt-0.5 uppercase tracking-wider font-semibold">rating</span>
          </div>
          <div className="border-r border-gray-100 flex flex-col items-center justify-center">
            <span className="font-extrabold text-[12px] sm:text-[13px] text-gray-900">{store.productCount}+</span>
            <span className="text-[9px] text-gray-500 mt-0.5 uppercase tracking-wider font-semibold">products</span>
          </div>
          <div className="flex flex-col items-center justify-center px-1">
            <span className="font-extrabold text-[12px] sm:text-[13px] text-gray-900 line-clamp-1 truncate w-full">{store.city}</span>
            <span className="text-[9px] text-gray-500 mt-0.5 uppercase tracking-wider font-semibold">location</span>
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/stores/${store.slug}`} className="block mt-auto">
          <button className="w-full bg-black text-white font-bold rounded-xl py-2 text-[12px] sm:text-[13px] hover:bg-gray-800 transition-colors">
            Visit Store
          </button>
        </Link>
      </div>
    </div>
  );
}
