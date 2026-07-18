import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-baseline">
          <span className="text-2xl font-serif font-extrabold text-black tracking-tighter">alldae</span>
          <svg
            className="ml-1"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill="#FDB871"
            />
          </svg>
        </Link>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/products"
          className="text-[15px] font-medium text-black hover:text-gray-600 transition flex items-center gap-1.5"
        >
          Products
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </Link>
        <Link
          href="/stores"
          className="text-[15px] font-medium text-black hover:text-gray-600 transition"
        >
          Stores
        </Link>
        <Link
          href="/categories"
          className="text-[15px] font-medium text-black hover:text-gray-600 transition"
        >
          Categories
        </Link>
        <Link
          href="/brands"
          className="text-[15px] font-medium text-black hover:text-gray-600 transition flex items-center gap-1.5"
        >
          Brands
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="text-black hover:text-gray-600 transition">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className="text-black hover:text-gray-600 transition relative">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#e98271] rounded-full translate-x-[2px] translate-y-[2px]"></span>
        </button>
        <Link
          href="/products"
          className="bg-[var(--color-primary)] text-black font-semibold px-5 py-2.5 rounded-full hover:brightness-95 transition flex items-center gap-2 text-sm"
        >
          Juice Up
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </nav>
  );
}
