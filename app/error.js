'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-80px)] relative overflow-hidden bg-white">
      
      {/* Mascot */}
      <div className="relative mb-10 z-10">
        <div 
          className="w-[140px] h-[140px] bg-[var(--color-primary)] relative"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          {/* Eyes (X shapes for error state) */}
          <div className="absolute top-[45%] left-[28%] w-[16px] h-[3px] bg-gray-900 rounded-full rotate-45"></div>
          <div className="absolute top-[45%] left-[28%] w-[16px] h-[3px] bg-gray-900 rounded-full -rotate-45"></div>
          
          <div className="absolute top-[45%] right-[28%] w-[16px] h-[3px] bg-gray-900 rounded-full rotate-45"></div>
          <div className="absolute top-[45%] right-[28%] w-[16px] h-[3px] bg-gray-900 rounded-full -rotate-45"></div>
          
          {/* Mouth */}
          <div className="absolute top-[62%] left-1/2 -translate-x-1/2 w-[22px] h-[3px] bg-gray-900 rounded-full"></div>
        </div>
        {/* Whiskers (Left) */}
        <div className="absolute top-3 -left-3 w-[20px] h-[3px] bg-gray-900 rotate-[45deg] rounded-full"></div>
        <div className="absolute top-7 -left-5 w-[20px] h-[3px] bg-gray-900 rotate-[20deg] rounded-full"></div>
        <div className="absolute top-12 -left-6 w-[20px] h-[3px] bg-gray-900 -rotate-[5deg] rounded-full"></div>
        
        {/* Whiskers (Right) */}
        <div className="absolute top-3 -right-3 w-[20px] h-[3px] bg-gray-900 -rotate-[45deg] rounded-full"></div>
        <div className="absolute top-7 -right-5 w-[20px] h-[3px] bg-gray-900 -rotate-[20deg] rounded-full"></div>
        <div className="absolute top-12 -right-6 w-[20px] h-[3px] bg-gray-900 rotate-[5deg] rounded-full"></div>
      </div>

      <h1 className="text-[52px] md:text-[68px] font-bold text-gray-900 leading-none tracking-tight mb-5 z-10">
        Oops!
      </h1>
      
      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900 mb-4 z-10 text-center px-4">
        Something went wrong
      </h2>
      
      <p className="text-gray-500 max-w-lg text-center mb-10 text-[15px] md:text-[16px] leading-relaxed px-6 z-10">
        {error.message || "We encountered an unexpected error or the server might be down. Please try again in a few moments."}
      </p>

      <div className="flex items-center gap-4 mb-16 z-10">
        <button
          onClick={() => reset()}
          className="bg-gray-900 hover:bg-black text-white font-semibold px-6 py-2.5 rounded-full text-[14px] transition-all border border-transparent shadow-sm"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-2.5 rounded-full text-[14px] transition-all border border-transparent"
        >
          Go back home
        </Link>
      </div>

    </div>
  );
}
