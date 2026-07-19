import Link from "next/link";

import { Smartphone, Shirt, Home, Coffee, Book, Monitor, ShoppingBag, Watch, Camera, Headphones } from "lucide-react";

export default function Categories({ categoriesData = [] }) {
  const iconClass = "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-800";
  
  // pilihan warna dan ikon untuk kategori dari api
  const colors = ["category-blue", "category-orange", "category-teal", "category-coral"];
  
  const icons = [
    <Smartphone className={iconClass} />,
    <Shirt className={iconClass} />,
    <Home className={iconClass} />,
    <Coffee className={iconClass} />,
    <Book className={iconClass} />,
    <Monitor className={iconClass} />,
    <ShoppingBag className={iconClass} />,
    <Watch className={iconClass} />,
    <Camera className={iconClass} />,
    <Headphones className={iconClass} />
  ];

  const displayCategories = categoriesData.map((cat, idx) => ({
    ...cat,
    color: colors[idx % colors.length],
    icon: icons[idx % icons.length]
  }));

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
        {displayCategories.map((cat) => (
          <Link 
            href={`/?category=${cat.slug}#products-section`}
            key={cat.id} 
            className="relative shrink-0 snap-start w-auto h-[45px] sm:h-[50px] lg:h-[55px] rounded-lg md:rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            {/* latar belakang kanan yang lebih terang */}
            <div className={`absolute inset-0 ${cat.color} opacity-40`}></div>
            
            {/* latar belakang kiri dengan potongan miring dan bayangan */}
            <div className={`absolute -top-4 -left-6 w-[75%] h-[150%] ${cat.color} -skew-x-[15deg] shadow-[4px_0_15px_rgba(0,0,0,0.15)] z-0`}></div>
            
            {/* wadah konten */}
            <div className="relative w-full h-full flex flex-row items-center px-4 sm:px-5 gap-3 lg:gap-4 z-10">
              {/* nama kategori */}
              <div className="font-semibold text-[13px] sm:text-[14px] lg:text-[15px] text-gray-900 leading-snug whitespace-nowrap">
                {cat.name}
              </div>
              
              {/* ikon kategori */}
              <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
