import ProductDetail from "@/components/ProductDetail";
import { getProduct, getStoreProducts } from "@/lib/api";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
      </main>
    );
  }

  // Sinkronisasi data jumlah produk toko dari API
  const storeProducts = await getStoreProducts(product.store.id);
  product.store.productCount = storeProducts.length;

  return (
    <main className="flex-1 bg-white">
      <ProductDetail product={product} />
    </main>
  );
}
