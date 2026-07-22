import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";

export default async function ProductList({ category }) {
  const allProducts = await getProducts();
  
  let displayProducts = [];

  if (category) {
    displayProducts = allProducts.filter(p => p.category?.slug === category);
  } else {
    displayProducts = allProducts.filter(p => p.isFeatured);
  }

  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-medium w-full">
        Tidak ada produk di kategori ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {displayProducts.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
}
