"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const conditions = [
  "New",
  "Used"
];

export default function ProductSidebar({ categoriesData = [], brandsData = [], filters, setFilters }) {
  
  // state untuk dropdown filter
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isConditionOpen, setIsConditionOpen] = useState(true);

  const handleReset = () => {
    setFilters({
      category: "",
      brand: "",
      condition: "",
      minPrice: "",
      maxPrice: ""
    });
  };

  return (
    <aside className="w-full flex-shrink-0 flex flex-col gap-8">
      {/* bagian kategori */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 h-12 flex items-center">
          Categories
        </h3>
        <div className="flex flex-col gap-2">
          {categoriesData.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-1">
              <button
                onClick={() => setFilters({ ...filters, category: filters.category === cat.slug ? "" : cat.slug })}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-md border transition-colors ${
                  filters.category === cat.slug
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-black font-semibold"
                    : "bg-white border-gray-200 hover:border-gray-400 text-gray-700"
                }`}
              >
                <span className="font-medium text-sm">{cat.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* bagian filter */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Filters
        </h3>
        <div className="flex flex-col gap-6 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          {/* harga */}
          <div>
            <p className="text-sm font-medium text-gray-900 mb-3">Price (Rp)</p>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full min-w-0 flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-center text-sm text-gray-700 focus:outline-none focus:border-gray-400"
                placeholder="Min"
              />
              <span className="text-gray-300">-</span>
              <input 
                type="number" 
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full min-w-0 flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-center text-sm text-gray-700 focus:outline-none focus:border-gray-400"
                placeholder="Max"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* merek */}
          <div>
            <button 
              className="flex items-center justify-between w-full mb-3"
              onClick={() => setIsBrandOpen(!isBrandOpen)}
            >
              <p className="text-sm font-medium text-gray-900">Brand</p>
              {isBrandOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {isBrandOpen && (
              <div className="flex flex-col gap-2">
                {brandsData.map((brand) => (
                  <label key={brand.id} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="brand" 
                      value={brand.name}
                      checked={filters.brand === brand.name}
                      onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      filters.brand === brand.name ? "border-gray-900 bg-gray-900" : "border-gray-300 group-hover:border-gray-500"
                    }`}>
                      {filters.brand === brand.name && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={`text-sm ${filters.brand === brand.name ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                      {brand.name}
                    </span>
                  </label>
                ))}
                <button className="text-left text-xs text-gray-500 hover:text-gray-900 mt-1">More</button>
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* kondisi */}
          <div>
            <button 
              className="flex items-center justify-between w-full mb-3"
              onClick={() => setIsConditionOpen(!isConditionOpen)}
            >
              <p className="text-sm font-medium text-gray-900">Condition</p>
              {isConditionOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {isConditionOpen && (
              <div className="flex flex-col gap-2">
                {conditions.map((condition) => (
                  <label key={condition} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="condition" 
                      value={condition}
                      checked={filters.condition === condition}
                      onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      filters.condition === condition ? "border-gray-900 bg-gray-900" : "border-gray-300 group-hover:border-gray-500"
                    }`}>
                      {filters.condition === condition && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={`text-sm ${filters.condition === condition ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                      {condition}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* tombol aksi */}
          <div className="flex flex-col lg:flex-row gap-2 mt-2">
            <button 
              onClick={handleReset}
              className="w-full lg:flex-1 rounded-md border border-gray-200 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 h-10 text-sm font-medium transition-colors"
            >
              Reset
            </button>
            <button className="w-full lg:flex-1 rounded-md bg-[var(--color-primary)] text-black hover:brightness-95 border-none h-10 text-sm font-semibold transition-all">
              Apply
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
