"use client";

import StoreCard from "@/components/StoreCard";
import Link from "next/link";

// Mock data based on the provided JSON structure
const mockStores = [
  {
    "id": "cmrhexibp00011j0cvhhy2y5g",
    "name": "Jakarta Gadget Center",
    "slug": "jakarta-gadget-center",
    "description": "A gadget shop focused on phones, wearables, and accessories from major technology brands.",
    "city": "Jakarta",
    "rating": 4.6,
    "isOfficial": true,
    "logoUrl": "https://placehold.co/240x240?text=JGC",
    "status": "Active",
    "createdAt": "2026-07-12T06:28:56.198Z",
    "updatedAt": "2026-07-12T06:28:56.198Z",
    "productCount": 128
  },
  {
    "id": "cmrhexibq00081j0cr6ivnvkn",
    "name": "TechnoMart Indonesia",
    "slug": "technomart-indonesia",
    "description": "Leading retailer for laptops, PCs, and home electronics with affordable prices.",
    "city": "Surabaya",
    "rating": 4.8,
    "isOfficial": true,
    "logoUrl": "https://placehold.co/240x240?text=TMI",
    "status": "Active",
    "createdAt": "2026-07-12T06:28:57.198Z",
    "updatedAt": "2026-07-12T06:28:57.198Z",
    "productCount": 450
  },
  {
    "id": "cmrhexibr000c1j0ct6ivnvko",
    "name": "Outfitters ID",
    "slug": "outfitters-id",
    "description": "Your daily fashion needs. Trendy and comfortable apparel.",
    "city": "Bandung",
    "rating": 4.5,
    "isOfficial": false,
    "logoUrl": "https://placehold.co/240x240?text=O-ID",
    "status": "Active",
    "createdAt": "2026-07-12T06:28:58.198Z",
    "updatedAt": "2026-07-12T06:28:58.198Z",
    "productCount": 85
  },
  {
    "id": "cmrhexibs000d1j0cx6ivnvkp",
    "name": "Beauty Essentials",
    "slug": "beauty-essentials",
    "description": "100% original skincare and makeup products.",
    "city": "Jakarta",
    "rating": 4.9,
    "isOfficial": true,
    "logoUrl": "https://placehold.co/240x240?text=BE",
    "status": "Active",
    "createdAt": "2026-07-12T06:28:59.198Z",
    "updatedAt": "2026-07-12T06:28:59.198Z",
    "productCount": 312
  }
];

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full px-4 md:px-8 py-8 md:py-12 relative flex-1">
        
        {/* Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Official Stores</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Official Stores
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Discover verified merchants offering the best products and deals. Shop with confidence from our trusted partners.
          </p>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {mockStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
        
      </div>
    </div>
  );
}
