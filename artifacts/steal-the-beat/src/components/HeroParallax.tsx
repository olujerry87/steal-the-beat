"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function HeroParallax() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const textY = useTransform(scrollYProgress, [0, 0.8], ["0%", "-10%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <div ref={outerRef} style={{ height: "200vh" }} className="relative">
      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="sticky top-0 h-screen overflow-hidden will-change-transform bg-black cursor-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Layer 1: Static photo — goes full colour on hover ── */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.25]">
          <Image
            src="/hero.jpg"
            alt="Steal the Beat by Blayke"
            fill
            priority
            sizes="100vw"
            className={`object-cover object-[center_35%] contrast-[1.1] transition-all duration-700 ease-in-out ${
              hovered ? "grayscale-0 brightness-[0.85]" : "grayscale brightness-[0.75]"
            }`}
          />
        </motion.div>

        {/* ── Layer 1b: GIF overlay — fades in on hover ── */}
        {/*
          Mock: /public/hero-hover.gif
          Replace with your own: drop hero-video.mp4 or hero-hover.gif into /public/
        */}
        <motion.div
          style={{ y: imageY }}
          className={`absolute inset-0 scale-[1.25] transition-opacity duration-700 ease-in-out ${
            hovered ? "opacity-60" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-hover.gif"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_35%]"
          />
        </motion.div>

        {/* ── Gradient overlays (lighten on hover to let colour show) ── */}
        <div
          className={`absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-black/10 to-black/80 transition-opacity duration-700 ${
            hovered ? "opacity-50" : "opacity-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-[1]" />

        {/* ── Layer 2: Text ── */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          <p className="section-label text-white/70 mb-8">
            By Blayke · Lagos, Nigeria
          </p>

          <h1 className="font-cursive text-[clamp(3.2rem,11vw,9rem)] text-white leading-none mb-8">
            Steal the Beat
          </h1>

          <p className="text-white/70 text-xs font-light tracking-[0.3em] uppercase mb-14">
            Nigerian Dance Culture · Worldwide Streetwear
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/shop" className="btn-primary">
              Shop the Collection
            </Link>
            <a href="#the-lab" className="btn-ghost">
              The Lab
            </a>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/25 z-20">
          <span className="section-label">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={13} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
