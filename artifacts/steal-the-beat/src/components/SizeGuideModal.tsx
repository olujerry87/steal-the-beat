"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const sizes = [
  { size: "XS", chest: "84–88",  waist: "64–68",  hips: "88–92",  ng: "30–32", uk: "6–8",   us: "2–4"  },
  { size: "S",  chest: "89–93",  waist: "69–73",  hips: "93–97",  ng: "32–34", uk: "8–10",  us: "4–6"  },
  { size: "M",  chest: "94–98",  waist: "74–78",  hips: "98–102", ng: "34–36", uk: "10–12", us: "6–8"  },
  { size: "L",  chest: "99–104", waist: "79–84",  hips: "103–108",ng: "38–40", uk: "12–14", us: "8–10" },
  { size: "XL", chest: "105–111",waist: "85–91",  hips: "109–115",ng: "40–42", uk: "14–16", us: "10–12"},
  { size: "2XL",chest: "112–119",waist: "92–99",  hips: "116–123",ng: "42–44", uk: "16–18", us: "12–14"},
];

const cols = [
  { key: "size",  label: "Size" },
  { key: "chest", label: "Chest (cm)" },
  { key: "waist", label: "Waist (cm)" },
  { key: "hips",  label: "Hips (cm)" },
  { key: "ng",    label: "Nigerian" },
  { key: "uk",    label: "UK" },
  { key: "us",    label: "US" },
];

export function SizeGuideModal({ open, onClose }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />

          {/* Panel — slides from right on md+, slides from bottom on mobile */}
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-black/10">
              <div className="flex items-center gap-3">
                <Ruler size={16} className="text-black/40" />
                <span className="section-label text-black">Size Guide</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors"
                aria-label="Close size guide"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-8 py-8 no-scrollbar">

              {/* Intro */}
              <div className="mb-8">
                <h2 className="font-cursive text-[2.4rem] text-black leading-none mb-3">
                  Find Your Fit
                </h2>
                <p className="text-sm text-black/45 font-light leading-relaxed">
                  All measurements are in centimetres. For the best fit, measure
                  your body (not your clothing) and compare against the chart below.
                  Steal the Beat pieces are cut with a Nigerian body standard in
                  mind — roomy through the chest, tapered at the waist.
                </p>
              </div>

              {/* How to measure */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { label: "Chest", tip: "Measure around the fullest part of your chest, keeping the tape parallel to the floor." },
                  { label: "Waist", tip: "Measure around your natural waistline — about 2 cm above your navel." },
                  { label: "Hips", tip: "Measure around the fullest part of your hips, about 20 cm below your waistline." },
                ].map(({ label, tip }) => (
                  <div key={label} className="border border-black/10 p-4">
                    <p className="section-label text-black mb-2">{label}</p>
                    <p className="text-[11px] text-black/45 font-light leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>

              {/* Size table */}
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/10">
                      {cols.map((col) => (
                        <th
                          key={col.key}
                          className="pb-3 pr-4 text-[9px] uppercase tracking-[0.2em] text-black/35 font-medium whitespace-nowrap"
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((row, i) => (
                      <tr
                        key={row.size}
                        className={`border-b border-black/6 transition-colors hover:bg-black/[0.025] ${
                          i % 2 === 0 ? "" : "bg-black/[0.015]"
                        }`}
                      >
                        {cols.map((col) => (
                          <td
                            key={col.key}
                            className={`py-3.5 pr-4 whitespace-nowrap ${
                              col.key === "size"
                                ? "text-[11px] font-semibold text-black tracking-[0.1em] uppercase"
                                : "text-[11px] text-black/55 font-light"
                            }`}
                          >
                            {row[col.key as keyof typeof row]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tip */}
              <div className="mt-8 border border-black/10 p-5">
                <p className="section-label text-black mb-2">Not sure?</p>
                <p className="text-[11px] text-black/45 font-light leading-relaxed">
                  If you&apos;re between sizes, size up — our fits are tailored slim.
                  Check the product description for garment-specific notes.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-black/10">
              <button
                onClick={onClose}
                className="btn-dark w-full"
              >
                Back to Product
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
