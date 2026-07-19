import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import { getProducts, getStats, getCategories } from "@/lib/api";

export default async function Home({ searchParams }) {
  const resolvedParams = await searchParams || {};
  const category = resolvedParams.category;

  const [allProducts, stats, categoriesData] = await Promise.all([
    getProducts(),
    getStats(),
    getCategories()
  ]);

  let displayProducts = [];
  let sectionTitle = "Featured Products";

  if (category) {
    const selectedCat = categoriesData.find(c => c.slug === category);
    sectionTitle = selectedCat ? `${selectedCat.name} Products` : "Products";
    displayProducts = allProducts.filter(p => p.category?.slug === category);
  } else {
    displayProducts = allProducts.filter(p => p.isFeatured);
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {displayProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </main>
  );
}
