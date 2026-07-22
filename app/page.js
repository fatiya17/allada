import { Suspense } from "react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductList from "@/components/ProductList";
import { getStats, getCategories } from "@/lib/api";

export default async function Home({ searchParams }) {
  const resolvedParams = await searchParams || {};
  const category = resolvedParams.category;

  const [stats, categoriesData] = await Promise.all([
    getStats(),
    getCategories()
  ]);

  let sectionTitle = "Featured Products";

  if (category) {
    const selectedCat = categoriesData.find(c => c.slug === category);
    sectionTitle = selectedCat ? `${selectedCat.name} Products` : "Products";
  }

  return (
    <main className="flex flex-col flex-1 bg-white">
      <Hero stats={stats} />
      <Categories categoriesData={categoriesData} />
      
      {/* Featured Products Section */}
      <section id="products-section" className="w-full px-4 md:px-8 py-8 md:py-12 bg-white scroll-mt-24">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{sectionTitle}</h2>
        </div>
        
        <Suspense 
          key={category} 
          fallback={
            <div className="w-full py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium text-sm">Memuat produk...</p>
            </div>
          }
        >
          <ProductList category={category} />
        </Suspense>
      </section>
    </main>
  );
}
