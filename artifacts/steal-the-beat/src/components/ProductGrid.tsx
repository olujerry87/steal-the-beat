"use client";

import { ProductCard } from "./ProductCard";
import type { WooProduct } from "@/lib/woocommerce";

type Props = {
  products: WooProduct[];
  dark?: boolean;
};

export function ProductGrid({ products, dark = false }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <span className="font-cursive text-7xl text-black/10 mb-4">STB</span>
        <p className="section-label text-black/30">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} dark={dark} />
      ))}
    </div>
  );
}
