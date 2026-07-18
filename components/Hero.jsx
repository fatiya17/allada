import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full px-4 md:px-8 py-6">
      <div className="w-full rounded-[30px] md:rounded-[40px] bg-gradient-to-br from-[var(--color-hero-start)] from-10% to-[var(--color-hero-end)] to-90% p-6 md:p-8 lg:p-10 flex flex-row relative overflow-hidden min-h-[200px]">
        
        {/* Left Content */}
        <div className="flex flex-col items-start w-[75%] md:w-4/5 z-10">
          <h1 className="font-calvino text-[26px] sm:text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-black max-w-[900px]">
            Discover the ultimate <br /> destination for <span className="text-[var(--color-header-text)]">all your needs.</span>
          </h1>
          
          <p className="mt-2.5 sm:mt-4 md:mt-6 text-[13px] sm:text-base md:text-lg font-medium text-black max-w-[700px] w-[130%] md:w-auto">
            Explore thousands of premium products with <br className="hidden sm:block" /> unbeatable prices, exceptional quality, and fast.
          </p>
          
          <Link 
            href="/products" 
            className="mt-3 sm:mt-6 md:mt-8 bg-white/90 hover:bg-white transition text-black font-semibold rounded-full px-5 py-3 md:px-7 md:py-3.5 flex items-center w-fit gap-2 md:gap-3 text-sm"
          >
            Shop Now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-[18px] md:h-[18px]">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* Right Content / Badges */}
        <div className="w-[25%] md:w-1/5 flex flex-col items-end justify-between z-10">
          
          {/* Top Right: Brand Placeholder */}
          <div className="flex flex-col items-center">
            <span className="font-serif font-bold text-[10px] sm:text-lg md:text-2xl tracking-tighter text-[var(--color-header-text)] leading-none">alldae.</span>
            <span className="text-[5px] sm:text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-[var(--color-header-text)]/70 mt-0.5 md:mt-1">POWERED BY</span>
          </div>

          {/* Bottom Right: Discount Badge */}
          <div className="text-right flex flex-col items-end">
            <div className="text-[6px] sm:text-xs md:text-base font-bold text-[var(--color-header-text)]/80 uppercase tracking-widest mb-[-2px] md:mb-[-5px]">Up to</div>
            <div className="font-serif text-[24px] sm:text-[45px] md:text-[67px] lg:text-[75px] font-bold text-[var(--color-header-text)] leading-none">50%</div>
            <div className="text-[8px] sm:text-xs md:text-sm font-semibold text-[var(--color-header-text)]/90 mt-0.5 md:mt-2 max-w-[150px] md:ml-auto leading-tight">
              Discount on selected categories
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
