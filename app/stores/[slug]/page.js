import { getStore, getStoreProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { BadgeCheck, Star, MapPin } from "lucide-react";

export default async function StorePage({ params }) {
  const { slug } = await params;
  
  // Fetch store and its products
  const [store, products] = await Promise.all([
    getStore(slug),
    getStoreProducts(slug)
  ]);

  if (!store) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Store Not Found</h1>
      </main>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Store Banner & Info Header */}
      <div className="w-full bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 flex gap-2 mb-8">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/stores" className="hover:text-black transition-colors">Stores</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{store.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:items-center bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
              <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{store.name}</h1>
                {store.isOfficial && (
                  <BadgeCheck className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <p className="text-gray-600 mb-4 max-w-2xl">{store.description}</p>
              
              <div className="flex flex-wrap gap-4 sm:gap-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{store.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{store.city}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-bold">{products.length} Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Products */}
      <div className="w-full px-4 md:px-8 py-8 md:py-12 relative flex-1 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Products from {store.name}</h2>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            No products found for this store.
          </div>
        )}
      </div>
    </div>
  );
}
