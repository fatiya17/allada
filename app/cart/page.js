"use client";

import { CheckSquare, Square, Gift, Tag, X, Minus, Plus, ArrowRight, Truck, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const dummyCartItems = [
  {
    id: 1,
    name: "Cute worm baby toys",
    store: "Sobti Overseas",
    age: "1-2 yr",
    gender: "Girl",
    price: 45200,
    delivery: "Express delivery in 3 days",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80",
    quantity: 1,
    selected: true,
  },
  {
    id: 2,
    name: "Cute snail baby toys",
    store: "Sobti Overseas",
    age: "1-5 yr",
    gender: "Girl",
    price: 55100,
    delivery: "Express delivery in 3 days",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80",
    quantity: 1,
    selected: true,
  },
  {
    id: 3,
    name: "Plush toys for babies",
    store: "Vision Star",
    age: "1-2 yr",
    gender: "Girl",
    price: 25600,
    delivery: "Express delivery in 3 days",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80",
    quantity: 1,
    selected: false,
  },
  {
    id: 4,
    name: "Cute crab baby toys",
    store: "Vision Star",
    age: "1-4 yr",
    gender: "Girl",
    price: 16240,
    delivery: "Express delivery in 3 days",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80",
    quantity: 1,
    selected: false,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(dummyCartItems);

  const formatIDR = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const selectedItems = items.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal > 0 ? 25000 : 0; // dummy discount
  const total = subtotal - discount;

  const toggleSelect = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const toggleSelectAll = () => {
    const allSelected = items.every(item => item.selected);
    setItems(items.map(item => ({ ...item, selected: !allSelected })));
  };

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Stepper Header */}
      <div className="max-w-3xl mx-auto py-8 px-4 flex justify-center">
        <div className="flex w-2/3 justify-between relative z-0">
          <div className="absolute top-[15px] left-[15px] right-[15px] h-[1px] bg-gray-200 -z-10"></div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center text-xs font-bold relative z-10">1</div>
            <span className="text-xs md:text-sm font-bold text-gray-900">Cart</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[30px] h-[30px] bg-white border border-gray-200 text-gray-400 rounded-full flex items-center justify-center text-xs font-bold relative z-10">2</div>
            <span className="text-xs md:text-sm font-medium text-gray-400">Address</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[30px] h-[30px] bg-white border border-gray-200 text-gray-400 rounded-full flex items-center justify-center text-xs font-bold relative z-10">3</div>
            <span className="text-xs md:text-sm font-medium text-gray-400">Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
        {/* Left Column: Cart Items */}
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={toggleSelectAll}>
              {items.every(i => i.selected) ? (
                <div className="w-5 h-5 bg-black rounded-[4px] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
              ) : items.some(i => i.selected) ? (
                <CheckSquare className="w-5 h-5 text-black" />
              ) : (
                <Square className="w-5 h-5 text-gray-300" />
              )}
              <span className="font-bold text-gray-900 text-[13px] md:text-base">
                {selectedItems.length}/{items.length} items selected
              </span>
            </div>
            <div className="flex items-center font-semibold text-gray-900">
              <button className="hover:text-gray-600 transition-colors text-[13px] md:text-sm">Remove</button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex flex-col gap-0 border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex gap-3 md:gap-4 p-3 md:p-4 bg-white relative ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                {/* Image & Checkbox */}
                <div className="w-[84px] h-[84px] md:w-[120px] md:h-[120px] shrink-0 bg-gray-50 rounded-2xl p-2 flex items-center justify-center relative">
                  <button onClick={() => toggleSelect(item.id)} className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10">
                    {item.selected ? (
                      <div className="w-5 h-5 bg-black rounded-[4px] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <Square className="w-5 h-5 text-gray-300 bg-white rounded-[4px]" />
                    )}
                  </button>
                  <img src={item.image} alt={item.name} className="w-full max-h-full object-contain mix-blend-multiply" />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-3 md:gap-4">
                    <h3 className="font-bold text-gray-900 text-[13px] leading-snug md:text-[16px]">{item.name}</h3>
                    <button className="text-gray-400 hover:text-gray-900 transition-colors shrink-0 -mt-0.5 md:mt-0">
                      <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                  
                  <p className="text-[11px] md:text-sm text-gray-500 mb-1.5 md:mb-2">Sold by: {item.store}</p>
                  
                  <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-semibold text-gray-600 mb-1.5 md:mb-2">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-200 rounded-sm inline-block"></span>
                      {item.age}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-200 rounded-sm inline-block"></span>
                      {item.gender}
                    </span>
                  </div>

                  <div className="font-bold text-gray-900 text-[14px] md:text-[16px] mb-1">
                    {formatIDR(item.price)}
                  </div>

                  <div className="flex items-end justify-between mt-0.5 md:mt-1">
                    <div className="text-[10px] md:text-sm text-gray-500 flex items-center gap-1 md:gap-2">
                      <Truck className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" />
                      {item.delivery}
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 md:gap-3 border border-gray-200 rounded-full px-2 py-1 md:px-3 md:py-1.5 bg-gray-50">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-black">
                        <Minus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      </button>
                      <span className="font-bold text-xs md:text-sm w-3 md:w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-black">
                        <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="flex flex-col gap-6">
          <div className="hidden lg:block h-[36px]"></div>
          {/* Discount Section */}
          <div>
            <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                <Tag className="w-5 h-5 text-gray-500" />
                Discount
              </div>
              <div className="flex items-center gap-2 text-[var(--color-card-teal)] font-bold text-sm">
                MAX500
                <button className="text-gray-400 hover:text-gray-900">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Gifting Section */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Gifting</h3>
            <div className="bg-[#f5f0ff] rounded-2xl p-5 relative overflow-hidden flex flex-col gap-2 shadow-sm border border-purple-50">
              <Gift className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 text-[#8b5cf6] opacity-90" />
              <h4 className="font-bold text-gray-900 text-lg relative z-10">Buying for a loved one?</h4>
              <p className="text-sm text-gray-600 max-w-[75%] relative z-10 mb-2">
                Send personalized message on card along with a gift wrapper at {formatIDR(20000)}
              </p>
              <button className="text-left text-[#6d28d9] font-bold text-sm hover:underline relative z-10 w-fit">
                Add gift wrap
              </button>
            </div>
          </div>

          {/* Price Details */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Price Details</h3>
            <div className="bg-[#f9fafb] rounded-3xl p-6 flex flex-col gap-4 border border-gray-100 shadow-sm">
              <div className="font-bold text-gray-900 mb-2">{selectedItems.length} items</div>
              
              {selectedItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm font-medium text-gray-600">
                  <span className="line-clamp-1 pr-4">{item.quantity} x {item.name}</span>
                  <span className="shrink-0 text-gray-900 font-bold">{formatIDR(item.price * item.quantity)}</span>
                </div>
              ))}

              <div className="flex justify-between items-center text-sm font-medium text-gray-600 pt-2 border-t border-gray-200">
                <span>Coupon discount</span>
                <span className="text-[var(--color-card-teal)] font-bold">-{formatIDR(discount)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                <span>Delivery Charges</span>
                <span className="text-gray-900 font-bold">Free Delivery</span>
              </div>

              <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
                <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                <span className="font-bold text-gray-900 text-xl">{formatIDR(total)}</span>
              </div>

              <button className="w-full h-[54px] bg-[var(--color-primary)] hover:brightness-95 text-black rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all mt-4">
                Place order
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
