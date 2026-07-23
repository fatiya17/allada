"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkle, Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, Apple } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError("");
    
    // Simulate API registration call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="flex-1 h-[calc(100vh-80px)] overflow-hidden bg-white flex items-center justify-center p-4 md:p-6">
      
      {/* Container */}
      <div className="w-full max-w-5xl h-full max-h-[580px] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 transition-all duration-300">
        
        {/* Left Column - Form */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-between py-4 px-2 md:px-6">
          
          {/* Form Content */}
          <div className="my-auto max-w-md w-full mx-auto lg:mx-0">
            
            <div className="mb-6">
              <h1 className="text-[32px] md:text-[38px] font-sans font-bold text-[var(--color-header-text)] leading-tight mb-1 tracking-tight">
                Create account
              </h1>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                Join us to find the freshest organic products and support local stores. Get started for free.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-2xl text-xs font-semibold border border-red-100 animate-shake">
                {error}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-1">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-1 focus:ring-black focus:border-black block px-5 py-3 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-1 focus:ring-black focus:border-black block px-5 py-3 pr-12 outline-none transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 disabled:opacity-50 text-white font-semibold py-3 px-5 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-sm border border-transparent cursor-pointer text-sm"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Create account</span>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center py-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-[11px] text-gray-400 font-medium">or sign up with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Social Sign Up - Circular Black Icons */}
              <div className="flex items-center justify-center gap-3">
                {/* Google */}
                <button
                  type="button"
                  className="w-10 h-10 bg-black text-white hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm group cursor-pointer"
                  title="Sign up with Google"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="currentColor" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                  </svg>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  className="w-10 h-10 bg-black text-white hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm group cursor-pointer"
                  title="Sign up with Apple"
                >
                  <Apple className="w-5 h-5 group-hover:scale-110 transition-transform fill-white text-white" />
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  className="w-10 h-10 bg-black text-white hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm group cursor-pointer"
                  title="Sign up with Facebook"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V2h-3a5 5 0 0 0-5 5v1z" fill="currentColor" />
                  </svg>
                </button>
              </div>

            </form>

          </div>

          {/* Footer Navigation */}
          <div className="text-center lg:text-left mt-4 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              Already a member?{" "}
              <Link href="/signup/coming-soon" className="font-semibold text-emerald-800 hover:text-emerald-950 hover:underline transition-colors">
                Log in
              </Link>
            </span>
          </div>

        </div>

        {/* Right Column - Illustration Container */}
        <div className="hidden lg:flex lg:w-1/2 h-full bg-[#f4f8f4] rounded-[24px] p-8 flex-col justify-between items-center relative overflow-hidden select-none">
          
          {/* Top Decorative Spark */}
          <div className="absolute top-6 left-6 text-emerald-800 opacity-20">
            <Sparkle className="w-6 h-6 fill-emerald-800" />
          </div>

          {/* Floating Profiles - Top Left */}
          <div className="absolute top-12 left-12 bg-white border border-gray-150 p-1.5 rounded-full shadow-md flex items-center gap-2 animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="w-7 h-7 rounded-full bg-[#ebd505] flex items-center justify-center font-bold text-xs text-black">A</div>
          </div>

          {/* Floating Profiles - Middle Right */}
          <div className="absolute top-1/2 right-8 -translate-y-1/2 bg-white border border-gray-150 p-1.5 rounded-full shadow-md flex items-center gap-2 animate-bounce" style={{ animationDuration: '5s' }}>
            <div className="w-7 h-7 rounded-full bg-[#8dd7c8] flex items-center justify-center font-bold text-xs text-emerald-900">B</div>
          </div>

          {/* Meditating Organic Shopping Illustration SVG */}
          <div className="flex-1 flex items-center justify-center w-full relative">
            
            {/* The Main Open-Source Style SVG */}
            <svg viewBox="0 0 400 400" className="w-full max-w-[260px] h-auto drop-shadow-sm">
              
              {/* Background circular halo */}
              <circle cx="200" cy="210" r="100" fill="none" stroke="#e0eedc" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="200" cy="210" r="125" fill="none" stroke="#e0eedc" strokeWidth="1.5" strokeDasharray="4 8" />
              
              {/* Plant Leaves / Decorative organic shapes */}
              <path d="M 290,130 C 270,120 250,140 260,165 C 270,190 300,180 290,130 Z" fill="#e2eedc" />
              <path d="M 285,135 L 270,160" stroke="#455a21" strokeWidth="1.5" strokeLinecap="round" />
              
              <path d="M 100,150 C 120,135 140,155 130,180 C 120,205 90,195 100,150 Z" fill="#ebd505" fillOpacity="0.4" />
              <path d="M 105,155 L 120,180" stroke="#455a21" strokeWidth="1.5" strokeLinecap="round" />

              {/* Meditating Person Outline */}
              {/* Torso/Shirt */}
              <path d="M 175,210 L 225,210 L 235,260 L 165,260 Z" fill="#8dd7c8" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
              
              {/* Heart logo on Shirt */}
              <path d="M 200,237 C 200,237 193,230 193,225 C 193,221 196.5,218 200,221.5 C 203.5,218 207,221 207,225 C 207,230 200,237 200,237 Z" fill="#e98271" />

              {/* Neck */}
              <rect x="194" y="195" width="12" height="16" fill="#ffffff" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />

              {/* Head */}
              <circle cx="200" cy="170" r="25" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />
              
              {/* Hair */}
              <path d="M 175,170 C 175,140 225,140 225,170 C 220,155 180,155 175,170 Z" fill="#000000" />
              <path d="M 175,170 C 175,175 182,175 182,170" fill="none" stroke="#000000" strokeWidth="2" />
              <path d="M 225,170 C 225,175 218,175 218,170" fill="none" stroke="#000000" strokeWidth="2" />
              
              {/* Face Details */}
              {/* Eyes closed */}
              <path d="M 190,172 Q 194,176 197,172" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 203,172 Q 206,176 210,172" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              {/* Smile */}
              <path d="M 196,183 Q 200,188 204,183" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />

              {/* Meditating Arms */}
              {/* Left Arm */}
              <path d="M 175,215 Q 145,210 160,250 Q 155,230 170,225" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              {/* Right Arm */}
              <path d="M 225,215 Q 255,210 240,250 Q 245,230 230,225" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Left hand details (gyan mudra gesture) */}
              <circle cx="160" cy="254" r="5" fill="#ffffff" stroke="#000000" strokeWidth="2" />
              
              {/* Right hand details */}
              <circle cx="240" cy="254" r="5" fill="#ffffff" stroke="#000000" strokeWidth="2" />

              {/* Crossed Legs */}
              <path d="M 165,260 C 135,260 120,310 180,310 C 220,310 265,310 235,260" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 235,260 C 265,260 280,310 220,310 C 180,310 135,310 165,260" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Feet Details */}
              <circle cx="145" cy="300" r="6" fill="#ffffff" stroke="#000000" strokeWidth="2" />
              <circle cx="255" cy="300" r="6" fill="#ffffff" stroke="#000000" strokeWidth="2" />

            </svg>

            {/* Floating Canva Design-style Badge (Customized for Allada) */}
            <div className="absolute bottom-6 left-4 bg-white border border-gray-150 p-3.5 rounded-2xl shadow-lg flex flex-col gap-1.5 max-w-[155px] select-none hover:-translate-y-1 transition-transform duration-300">
              <span className="text-[12px] font-bold text-gray-900 leading-tight">Allada Organic</span>
              <span className="text-[9px] text-gray-400 font-semibold mb-0.5">100+ Local Stores</span>
              
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600">Fresh</span>
                {/* Micro progress indicator */}
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="14" cy="14" r="11" stroke="#f3f4f6" strokeWidth="2.5" fill="transparent" />
                    <circle cx="14" cy="14" r="11" stroke="#8dd7c8" strokeWidth="2.5" fill="transparent" strokeDasharray="69" strokeDashoffset="11" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-[8px] font-bold text-gray-700">84%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Content Area */}
          <div className="w-full text-center mt-4">
            
            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-4 h-1.5 rounded-full bg-black"></div>
            </div>

            {/* Title / Catchphrase */}
            <h3 className="text-lg font-serif font-bold text-[var(--color-header-text)] px-4 leading-snug">
              Make your shopping healthy and sustainable with Allada
            </h3>

          </div>

        </div>

      </div>

      {/* Success Modal Pop-up */}
      {success && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl border border-gray-100 animate-fade-in flex flex-col items-center">
            
            {/* Success Checkmark Illustration */}
            <div className="mb-5 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/check.svg" alt="Success Check" className="w-28 h-auto object-contain" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Account Created!</h3>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6">
              We've sent a verification email to <span className="font-semibold text-gray-900">{email}</span>.
            </p>
            
            <Link 
              href="/" 
              className="w-full bg-[var(--color-primary)] hover:brightness-95 text-black font-semibold py-3 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-sm text-sm"
            >
              <span>Go to Shop</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>

          </div>
        </div>
      )}

    </div>
  );
}
