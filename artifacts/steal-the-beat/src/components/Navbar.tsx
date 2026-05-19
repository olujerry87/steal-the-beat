"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Hoodies", href: "/shop?category=hoodies" },
  { label: "Cargo Pants", href: "/shop?category=cargo-pants" },
  { label: "The Lab", href: "#the-lab" },
  { label: "Design Lab", href: "/design-lab", accent: true },
];

export function Navbar() {
  const { totalItems, toggleCart } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const count = mounted ? totalItems() : 0;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-sm border-b border-white/8"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 hover:opacity-70 transition-opacity duration-300">
              <Image
                src="/logo.png"
                alt="Steal the Beat by Blayke"
                width={56}
                height={56}
                style={{ height: "auto" }}
                className="brightness-0 invert"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) =>
                link.accent ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="section-label font-black border border-[#CCFF00]/40 px-3 py-1 transition-all duration-300 hover:border-[#CCFF00] hover:shadow-[0_0_14px_rgba(204,255,0,0.35)]"
                    style={{ color: "#CCFF00" }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="section-label text-white/45 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleCart}
                className="relative p-2 text-white/60 hover:text-white transition-colors duration-300"
                aria-label="Open cart"
              >
                <ShoppingBag size={19} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-white text-black text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {count}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 p-2 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="mb-12 hover:opacity-70 transition-opacity duration-300"
            >
              <Image
                src="/logo.png"
                alt="Steal the Beat by Blayke"
                width={140}
                height={140}
                style={{ height: "auto" }}
                className="brightness-0 invert"
              />
            </Link>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="section-label text-white/50 hover:text-white transition-colors tracking-[0.4em] text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
