"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  label?: string;
  heading?: string;
  body?: string;
  objectPosition?: string;
  scrollHeight?: string;
  align?: "left" | "right" | "center";
  overlay?: string;
};

export function PhotoParallax({
  src,
  alt,
  label,
  heading,
  body,
  objectPosition = "center 40%",
  scrollHeight = "160vh",
  align = "left",
  overlay = "bg-gradient-to-t from-black/80 via-black/20 to-black/60",
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const textOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  const textAlign =
    align === "center"
      ? "items-center text-center"
      : align === "right"
      ? "items-end text-right"
      : "items-start text-left";

  const textPad =
    align === "right"
      ? "px-10 md:px-16 lg:px-24 md:ml-auto md:w-1/2"
      : align === "center"
      ? "px-10 md:px-32 lg:px-48"
      : "px-10 md:px-16 lg:px-24 md:w-1/2";

  return (
    <div ref={outerRef} style={{ height: scrollHeight }} className="relative">
      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="sticky top-0 h-screen overflow-hidden will-change-transform bg-black"
      >
        {/* ── Photo layer (drifts slower) ── */}
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 scale-[1.22]"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            style={{ objectPosition }}
            className="object-cover grayscale brightness-[0.75] contrast-[1.1]"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className={`absolute inset-0 ${overlay} z-[1]`} />

        {/* ── Text layer (drifts faster) ── */}
        {(label || heading || body) && (
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className={`absolute inset-0 z-10 flex flex-col justify-end pb-24 ${textAlign} ${textPad}`}
          >
            {label && (
              <p className="section-label text-white/30 mb-5">{label}</p>
            )}
            {heading && (
              <h2 className="font-cursive text-[clamp(3rem,9vw,8rem)] text-white leading-none mb-6">
                {heading}
              </h2>
            )}
            {body && (
              <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm">
                {body}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
