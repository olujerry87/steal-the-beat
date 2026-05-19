"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function MeetBlayke() {
  const outerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0.78, 1], [1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={outerRef} style={{ height: "180vh" }} className="relative">
      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="sticky top-0 h-screen overflow-hidden will-change-transform bg-black"
      >
        <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2">

          {/* ── Left: Text panel ── */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10 flex flex-col justify-center px-10 md:px-16 lg:px-24 py-20 md:py-0"
          >
            <p className="section-label text-white/25 mb-6">The Story</p>

            <h2 className="font-cursive text-[clamp(3.5rem,7vw,6rem)] text-white leading-none mb-10">
              Meet<br />Blayke
            </h2>

            <div className="space-y-5 max-w-xs">
              {[
                "Born from the energy of Lagos dance floors — Blayke built Steal the Beat to clothe the culture that raised her.",
                "Every piece carries the rhythm of Afrobeats, Amapiano and the streets that refuse to stand still.",
                "Worn worldwide. Rooted in Nigeria.",
              ].map((text, i) => (
                <p
                  key={i}
                  className="text-white/45 text-sm font-light leading-relaxed"
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-12 h-px w-16 bg-white/20" />

            <p className="mt-4 font-cursive text-2xl text-white/30">
              — Blayke
            </p>
          </motion.div>

          {/* ── Right: Photo panel ── */}
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 md:relative md:inset-auto w-full h-full scale-[1.15]"
          >
            <div className="absolute inset-0 bg-black/70 md:hidden z-10" />

            <Image
              src="/meet-blayke.jpg"
              alt="Blayke wearing Steal the Beat"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[center_30%] grayscale brightness-80 contrast-110"
            />

            <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent z-10" />
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
