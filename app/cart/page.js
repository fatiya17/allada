"use client";

import { CheckSquare, Square, Gift, Tag, X, Minus, Plus, ArrowRight, Truck, Check, ArrowLeft, MapPin, CreditCard, ShieldCheck } from "lucide-react";
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
  const [isGiftWrapAdded, setIsGiftWrapAdded] = useState(false);
  const [giftWrapDetails, setGiftWrapDetails] = useState({ sender: "", recipient: "", message: "" });
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [tempGiftDetails, setTempGiftDetails] = useState({ sender: "", recipient: "", message: "" });

  // Checkout flow states
  const [step, setStep] = useState(1);
  const [addressData, setAddressData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    shippingMethod: "standard"
  });
  const [paymentMethod, setPaymentMethod] = useState("gopay");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [addressErrors, setAddressErrors] = useState({});

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
  const giftWrapCost = isGiftWrapAdded ? 20000 : 0;
  const shippingCost = addressData.shippingMethod === "express" ? 15000 : 0;
  const total = finalSubtotal + giftWrapCost + shippingCost;
  const totalDiscountPercentage = originalSubtotal > 0 ? Math.round((totalDiscount / originalSubtotal) * 100) : 0;

  const validateAddress = () => {
    const errors = {};
    if (!addressData.name.trim()) errors.name = "Recipient Name is required";
    if (!addressData.phone.trim()) errors.phone = "Phone number is required";
    if (!addressData.address.trim()) errors.address = "Detailed address is required";
    if (!addressData.city.trim()) errors.city = "City / District is required";
    if (!addressData.postalCode.trim()) errors.postalCode = "Postal code is required";
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (selectedItems.length === 0) {
        alert("Please select at least one item to proceed.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (validateAddress()) {
        setStep(3);
      }
    } else if (step === 3) {
      // Hapus produk yang dibeli dari keranjang
      selectedIds.forEach(id => removeFromCart(id));
      setSelectedIds(new Set());
      setOrderSuccess(true);
    }
  };

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

  if (orderSuccess) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="max-w-md w-full text-center py-12 flex flex-col items-center gap-6">
          <img src="/check.svg" alt="Success Check" className="w-20 h-20" />
          <div>
            <h2 className="text-3xl font-sans font-extrabold text-gray-900 mb-3">Order Confirmed!</h2>
            <p className="text-sm text-gray-500">
              Thank you for your purchase. Your order has been placed and is being processed.
            </p>
          </div>
          <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100 text-left flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-bold text-gray-900">#AD-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Recipient Name:</span>
              <span className="font-semibold text-gray-900">{addressData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Payment:</span>
              <span className="font-bold text-gray-900">{formatIDR(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-semibold text-gray-900 uppercase">{paymentMethod.replace("_", " ")}</span>
            </div>
          </div>
          <Link 
            href="/products"
            className="w-full bg-[var(--color-primary)] hover:brightness-95 text-black py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
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
            <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold relative z-10 ${step >= 1 ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>
              {step > 1 ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} /> : "1"}
            </div>
            <span className={`text-xs md:text-sm font-bold ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Cart</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold relative z-10 ${step >= 2 ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>
              {step > 2 ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} /> : "2"}
            </div>
            <span className={`text-xs md:text-sm font-bold ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Address</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold relative z-10 ${step >= 3 ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>
              3
            </div>
            <span className={`text-xs md:text-sm font-bold ${step >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
        {/* kolom kiri */}
        <div className="flex flex-col gap-6">
          {step === 1 && (
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
          )}

          {step === 2 && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
              <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                <MapPin className="w-5 h-5 text-black" />
                Shipping Address
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Recipient Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jane Doe"
                    value={addressData.name}
                    onChange={(e) => {
                      setAddressData(prev => ({ ...prev, name: e.target.value }));
                      if (addressErrors.name) setAddressErrors(prev => ({ ...prev, name: null }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-gray-900 ${addressErrors.name ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {addressErrors.name && <span className="text-xs text-red-500">{addressErrors.name}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. +628123456789"
                    value={addressData.phone}
                    onChange={(e) => {
                      setAddressData(prev => ({ ...prev, phone: e.target.value }));
                      if (addressErrors.phone) setAddressErrors(prev => ({ ...prev, phone: null }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-gray-900 ${addressErrors.phone ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {addressErrors.phone && <span className="text-xs text-red-500">{addressErrors.phone}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Detailed Address *</label>
                <textarea 
                  placeholder="Street Name, Building, House Number, etc."
                  rows={3}
                  value={addressData.address}
                  onChange={(e) => {
                    setAddressData(prev => ({ ...prev, address: e.target.value }));
                    if (addressErrors.address) setAddressErrors(prev => ({ ...prev, address: null }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-gray-900 resize-none ${addressErrors.address ? 'border-red-500' : 'border-gray-200'}`}
                />
                {addressErrors.address && <span className="text-xs text-red-500">{addressErrors.address}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">City / District *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jakarta Selatan"
                    value={addressData.city}
                    onChange={(e) => {
                      setAddressData(prev => ({ ...prev, city: e.target.value }));
                      if (addressErrors.city) setAddressErrors(prev => ({ ...prev, city: null }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-gray-900 ${addressErrors.city ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {addressErrors.city && <span className="text-xs text-red-500">{addressErrors.city}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Postal Code *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 12345"
                    value={addressData.postalCode}
                    onChange={(e) => {
                      setAddressData(prev => ({ ...prev, postalCode: e.target.value }));
                      if (addressErrors.postalCode) setAddressErrors(prev => ({ ...prev, postalCode: null }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-gray-900 ${addressErrors.postalCode ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {addressErrors.postalCode && <span className="text-xs text-red-500">{addressErrors.postalCode}</span>}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Delivery Service
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`border rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all ${addressData.shippingMethod === 'standard' ? 'border-black bg-gray-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="standard"
                      checked={addressData.shippingMethod === 'standard'}
                      onChange={() => setAddressData(prev => ({ ...prev, shippingMethod: 'standard' }))}
                      className="mt-1 accent-black"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900">Standard Delivery</span>
                      <span className="text-xs text-gray-500 mt-0.5">3-5 business days</span>
                      <span className="text-xs font-bold text-green-600 mt-1">FREE</span>
                    </div>
                  </label>
                  <label className={`border rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all ${addressData.shippingMethod === 'express' ? 'border-black bg-gray-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="express"
                      checked={addressData.shippingMethod === 'express'}
                      onChange={() => setAddressData(prev => ({ ...prev, shippingMethod: 'express' }))}
                      className="mt-1 accent-black"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900">Express Delivery</span>
                      <span className="text-xs text-gray-500 mt-0.5">1-2 business days</span>
                      <span className="text-xs font-bold text-gray-900 mt-1">{formatIDR(15000)}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
              <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                <CreditCard className="w-5 h-5 text-black" />
                Select Payment Method
              </h3>

              <div className="flex flex-col gap-3">
                {/* GoPay */}
                <label className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'gopay' ? 'border-black bg-gray-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="gopay"
                      checked={paymentMethod === 'gopay'}
                      onChange={() => setPaymentMethod('gopay')}
                      className="accent-black"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900">GoPay / E-Wallet</span>
                      <span className="text-xs text-gray-500 mt-0.5">Pay instantly using GoPay or ShopeePay</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg">Instant</span>
                </label>

                {/* Bank Transfer */}
                <label className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-black bg-gray-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                      className="accent-black"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900">Bank Transfer (VA)</span>
                      <span className="text-xs text-gray-500 mt-0.5">BCA, Mandiri, BNI, or BRI Virtual Account</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">Manual/Auto</span>
                </label>

                {/* Credit Card */}
                <label className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'credit_card' ? 'border-black bg-gray-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={() => setPaymentMethod('credit_card')}
                      className="accent-black"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900">Credit / Debit Card</span>
                      <span className="text-xs text-gray-500 mt-0.5">Visa, Mastercard, or JCB</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-purple-50 text-purple-600 rounded-lg">Secured</span>
                </label>

                {/* COD */}
                <label className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-black bg-gray-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-black"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900">COD (Cash on Delivery)</span>
                      <span className="text-xs text-gray-500 mt-0.5">Pay in cash when delivery arrives</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-600 rounded-lg">Cash</span>
                </label>
              </div>

              <div className="border-t border-gray-100 pt-6 flex flex-col gap-3">
                <h4 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Delivery details confirmation
                </h4>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col gap-2 text-sm text-gray-700">
                  <p><span className="font-semibold text-gray-900">Recipient:</span> {addressData.name} ({addressData.phone})</p>
                  <p><span className="font-semibold text-gray-900">Address:</span> {addressData.address}, {addressData.city}, {addressData.postalCode}</p>
                  <p><span className="font-semibold text-gray-900">Shipping:</span> {addressData.shippingMethod === 'express' ? 'Express' : 'Standard'} Delivery</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* kolom kanan: ringkasan */}
        <div className="flex flex-col gap-6">
          <div className="hidden lg:block h-[36px]"></div>
          
          <div className="md:sticky md:top-8 flex flex-col gap-6 lg:gap-8 max-w-full">
            {/* bagian diskon - Hanya muncul di step 1 */}
            {step === 1 && (
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
            )}

            {/* bagian hadiah - Hanya muncul di step 1 */}
            {step === 1 && (
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">Gifting</h3>
                {!isGiftWrapAdded ? (
                  <div className="bg-[var(--color-promo-bg)] rounded-2xl p-5 relative overflow-hidden flex flex-col gap-2 shadow-sm border border-purple-50">
                    <Gift className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 text-[var(--color-promo-icon)] opacity-90" />
                    <h4 className="font-bold text-gray-900 text-lg relative z-10">Buying for a loved one?</h4>
                    <p className="text-sm text-gray-600 max-w-[75%] relative z-10 mb-2">
                      Send personalized message on card along with a gift wrapper at {formatIDR(20000)}
                    </p>
                    <button 
                      onClick={() => {
                        setTempGiftDetails(giftWrapDetails);
                        setIsGiftModalOpen(true);
                      }}
                      className="text-left text-[var(--color-promo-text)] font-bold text-sm hover:underline relative z-10 w-fit"
                    >
                      Add gift wrap
                    </button>
                  </div>
                ) : (
                  <div className="bg-[var(--color-promo-bg)] rounded-2xl p-5 relative overflow-hidden flex flex-col gap-2 shadow-sm border border-purple-100">
                    <Gift className="absolute right-4 top-4 w-12 h-12 text-[var(--color-promo-icon)] opacity-20" />
                    <h4 className="font-bold text-gray-900 text-lg relative z-10">Gift Wrapper Added!</h4>
                    <div className="text-sm text-gray-700 relative z-10 flex flex-col gap-1 mt-1">
                      <p><span className="font-semibold">To:</span> {giftWrapDetails.recipient || "-"}</p>
                      <p><span className="font-semibold">From:</span> {giftWrapDetails.sender || "-"}</p>
                      <p className="italic text-gray-500 mt-1">"{giftWrapDetails.message || "No message"}"</p>
                    </div>
                    <div className="flex gap-4 mt-3 relative z-10">
                      <button 
                        onClick={() => {
                          setTempGiftDetails(giftWrapDetails);
                          setIsGiftModalOpen(true);
                        }}
                        className="text-[var(--color-promo-text)] font-bold text-sm hover:underline"
                      >
                        Edit details
                      </button>
                      <button 
                        onClick={() => {
                          setIsGiftWrapAdded(false);
                          setGiftWrapDetails({ sender: "", recipient: "", message: "" });
                        }}
                        className="text-red-500 font-bold text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

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

                {isGiftWrapAdded && (
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span>Gift Wrap & Card</span>
                    <span className="text-gray-900 font-bold">{formatIDR(20000)}</span>
                  </div>
                )}

                {addressData.shippingMethod === "express" && step >= 2 && (
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span>Express Shipping</span>
                    <span className="text-gray-900 font-bold">{formatIDR(15000)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                  <span className="font-bold text-gray-900 text-xl">{formatIDR(total)}</span>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <button 
                    onClick={handleNextStep}
                    className="w-full h-[54px] bg-[var(--color-primary)] hover:brightness-95 text-black rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all"
                  >
                    {step === 1 && "Place order"}
                    {step === 2 && "Proceed to Payment"}
                    {step === 3 && "Confirm & Pay"}
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {step > 1 && (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="w-full py-2.5 text-gray-500 hover:text-black font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {step === 2 ? "Back to Cart" : "Back to Address"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Wrap Modal */}
      {isGiftModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl flex flex-col gap-4 border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[var(--color-promo-icon)]" />
                Gift Wrap Details
              </h3>
              <button 
                onClick={() => setIsGiftModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-gray-500">
              Please enter the recipient and sender details along with a personalized greeting card.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsGiftWrapAdded(true);
                setGiftWrapDetails(tempGiftDetails);
                setIsGiftModalOpen(false);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Recipient Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Jane Doe"
                  value={tempGiftDetails.recipient}
                  onChange={(e) => setTempGiftDetails(prev => ({ ...prev, recipient: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-promo-icon)] focus:ring-1 focus:ring-[var(--color-promo-icon)] text-gray-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Sender Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  value={tempGiftDetails.sender}
                  onChange={(e) => setTempGiftDetails(prev => ({ ...prev, sender: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-promo-icon)] focus:ring-1 focus:ring-[var(--color-promo-icon)] text-gray-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Personalized Message</label>
                <textarea 
                  required
                  placeholder="Type your warm wishes here..."
                  rows={3}
                  value={tempGiftDetails.message}
                  onChange={(e) => setTempGiftDetails(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-promo-icon)] focus:ring-1 focus:ring-[var(--color-promo-icon)] resize-none text-gray-900"
                />
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button 
                  type="button"
                  onClick={() => setIsGiftModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[var(--color-promo-icon)] hover:bg-[var(--color-promo-text)] text-white text-sm font-bold transition-all"
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
