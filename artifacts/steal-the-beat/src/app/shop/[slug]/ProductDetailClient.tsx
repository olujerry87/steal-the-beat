"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Check, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { WooProduct } from "@/lib/woocommerce";
import { SizeGuideModal } from "@/components/SizeGuideModal";

type Props = { product: WooProduct };

export function ProductDetailClient({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [added, setAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCartStore();

  const image = product.images?.[0];
  const isOutOfStock = product.stock_status === "outofstock";
  const sizeAttr = product.attributes?.find((a) => a.name === "Size");
  const colorAttr = product.attributes?.find((a) => a.name === "Color");

  const handleAddToCart = () => {
    addItem(product, { size: selectedSize, color: selectedColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-offwhite">
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          {/* Back */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 section-label text-black/40 hover:text-black transition-colors mb-10"
          >
            <ArrowLeft size={13} />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-white border border-black/8">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt || product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-cursive text-8xl text-black/10">STB</span>
                </div>
              )}
              {product.on_sale && (
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white text-[9px] uppercase tracking-[0.2em] px-2 py-1">
                    Sale
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="flex-1">
                <p className="section-label text-black/35 mb-4">
                  {product.categories?.[0]?.name ?? "Merch"}
                </p>
                <h1 className="font-cursive text-[clamp(2.5rem,6vw,5rem)] text-black leading-none mb-5">
                  {product.name}
                </h1>

                <div className="flex items-baseline gap-3 mb-6">
                  {product.on_sale && product.sale_price ? (
                    <>
                      <span className="text-2xl font-medium text-black">
                        ${product.sale_price}
                      </span>
                      <span className="text-black/30 text-lg line-through">
                        ${product.regular_price}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-medium text-black">
                      ${product.price}
                    </span>
                  )}
                </div>

                {product.short_description && (
                  <div
                    className="text-black/50 text-sm font-light leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{ __html: product.short_description }}
                  />
                )}

                {/* Color selector */}
                {colorAttr && colorAttr.options.length > 0 && (
                  <div className="mb-6">
                    <p className="section-label text-black/40 mb-3">
                      Colour
                      {selectedColor && (
                        <span className="text-black ml-2">{selectedColor}</span>
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {colorAttr.options.map((color) => (
                        <button
                          key={color}
                          onClick={() =>
                            setSelectedColor(color === selectedColor ? "" : color)
                          }
                          className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all duration-200 ${
                            selectedColor === color
                              ? "bg-black text-white border-black"
                              : "border-black/15 text-black/50 hover:border-black hover:text-black"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size selector */}
                {sizeAttr && sizeAttr.options.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <p className="section-label text-black/40">
                        Size
                        {selectedSize && (
                          <span className="text-black ml-2">{selectedSize}</span>
                        )}
                      </p>
                      <button
                        onClick={() => setSizeGuideOpen(true)}
                        className="text-[9px] uppercase tracking-[0.2em] text-black/35 hover:text-black underline underline-offset-2 transition-colors"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sizeAttr.options.map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            setSelectedSize(size === selectedSize ? "" : size)
                          }
                          className={`w-12 h-10 text-[10px] uppercase tracking-[0.1em] font-medium border transition-all duration-200 ${
                            selectedSize === size
                              ? "bg-black text-white border-black"
                              : "border-black/15 text-black/50 hover:border-black hover:text-black"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add to cart */}
              <div className="space-y-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full flex items-center justify-center gap-3 py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 ${
                    added
                      ? "bg-black text-white"
                      : isOutOfStock
                      ? "bg-black/10 text-black/30 cursor-not-allowed"
                      : "bg-black text-white hover:bg-white hover:text-black border border-black"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={14} /> Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={14} />
                        {isOutOfStock ? "Sold Out" : "Add to Cart"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <div className="flex gap-5 text-xs text-black/35 font-light pt-1">
                  <span>Worldwide Shipping</span>
                  <span>·</span>
                  <span>Secure Checkout</span>
                  <span>·</span>
                  <span>30-Day Returns</span>
                </div>
              </div>

              {/* Description accordion */}
              {product.description && (
                <details className="mt-8 border-t border-black/10 pt-6 group">
                  <summary className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-black/50 cursor-pointer list-none hover:text-black transition-colors">
                    Product Details
                    <ChevronDown
                      size={13}
                      className="text-black/30 group-open:rotate-180 transition-transform"
                    />
                  </summary>
                  <div
                    className="mt-4 text-black/45 text-sm font-light leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </details>
              )}
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
