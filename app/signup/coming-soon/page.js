import Link from "next/link";

export default function SignUpComingSoonPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-80px)] relative overflow-hidden bg-white">
      
      {/* Mascot */}
      <div className="relative mb-10 z-10">
        <div 
          className="w-[140px] h-[140px] bg-[var(--color-primary)] relative"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          {/* Eyes */}
          <div className="absolute top-[48%] left-[32%] w-[16px] h-[3px] bg-gray-900 rounded-full rotate-6"></div>
          <div className="absolute top-[48%] right-[32%] w-[16px] h-[3px] bg-gray-900 rounded-full -rotate-6"></div>
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
        Sign Up
      </h1>
      
      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900 mb-4 z-10 text-center px-4">
        This feature is coming soon!
      </h2>
      
      <p className="text-gray-500 max-w-lg text-center mb-10 text-[15px] md:text-[16px] leading-relaxed px-6 z-10">
        We're working hard behind the scenes to bring you a seamless sign-up experience. But don't worry, we've got plenty of amazing products waiting for you!
      </p>

      <div className="flex items-center gap-4 mb-16 z-10">
        <Link 
          href="/" 
          className="bg-gray-900 hover:bg-black text-white font-semibold px-6 py-2.5 rounded-full text-[14px] transition-all border border-transparent shadow-sm"
        >
          Go back
        </Link>
        <Link 
          href="/products" 
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-2.5 rounded-full text-[14px] transition-all border border-transparent"
        >
          Browse products
        </Link>
      </div>

    </div>
  );
}
