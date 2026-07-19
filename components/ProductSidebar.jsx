"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const categories = [
  {
    name: "Electronics",
    open: true,
    items: [
      "Smartphones",
      "Laptops",
      "Tablets",
      "Accessories",
      "Cameras"
    ],
  },
  {
    name: "Fashion",
    open: false,
    items: ["Men", "Women", "Kids", "Shoes"],
  },
  {
    name: "Beauty",
    open: false,
    items: ["Skincare", "Makeup", "Haircare", "Fragrance"],
  },
  {
    name: "Home Appliances",
    open: false,
    items: ["Kitchen", "Cleaning", "Cooling", "Lighting"],
  }
];

const brands = [
  "Xiaomi",
  "Samsung",
  "Apple",
  "Sony",
];

const conditions = [
  "New",
  "Used"
];

export default function ProductSidebar() {
  const [activeCategory, setActiveCategory] = useState("Electronics");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  
  // Filter Dropdown States
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isConditionOpen, setIsConditionOpen] = useState(true);

  // Selected Filter States
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [minPrice, setMinPrice] = useState("50000");
  const [maxPrice, setMaxPrice] = useState("5000000");

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedCondition("");
    setActiveSubCategory("");
    setMinPrice("50000");
    setMaxPrice("5000000");
  };

  return (
    <aside className="w-full flex-shrink-0 flex flex-col gap-8">
      {/* Categories Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 h-12 flex items-center">
          Categories
        </h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col gap-1">
              <button
                onClick={() => setActiveCategory(activeCategory === cat.name ? "" : cat.name)}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-md border transition-colors ${
                  activeCategory === cat.name
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-black font-semibold"
                    : "bg-white border-gray-200 hover:border-gray-400 text-gray-700"
                }`}
              >
                <span className="font-medium text-sm">{cat.name}</span>
                {activeCategory === cat.name ? (
                  <ChevronUp className="w-4 h-4 text-black" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              
              {/* Dropdown Items */}
              {activeCategory === cat.name && (
                <div className="flex flex-col gap-2 pl-6 pr-4 py-2">
                  {cat.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveSubCategory(item)}
                      className={`text-left text-sm transition-colors py-0.5 ${
                        activeSubCategory === item ? "text-gray-900 font-bold" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Filters
        </h3>
        <div className="flex flex-col gap-6 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          {/* Price */}
          <div>
            <p className="text-sm font-medium text-gray-900 mb-3">Price (Rp)</p>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full min-w-0 flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-center text-sm text-gray-700 focus:outline-none focus:border-gray-400"
                placeholder="Min"
              />
              <span className="text-gray-300">-</span>
              <input 
                type="number" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full min-w-0 flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-center text-sm text-gray-700 focus:outline-none focus:border-gray-400"
                placeholder="Max"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Brands */}
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
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="brand" 
                      value={brand}
                      checked={selectedBrand === brand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      selectedBrand === brand ? "border-gray-900 bg-gray-900" : "border-gray-300 group-hover:border-gray-500"
                    }`}>
                      {selectedBrand === brand && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={`text-sm ${selectedBrand === brand ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                      {brand}
                    </span>
                  </label>
                ))}
                <button className="text-left text-xs text-gray-500 hover:text-gray-900 mt-1">More</button>
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Conditions */}
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
                      checked={selectedCondition === condition}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      selectedCondition === condition ? "border-gray-900 bg-gray-900" : "border-gray-300 group-hover:border-gray-500"
                    }`}>
                      {selectedCondition === condition && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={`text-sm ${selectedCondition === condition ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                      {condition}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
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
