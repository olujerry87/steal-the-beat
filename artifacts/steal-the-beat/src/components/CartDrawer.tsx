"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const count = totalItems();
  const total = totalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
              <div className="flex items-center gap-3">
                <ShoppingBag size={17} className="text-black" />
                <span className="section-label text-black tracking-[0.25em]">
                  Your Cart
                </span>
                {count > 0 && (
                  <span className="bg-black text-white text-[9px] font-medium px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-black/30 hover:text-black transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-5">
                  <ShoppingBag size={36} className="text-black/15" />
                  <div>
                    <p className="font-cursive text-3xl text-black mb-2">
                      Empty Cart
                    </p>
                    <p className="text-black/40 text-sm font-light">
                      Add some pieces to get started.
                    </p>
                  </div>
                  <Link href="/shop" onClick={closeCart} className="btn-dark mt-2">
                    Shop Now
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-black/6">
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
                          transition={{ duration: 0.25 }}
                          className="flex gap-4 py-5"
                        >
                          <div className="relative w-[72px] h-24 flex-shrink-0 overflow-hidden bg-brand-offwhite border border-black/8">
                            {image ? (
                              <Image
                                src={image.src}
                                alt={image.alt || item.product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-cursive text-black/20 text-2xl">
                                STB
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-black text-sm font-light leading-snug mb-1 line-clamp-2">
                              {item.product.name}
                            </p>
                            {item.selectedSize && (
                              <p className="section-label text-black/35 mb-2">
                                Size: {item.selectedSize}
                              </p>
                            )}
                            <p className="text-black text-sm font-medium">
                              ${item.product.price}
                            </p>

                            <div className="flex items-center gap-3 mt-3">
                              <div className="flex items-center border border-black/12">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1,
                                      item.selectedSize
                                    )
                                  }
                                  className="p-1.5 text-black/35 hover:text-black transition-colors"
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="px-3 text-xs font-medium text-black min-w-[2rem] text-center">
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
                                  className="p-1.5 text-black/35 hover:text-black transition-colors"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                              <button
                                onClick={() =>
                                  removeItem(item.product.id, item.selectedSize)
                                }
                                className="p-1.5 text-black/25 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-black/8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="section-label text-black/40">Subtotal</span>
                  <span className="font-medium text-black text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-black/35 text-xs font-light">
                  Shipping calculated at checkout. Worldwide delivery available.
                </p>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn-dark w-full text-center"
                >
                  View Cart & Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
