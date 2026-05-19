"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <div className="relative w-full h-full bg-black flex flex-col items-center justify-center">
      {/* Background: Cinematic dance GIF placeholder */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_100%)]" />
        <div
          className="absolute inset-12 md:inset-24 border border-dashed border-white/[0.06] flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="text-white/[0.07] text-[9px] uppercase tracking-[0.6em] text-center leading-[4]">
            Cinematic Dance GIF<br />Midjourney — Replace This
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="section-label text-white/30 mb-8"
        >
          By Blayke · Lagos, Nigeria
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-cursive text-[clamp(4.5rem,17vw,14rem)] text-white leading-none mb-8"
        >
          Steal the Beat
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/40 text-xs font-light tracking-[0.3em] uppercase mb-14"
        >
          Nigerian Dance Culture · Worldwide Streetwear
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link href="/shop" className="btn-primary">
            Shop the Collection
          </Link>
          <a href="#the-lab" className="btn-ghost">
            The Lab
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/25"
      >
        <span className="section-label">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={13} />
        </motion.div>
      </motion.div>
    </div>
  );
}
