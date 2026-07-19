"use client";

import { CheckSquare, Square, Gift, Tag, X, Minus, Plus, ArrowRight, Truck, Check } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/lib/api";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [products, setProducts] = useState(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem('cart_products_cache');
      return cached ? JSON.parse(cached) : [];
    }
    return [];
  });
  
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem('cart_products_cache');
    }
    return true;
  });

  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    async function loadProducts() {
      // gunakan cache agar ui tidak terhambat
      if (products.length > 0) return;
      
      setIsLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        sessionStorage.setItem('cart_products_cache', JSON.stringify(data));
      } catch (e) {
        console.error(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [products.length]);

  // gabungkan data keranjang dengan detail produk
  const cartWithData = useMemo(() => {
    return cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product
      };
    }).filter(item => item.product); // hapus jika produk tidak ditemukan
  }, [cartItems, products]);

  // centang otomatis item baru atau ikuti parameter dari url
  useEffect(() => {
    if (cartWithData.length > 0 && selectedIds.size === 0) {
      const params = new URLSearchParams(window.location.search);
      const selectId = params.get('select');
      
      if (selectId && cartWithData.some(item => item.productId === selectId)) {
        setSelectedIds(new Set([selectId]));
      } else {
        setSelectedIds(new Set(cartWithData.map(item => item.productId)));
      }
    }
  }, [cartWithData]);

  const formatIDR = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getFinalPrice = (product) => {
    return product.discountPercentage > 0 
      ? product.price * (1 - (product.discountPercentage / 100)) 
      : product.price;
  };

  const selectedItems = cartWithData.filter((item) => selectedIds.has(item.productId));
  const originalSubtotal = selectedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const finalSubtotal = selectedItems.reduce((acc, item) => acc + getFinalPrice(item.product) * item.quantity, 0);
  const totalDiscount = originalSubtotal - finalSubtotal;
  const total = finalSubtotal;
  const totalDiscountPercentage = originalSubtotal > 0 ? Math.round((totalDiscount / originalSubtotal) * 100) : 0;

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === cartWithData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cartWithData.map(item => item.productId)));
    }
  };

  const handleRemoveSelected = () => {
    selectedIds.forEach(id => removeFromCart(id));
    setSelectedIds(new Set());
  };

  if (isLoading) {
    return (
      <main className="flex-1 bg-white flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (cartWithData.length === 0) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Browse our products and find something you love!</p>
          <Link 
            href="/products"
            className="bg-[var(--color-primary)] hover:brightness-95 text-black px-8 py-3.5 rounded-full font-bold text-[15px] transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      {/* penunjuk langkah */}
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
        {/* kolom kiri: daftar item */}
        <div className="flex flex-col gap-6">
          <>
            {/* header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3 cursor-pointer" onClick={toggleSelectAll}>
                  {selectedIds.size === cartWithData.length && cartWithData.length > 0 ? (
                    <div className="w-5 h-5 bg-black rounded-[4px] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </div>
                  ) : selectedIds.size > 0 ? (
                    <CheckSquare className="w-5 h-5 text-black" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-300" />
                  )}
                  <span className="font-bold text-gray-900 text-[13px] md:text-base">
                    {selectedIds.size}/{cartWithData.length} items selected
                  </span>
                </div>
                <div className="flex items-center font-semibold text-gray-900">
                  <button 
                    onClick={handleRemoveSelected}
                    className="hover:text-red-600 transition-colors text-[13px] md:text-sm"
                  >
                    Remove Selected
                  </button>
                </div>
              </div>

              {/* daftar barang */}
              <div className="flex flex-col gap-0 border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                {cartWithData.map((item, index) => (
                  <div 
                    key={item.productId} 
                    className={`flex gap-3 md:gap-4 p-3 md:p-4 bg-white relative ${index !== cartWithData.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    {/* gambar dan centang */}
                    <div className="w-[84px] h-[84px] md:w-[120px] md:h-[120px] shrink-0 bg-gray-50 rounded-2xl p-2 flex items-center justify-center relative">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSelect(item.productId);
                        }} 
                        className="absolute -top-1 -left-1 p-2 md:p-3 z-20 cursor-pointer"
                      >
                        {selectedIds.has(item.productId) ? (
                          <div className="w-5 h-5 bg-black rounded-[4px] flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <Square className="w-5 h-5 text-gray-300 bg-white rounded-[4px]" />
                        )}
                      </button>
                      <Link href={`/products/${item.product.slug}`} className="block relative w-full h-full aspect-square overflow-hidden flex items-center justify-center bg-gray-50">
                        {!item.product.imageUrl ? (
                          <div className="flex flex-col items-center justify-center text-gray-400 absolute inset-0 z-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            <span className="text-[9px] font-medium opacity-60">No Image</span>
                          </div>
                        ) : (
                          <>
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name} 
                              className="w-full h-full object-contain mix-blend-multiply absolute inset-0 z-10"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="hidden flex-col items-center justify-center text-gray-400 absolute inset-0 z-0">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                              <span className="text-[9px] font-medium opacity-60">No Image</span>
                            </div>
                          </>
                        )}
                      </Link>
                    </div>

                    {/* detail barang */}
                    <div className="flex flex-col flex-grow">
                      <div className="flex justify-between items-start gap-3 md:gap-4">
                        <Link href={`/products/${item.product.slug}`} className="font-bold text-gray-900 text-[13px] leading-snug md:text-[16px] hover:text-[var(--color-card-coral)] transition-colors">
                          {item.product.name}
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-400 hover:text-red-500 transition-colors shrink-0 -mt-0.5 md:mt-0"
                        >
                          <X className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                      
                      <p className="text-[11px] md:text-sm text-gray-500 mb-1.5 md:mb-2">Sold by: {item.product.store?.name || "Official Store"}</p>
                      
                      <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-semibold text-gray-600 mb-1.5 md:mb-2">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-200 rounded-sm inline-block"></span>
                          {item.product.category?.name || "General"}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-200 rounded-sm inline-block"></span>
                          {item.product.condition || "New"}
                        </span>
                      </div>

                      <div className="font-bold text-gray-900 text-[14px] md:text-[16px] mb-1">
                        {formatIDR(item.product.price)}
                      </div>

                      <div className="flex items-end justify-between mt-0.5 md:mt-1">
                        <div className="text-[10px] md:text-sm text-gray-500 flex items-center gap-1 md:gap-2">
                          <Truck className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" />
                          Express delivery in 3 days
                        </div>
                        
                        {/* tombol ubah jumlah */}
                        <div className="flex items-center gap-2 md:gap-3 border border-gray-200 rounded-full px-2 py-1 md:px-3 md:py-1.5 bg-gray-50">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                            className="text-gray-500 hover:text-black disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          </button>
                          <span className="font-bold text-xs md:text-sm w-3 md:w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                            className="text-gray-500 hover:text-black disabled:opacity-50"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
        </div>

        {/* kolom kanan: ringkasan */}
        <div className="flex flex-col gap-6">
          <div className="hidden lg:block h-[36px]"></div>
          
          <div className="md:sticky md:top-8 flex flex-col gap-6 lg:gap-8 max-w-full">
            {/* bagian diskon */}
            <div>
              <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                  <Tag className="w-5 h-5 text-gray-500" />
                  Discount
                </div>
                <div className="flex items-center gap-2 text-[var(--color-card-teal)] font-bold text-sm">
                  {totalDiscountPercentage > 0 ? `MAX500 (${totalDiscountPercentage}% OFF)` : 'MAX500'}
                  <button className="text-gray-400 hover:text-gray-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* bagian hadiah */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Gifting</h3>
              <div className="bg-[var(--color-promo-bg)] rounded-2xl p-5 relative overflow-hidden flex flex-col gap-2 shadow-sm border border-purple-50">
                <Gift className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 text-[var(--color-promo-icon)] opacity-90" />
                <h4 className="font-bold text-gray-900 text-lg relative z-10">Buying for a loved one?</h4>
                <p className="text-sm text-gray-600 max-w-[75%] relative z-10 mb-2">
                  Send personalized message on card along with a gift wrapper at {formatIDR(20000)}
                </p>
                <button className="text-left text-[var(--color-promo-text)] font-bold text-sm hover:underline relative z-10 w-fit">
                  Add gift wrap
                </button>
              </div>
            </div>

            {/* rincian harga */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Price Details</h3>
              <div className="bg-gray-50 rounded-3xl p-6 flex flex-col gap-4 border border-gray-100 shadow-sm">
                <div className="font-bold text-gray-900 mb-2">{selectedItems.length} items</div>
                
                {selectedItems.map(item => (
                  <div key={item.productId} className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span className="line-clamp-1 pr-4">{item.quantity} x {item.product.name}</span>
                    <span className="shrink-0 text-gray-900 font-bold">{formatIDR(item.product.price * item.quantity)}</span>
                  </div>
                ))}

                {totalDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600 pt-2 border-t border-gray-200">
                    <span>Product Discounts</span>
                    <span className="text-[var(--color-card-teal)] font-bold">-{formatIDR(totalDiscount)}</span>
                  </div>
                )}
                
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
    </div>
  );
}
