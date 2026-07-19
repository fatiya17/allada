import StoreCard from "@/components/StoreCard";
import Link from "next/link";
import { getStores } from "@/lib/api";

export default async function StoresPage() {
  const stores = await getStores();

  return (
    <main className="flex-1 bg-white">
      <div className="w-full px-4 md:px-8 py-8 md:py-12 relative flex-1">
        
        {/* Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Official Stores</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Official Stores
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Discover verified merchants offering the best products and deals. Shop with confidence from our trusted partners.
          </p>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
        
      </div>
    </main>
  );
}
