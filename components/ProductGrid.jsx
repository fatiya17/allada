"use client";

import ProductCard from "./ProductCard";

const mockProducts = [
  {
    id: "cmrhexiyh007t1j0cqt5xuzfu",
    name: "Xiaomi 17T Pro 12GB + 256GB",
    slug: "xiaomi-17t-pro-12gb-256gb",
    price: 11999000,
    rating: 4.7,
    imageUrl: "https://i02.appmifile.com/610_item_id/18/05/2026/97bc5feb6235945eb176ed602560aa6f.png?q=85&thumb=1&w=500",
    discountPercentage: 5,
    isFeatured: true,
    store: { city: "Jakarta", name: "TechnoMart Indonesia" },
    category: { name: "Electronics" },
  },
  {
    id: "prod-2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    price: 21999000,
    rating: 4.9,
    imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/id/2401/gallery/id-galaxy-s24-s928-sm-s928bztqxid-539294247?$650_519_PNG$",
    discountPercentage: 0,
    isFeatured: false,
    store: { city: "Surabaya", name: "Samsung Official" },
    category: { name: "Electronics" },
  },
  {
    id: "prod-3",
    name: "MacBook Air M2 8GB/256GB",
    slug: "macbook-air-m2-8gb-256gb",
    price: 18499000,
    rating: 4.8,
    imageUrl: "https://ibox.co.id/media/catalog/product/cache/21021443657732df3cbf244fc82fc9bb/m/b/mba_m2_starlight_1_2.jpg",
    discountPercentage: 10,
    isFeatured: false,
    store: { city: "Jakarta", name: "iBox Indonesia" },
    category: { name: "Electronics" },
  },
  {
    id: "prod-4",
    name: "Sony Alpha a7 IV Body Only",
    slug: "sony-alpha-a7-iv-body-only",
    price: 37999000,
    rating: 5.0,
    imageUrl: "https://doss.co.id/img/product/sony-alpha-a7-iv-mirrorless-camera-body-only-1-085718.jpg",
    discountPercentage: 0,
    isFeatured: true,
    store: { city: "Bandung", name: "DOSS Camera" },
    category: { name: "Electronics" },
  },
  {
    id: "prod-5",
    name: "Logitech MX Master 3S",
    slug: "logitech-mx-master-3s",
    price: 1549000,
    rating: 4.9,
    imageUrl: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-pale-grey.png?v=1",
    discountPercentage: 15,
    isFeatured: false,
    store: { city: "Jakarta", name: "Logitech Official" },
    category: { name: "Accessories" },
  },
  {
    id: "prod-6",
    name: "Apple AirPods Pro (2nd Gen)",
    slug: "apple-airpods-pro-2nd-gen",
    price: 3999000,
    rating: 4.8,
    imageUrl: "https://ibox.co.id/media/catalog/product/cache/21021443657732df3cbf244fc82fc9bb/m/q/mqd83_2_2.png",
    discountPercentage: 5,
    isFeatured: false,
    store: { city: "Jakarta", name: "iBox Indonesia" },
    category: { name: "Accessories" },
  }
];

export default function ProductGrid() {
  return (
    <div className="flex-1 flex flex-col gap-6">


      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
