export default function Categories() {
  const iconClass = "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-800";
  const categories = [
    { id: 1, color: "category-blue", name: "Beauty", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> },
    { id: 2, color: "category-orange", name: "Beverages", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg> },
    { id: 3, color: "category-teal", name: "Book/Stationary", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> },
    { id: 4, color: "category-coral", name: "Electronics", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg> },
    { id: 5, color: "category-blue", name: "Fashion", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg> },
    { id: 6, color: "category-orange", name: "Groceries", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg> },
    { id: 7, color: "category-teal", name: "Home Appliances", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { id: 8, color: "category-coral", name: "Muslim Wear", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg> },
    { id: 9, color: "category-blue", name: "Snacks", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16h.01"/><path d="m2 16 20 6-6-20A20 20 0 0 0 2 16Z"/><path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"/></svg> },
    { id: 10, color: "category-orange", name: "Sports", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2Z"/></svg> },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-2 md:py-4">
      <div 
        className="flex overflow-x-auto flex-nowrap gap-3 sm:gap-4 md:gap-5 w-full pb-2 md:pb-0 snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`
          .flex::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="relative shrink-0 snap-start w-auto h-[45px] sm:h-[50px] lg:h-[55px] rounded-lg md:rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            {/* Lighter Right Side Background */}
            <div className={`absolute inset-0 ${cat.color} opacity-40`}></div>
            
            {/* Solid Left Side with Slant and Shadow */}
            <div className={`absolute -top-4 -left-6 w-[75%] h-[150%] ${cat.color} -skew-x-[15deg] shadow-[4px_0_15px_rgba(0,0,0,0.15)] z-0`}></div>
            
            {/* Content Container */}
            <div className="relative w-full h-full flex flex-row items-center px-4 sm:px-5 gap-3 lg:gap-4 z-10">
              {/* Category Name */}
              <div className="font-semibold text-[13px] sm:text-[14px] lg:text-[15px] text-gray-900 leading-snug whitespace-nowrap">
                {cat.name}
              </div>
              
              {/* Category Image / Icon */}
              <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
