"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Do you ship worldwide?",
    a: "Yes — we ship to 40+ countries. International orders typically arrive in 7–14 business days, depending on your location. Express shipping is available at checkout.",
  },
  {
    q: "What sizes are available?",
    a: "All pieces are available in XS through 2XL. Each product page includes a detailed size guide with chest, waist, and inseam measurements. When in doubt, size up.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery, provided items are unworn and have all original tags attached. Exchange requests are processed within 3 business days.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order ships, you'll receive a tracking link via email within 24 hours. Most domestic orders ship within 2 business days of purchase.",
  },
  {
    q: "Are there artist collaborations?",
    a: "Regularly. We collaborate with Nigerian and global dance artists on limited drops. Follow @stealthebeat on Instagram to stay ahead of the next one.",
  },
  {
    q: "Is the merch dance-tested?",
    a: "Always. Every piece is tested on the floor before it ships. Blayke signs off on every drop personally — if you can't move in it, it doesn't leave the studio.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-black py-28 px-6 lg:px-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="section-label text-white/25 mb-5">Support</p>
          <h2 className="font-cursive text-[clamp(3rem,7vw,6rem)] text-white leading-none">
            Common Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-white/10">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-white text-sm font-light tracking-wide pr-8 group-hover:text-white/70 transition-colors duration-300">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 text-white/30 group-hover:text-white transition-colors duration-300">
                  {open === i ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-white/45 text-sm font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
