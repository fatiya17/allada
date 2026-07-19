import ProductDetail from "@/components/ProductDetail";

export default function ProductPage({ params }) {
  // Dummy product fetching
  const product = {
    "id": "cmrhexiyh007t1j0cqt5xuzfu",
    "name": "Xiaomi 17T Pro 12GB + 256GB",
    "slug": "xiaomi-17t-pro-12gb-256gb",
    "description": "Xiaomi 17T Pro 12GB + 256GB is a device from Xiaomi for work, entertainment, and connected daily use. This device brings quiet warmth to every interaction, sitting easily in the hand with a generous 5000mAh battery. Finished with a subtle reactive glaze on its Gorilla Glass back, no two devices are exactly alike.",
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
      "id": "cmrhexibp00011j0cvhhy2y5g",
      "name": "Jakarta Gadget Center",
      "slug": "jakarta-gadget-center",
      "description": "A gadget shop focused on phones, wearables, and accessories from major technology brands.",
      "city": "Jakarta",
      "rating": 4.6,
      "isOfficial": true,
      "logoUrl": "https://placehold.co/240x240?text=Jakarta%20Gadget%20Center",
      "status": "Active",
      "createdAt": "2026-07-12T06:28:56.198Z",
      "updatedAt": "2026-07-12T06:28:56.198Z",
      "productCount": 8
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

  return (
    <main className="min-h-screen bg-white">
      <ProductDetail product={product} />
    </main>
  );
}
