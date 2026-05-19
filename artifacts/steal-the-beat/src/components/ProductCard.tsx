"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { WooProduct } from "@/lib/woocommerce";
import { SizeGuideModal } from "@/components/SizeGuideModal";

type Props = {
  product: WooProduct;
  index?: number;
  dark?: boolean;
};

export function ProductCard({ product, index = 0, dark = false }: Props) {
  const { addItem } = useCartStore();
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const image = product.images?.[0];
  const isOutOfStock = product.stock_status === "outofstock";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) addItem(product);
  };

  const handleSizeGuide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSizeGuideOpen(true);
  };

  return (
    <>
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group ${
        dark
          ? "bg-zinc-900 border border-white/5"
          : "bg-white border border-black/8"
      }`}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        {/* Image */}
        <div
          className={`relative aspect-[3/4] overflow-hidden ${
            dark ? "bg-zinc-800" : "bg-brand-offwhite"
          }`}
        >
          {image ? (
            <Image
              src={image.src}
              alt={image.alt || product.name}
              fill
              priority={index < 4}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`font-cursive text-5xl ${
                  dark ? "text-white/15" : "text-black/12"
                }`}
              >
                STB
              </span>
            </div>
          )}

          {/* Hover overlay CTA */}
          <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center gap-2 bg-white text-black text-[10px] uppercase tracking-[0.25em] py-3 font-medium hover:bg-black hover:text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={11} />
              {isOutOfStock ? "Sold Out" : "Add to Cart"}
            </button>
          </div>

          {product.on_sale && product.sale_price && (
            <div className="absolute top-3 left-3">
              <span className="bg-black text-white text-[9px] uppercase tracking-[0.2em] px-2 py-1">
                Sale
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className={`p-4 ${dark ? "text-white" : "text-black"}`}>
          <p
            className={`section-label mb-1.5 ${
              dark ? "text-white/35" : "text-black/35"
            }`}
          >
            {product.categories?.[0]?.name ?? "Merch"}
          </p>
          <h3
            className={`text-sm font-light leading-snug mb-2.5 group-hover:opacity-60 transition-opacity duration-300 ${
              dark ? "text-white" : "text-black"
            }`}
          >
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {product.on_sale && product.sale_price ? (
                <>
                  <span
                    className={`text-sm font-medium ${dark ? "text-white" : "text-black"}`}
                  >
                    ${product.sale_price}
                  </span>
                  <span
                    className={`text-xs line-through ${dark ? "text-white/25" : "text-black/25"}`}
                  >
                    ${product.regular_price}
                  </span>
                </>
              ) : (
                <span
                  className={`text-sm font-medium ${dark ? "text-white" : "text-black"}`}
                >
                  ${product.price}
                </span>
              )}
            </div>
            <button
              onClick={handleSizeGuide}
              className={`section-label text-[8px] underline underline-offset-2 transition-opacity hover:opacity-100 ${
                dark ? "text-white/30 hover:text-white/70" : "text-black/30 hover:text-black/70"
              }`}
            >
              Size Guide
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
    </>
  );
}
