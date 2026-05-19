"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  scrollHeight?: string;
  fadeStart?: number;
};

export function ParallaxSection({
  children,
  className = "bg-black",
  scrollHeight = "200vh",
  fadeStart = 0.78,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [fadeStart, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div ref={ref} style={{ height: scrollHeight }} className="relative">
      <motion.div
        style={{ opacity, scale }}
        className={`sticky top-0 h-screen overflow-hidden will-change-transform ${className}`}
        suppressHydrationWarning
      >
        {children}
      </motion.div>
    </div>
  );
}
