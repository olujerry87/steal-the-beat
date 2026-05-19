"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } =
    useCartStore();

  const [coupon, setCoupon] = useState("");

  const count = totalItems();
  const total = totalPrice();
  const shipping = total > 150 ? 0 : 15;

  return (
    <div className="min-h-screen bg-brand-offwhite pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 section-label text-black/40 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft size={13} />
            Continue Shopping
          </Link>
          <div className="flex items-end justify-between">
            <div>
              <p className="section-label text-black/30 mb-3">Review Your Order</p>
              <h1 className="font-cursive text-[clamp(3rem,8vw,7rem)] text-black leading-none">
                Cart
                {count > 0 && (
                  <span className="ml-4 font-cursive text-3xl text-black/30">
                    ({count})
                  </span>
                )}
              </h1>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="section-label text-black/30 hover:text-red-500 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <ShoppingBag size={48} className="text-black/15 mb-6" />
            <h2 className="font-cursive text-4xl text-black/30 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-black/40 text-sm font-light mb-10 max-w-xs">
              Looks like you haven&apos;t added anything yet. Explore the
              collection and find your next piece.
            </p>
            <Link
              href="/shop"
              className="btn-dark inline-flex items-center gap-2 group"
            >
              Shop Now
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
              <ul className="divide-y divide-black/8 border-t border-black/8">
                <AnimatePresence initial={false}>
                  {items.map((item) => {
                    const image = item.product.images?.[0];
                    const key = `${item.product.id}-${item.selectedSize}`;
                    return (
                      <motion.li
                        key={key}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="py-6 flex gap-6"
                      >
                        <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden bg-white border border-black/8">
                          {image ? (
                            <Image
                              src={image.src}
                              alt={image.alt || item.product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-cursive text-black/15 text-xl">
                              STB
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <p className="section-label text-black/35 mb-1">
                                {item.product.categories?.[0]?.name ?? "Merch"}
                              </p>
                              <Link
                                href={`/shop/${item.product.slug}`}
                                className="text-black font-light text-sm hover:text-black/60 transition-colors leading-snug line-clamp-2"
                              >
                                {item.product.name}
                              </Link>
                              <div className="flex gap-4 mt-1">
                                {item.selectedSize && (
                                  <span className="section-label text-black/30">
                                    Size: {item.selectedSize}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="section-label text-black/30">
                                    Color: {item.selectedColor}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="font-medium text-black flex-shrink-0 text-sm">
                              $
                              {(
                                parseFloat(item.product.price) * item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>

                          <div className="flex items-center gap-6 mt-4">
                            <div className="flex items-center border border-black/12">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.selectedSize
                                  )
                                }
                                className="p-2 text-black/35 hover:text-black transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-4 text-xs font-medium text-black min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.selectedSize
                                  )
                                }
                                className="p-2 text-black/35 hover:text-black transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() =>
                                removeItem(item.product.id, item.selectedSize)
                              }
                              className="flex items-center gap-1.5 section-label text-black/25 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={12} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-black/8 p-8 sticky top-24">
                <h2 className="font-cursive text-3xl text-black mb-8">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-black/45 font-light">Subtotal</span>
                    <span className="text-black font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-black/45 font-light">Shipping</span>
                    <span className="text-black font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {total <= 150 && (
                    <p className="text-[11px] text-black/40 font-light">
                      Add ${(150 - total).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                {/* Coupon */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 bg-brand-offwhite border border-black/12 text-black text-xs px-3 py-2.5 placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                    />
                    <button className="btn-dark text-[10px] px-4 py-2">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-baseline border-t border-black/8 pt-5 mb-6">
                  <span className="section-label text-black/40">Total</span>
                  <span className="font-semibold text-xl text-black">
                    ${(total + shipping).toFixed(2)}
                  </span>
                </div>

                <button className="btn-dark w-full flex items-center justify-center gap-2 group">
                  Proceed to Checkout
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <p className="text-center text-black/30 text-xs font-light mt-5 leading-relaxed">
                  Secure checkout · Worldwide delivery · 30-day returns
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
