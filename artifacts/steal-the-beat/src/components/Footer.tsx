"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube } from "lucide-react";

const marqueeWords = [
  "Steal the Beat",
  "By Blayke",
  "Lagos",
  "Dance Culture",
  "Worldwide",
  "Streetwear",
  "Nigeria",
  "Move Different",
];

const links = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "T-Shirts", href: "/shop?category=t-shirts" },
    { label: "Hoodies", href: "/shop?category=hoodies" },
    { label: "Cargo Pants", href: "/shop?category=cargo-pants" },
  ],
  info: [
    { label: "About Blayke", href: "#about" },
    { label: "Shipping & Returns", href: "#shipping" },
    { label: "Size Guide", href: "#size-guide" },
    { label: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/15">
      {/* Marquee */}
      <div className="overflow-hidden border-b border-white/10 py-5">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-8 mx-8 font-cursive text-3xl text-white/40"
            >
              {word}
              <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-5 hover:opacity-70 transition-opacity duration-300">
              <Image
                src="/logo.png"
                alt="Steal the Beat by Blayke"
                width={120}
                height={120}
                style={{ height: "auto" }}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-white/65 text-sm font-light leading-relaxed max-w-xs">
              Streetwear born from the energy of Nigerian dance culture.
              Designed for the worldwide community that moves to the same beat.
            </p>
            <div className="flex gap-3 mt-8">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2.5 border border-white/25 text-white/55 hover:border-white/60 hover:text-white transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {(["shop", "info"] as const).map((section) => (
            <div key={section}>
              <h4 className="section-label text-white/55 mb-6 capitalize">
                {section}
              </h4>
              <ul className="space-y-4">
                {links[section].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/65 text-sm font-light hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs font-light">
            &copy; {new Date().getFullYear()} Steal the Beat by Blayke. All rights reserved.
          </p>
          <p className="section-label text-white/50">
            Design by Midas Mark Studios
          </p>
        </div>
      </div>
    </footer>
  );
}
