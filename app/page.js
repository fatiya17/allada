import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  // Dummy product array based on the provided data payload
  const dummyProduct = {
    "id": "cmrhexiyh007t1j0cqt5xuzfu",
    "name": "Xiaomi 17T Pro 12GB + 256GB",
    "slug": "xiaomi-17t-pro-12gb-256gb",
    "description": "Xiaomi 17T Pro 12GB + 256GB is a device from Xiaomi for work, entertainment, and connected daily use, presented with official product imagery.",
    "price": 11999000,
    "stock": 4,
    "rating": 4.7,
    "imageUrl": "https://i02.appmifile.com/610_item_id/18/05/2026/97bc5feb6235945eb176ed602560aa6f.png?q=85&thumb=1&w=500",
    "discountPercentage": 5,
    "isFeatured": false,
    "isNewArrival": false,
    "condition": "New",
    "createdAt": "2026-07-12T06:28:57.017Z",
    "updatedAt": "2026-07-12T06:28:57.017Z",
    "storeId": "cmrhexibq00081j0cr6ivnvkn",
    "categoryId": "cmrhexice000h1j0ctervhz1y",
    "brandId": "cmrhexicq00111j0c3g6rgq23",
    "store": {
      "id": "cmrhexibq00081j0cr6ivnvkn",
      "name": "TechnoMart Indonesia",
      "slug": "technomart-indonesia",
      "city": "Jakarta",
      "isOfficial": true,
      "rating": 4.5
    },
    "category": {
      "id": "cmrhexice000h1j0ctervhz1y",
      "name": "Electronics",
      "slug": "electronics"
    },
    "brand": {
      "id": "cmrhexicq00111j0c3g6rgq23",
      "name": "Xiaomi",
      "slug": "xiaomi"
    }
  };

  const products = Array(8).fill(dummyProduct);

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Hero />
      <Categories />
      
      {/* Featured Products Section */}
      <section className="w-full px-4 md:px-8 py-8 md:py-12 bg-gray-50/50">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((prod, idx) => (
            <ProductCard key={`${prod.id}-${idx}`} product={prod} />
          ))}
        </div>
      </section>
    </main>
  );
}
