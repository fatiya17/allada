"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  return (
    <div className="flex-1 flex flex-col gap-6">

      {/* grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
