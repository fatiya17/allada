import ProductsLayout from "@/components/ProductsLayout";
import { getProducts, getCategories, getBrands } from "@/lib/api";

export default async function ProductsPage() {
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands()
  ]);

  return (
    <main className="flex-1 bg-white">
      <ProductsLayout products={products} categories={categories} brands={brands} />
    </main>
  );
}
