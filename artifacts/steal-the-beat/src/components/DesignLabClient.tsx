"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Copy, Check, Zap, Flame } from "lucide-react";
import confetti from "canvas-confetti";

const LIME = "#CCFF00";
const MOCK_VOTES = { a: 65, b: 35 };
const TOTAL_VOTES = 2847;

const choices = [
  {
    id: "a" as const,
    title: "Oversized Boxy",
    subtitle: "The Statement",
    img: "/tee-steal-back.jpg",
    specs: [
      "Maximum shoulder rotation freedom",
      "Dropped seam for arm isolation",
      "Extended hem for flowing wave locks",
      "Breathable wide-weave structure",
    ],
  },
  {
    id: "b" as const,
    title: "Tapered Tech",
    subtitle: "The Precision",
    img: "/cargo-black-side.jpg",
    specs: [
      "Contoured fit for footwork clarity",
      "4-way stretch panel at hip flexor",
      "Articulated knee for deep dips",
      "Moisture-wicking inner lining",
    ],
  },
];

function useCountdown(initialSeconds: number) {
  const [time, setTime] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  return {
    h: String(Math.floor(time / 3600)).padStart(2, "0"),
    m: String(Math.floor((time % 3600) / 60)).padStart(2, "0"),
    s: String(time % 60).padStart(2, "0"),
  };
}

export function DesignLabClient() {
  const [voted, setVoted] = useState<"a" | "b" | null>(null);
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { h, m, s } = useCountdown(23 * 3600 + 47 * 60 + 12);

  const handleVote = useCallback((id: "a" | "b") => {
    setVoted(id);
    confetti({
      particleCount: 140,
      spread: 90,
      colors: [LIME, "#ffffff", "#1a1a1a"],
      origin: { y: 0.55 },
      scalar: 1.1,
    });
    setTimeout(
      () =>
        confetti({
          particleCount: 60,
          spread: 60,
          colors: [LIME, "#ffffff"],
          origin: { y: 0.55, x: 0.3 },
          scalar: 0.9,
        }),
      200
    );
  }, []);

  const handleShare = useCallback(() => {
    void navigator.clipboard.writeText(
      "I just helped design the @StealTheBeat drop in the Design Lab! 🧪 Head to the link in bio to cast your vote — your opinion shapes the collection."
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "var(--font-inter, sans-serif)" }}
    >
      {/* ── Grid texture ── */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Page header ── */}
      <div className="relative z-10 border-b-2 px-6 lg:px-16 pt-28 pb-12" style={{ borderColor: `${LIME}22` }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <p
              className="text-xs tracking-[0.45em] uppercase font-black mb-3"
              style={{ color: LIME }}
            >
              Community Design Lab
            </p>
            <h1 className="text-[clamp(2.2rem,7vw,5rem)] font-black uppercase leading-none tracking-tight">
              Round 01:
              <br />
              <span style={{ color: LIME }}>The Silhouette</span>
            </h1>
            <p className="text-white/35 text-sm mt-5 max-w-md leading-relaxed">
              You decide what drops. Vote on the silhouette for the next Steal
              the Beat collection — results shape the final design.
            </p>
          </div>

          {/* Digital clock */}
          <div
            className="flex-shrink-0 border-2 p-5 lg:p-6"
            style={{
              borderColor: `${LIME}33`,
              background: `${LIME}08`,
            }}
          >
            <p
              className="text-[9px] tracking-[0.45em] uppercase font-bold mb-3"
              style={{ color: `${LIME}88` }}
            >
              Round closes in
            </p>
            <div className="flex items-center gap-2">
              {[h, m, s].map((unit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="border px-3 py-2 bg-black"
                    style={{ borderColor: `${LIME}22` }}
                  >
                    <span
                      className="font-mono text-[clamp(2rem,5vw,3rem)] font-black leading-none tabular-nums"
                      style={{ color: LIME }}
                    >
                      {unit}
                    </span>
                  </div>
                  {i < 2 && (
                    <span
                      className="text-2xl font-mono font-black"
                      style={{ color: `${LIME}55` }}
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-[1.65rem] mt-2.5 pl-0.5">
              {["HOURS", "MINS", "SECS"].map((l) => (
                <span
                  key={l}
                  className="text-[8px] tracking-[0.3em] uppercase"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Live votes banner ── */}
      <div className="relative z-10 border-b border-white/5 px-6 lg:px-16 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Flame size={12} style={{ color: LIME }} />
          <span className="text-white/35 text-[10px] tracking-[0.3em] uppercase">
            <span className="font-bold" style={{ color: LIME }}>
              {TOTAL_VOTES.toLocaleString()}
            </span>{" "}
            votes cast · round closes {h}:{m}:{s}
          </span>
        </div>
      </div>

      {/* ── Voting arena ── */}
      <div className="relative z-10 px-6 lg:px-16 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {choices.map((choice) => (
              <ChoiceCard
                key={choice.id}
                choice={choice}
                voted={voted}
                onVote={handleVote}
                votePercent={MOCK_VOTES[choice.id]}
                hoveredSpec={hoveredSpec}
                setHoveredSpec={setHoveredSpec}
              />
            ))}
          </div>

          {/* Share button — appears after vote */}
          <AnimatePresence>
            {voted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.9 }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
              >
                <p className="text-white/25 text-[10px] tracking-[0.35em] uppercase">
                  Vote locked — spread the word
                </p>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2.5 border-2 px-5 py-3 text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-300"
                  style={{
                    borderColor: copied ? LIME : "rgba(255,255,255,0.15)",
                    color: copied ? LIME : "rgba(255,255,255,0.5)",
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied to clipboard!" : "Share your choice"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="relative z-10 border-t-2 border-white/5 px-6 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p
              className="text-[10px] tracking-[0.4em] uppercase font-black mb-1.5"
              style={{ color: LIME }}
            >
              How it works
            </p>
            <p className="text-white/30 text-sm max-w-lg leading-relaxed">
              The winning silhouette enters the Steal the Beat production
              pipeline. Voters who share their choice get early access to the
              drop.
            </p>
          </div>
          <div
            className="flex items-center gap-2 border px-4 py-2 flex-shrink-0"
            style={{ borderColor: `${LIME}25` }}
          >
            <Zap size={12} style={{ color: LIME }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-black"
              style={{ color: `${LIME}BB` }}
            >
              Next round in 3 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Choice Card ───────────────────────────────────────────────────────────────

type Choice = (typeof choices)[0];

type ChoiceCardProps = {
  choice: Choice;
  voted: "a" | "b" | null;
  onVote: (id: "a" | "b") => void;
  votePercent: number;
  hoveredSpec: string | null;
  setHoveredSpec: (id: string | null) => void;
};

function ChoiceCard({
  choice,
  voted,
  onVote,
  votePercent,
  hoveredSpec,
  setHoveredSpec,
}: ChoiceCardProps) {
  const isMyVote = voted === choice.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col bg-zinc-950 border-2 transition-all duration-500"
      style={{
        borderColor: isMyVote
          ? LIME
          : voted
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.12)",
        boxShadow: isMyVote ? `0 0 48px ${LIME}18` : "none",
      }}
    >
      {/* "Your Vote" badge */}
      {isMyVote && (
        <div className="absolute -top-px left-5 z-10">
          <div
            className="text-[9px] font-black uppercase tracking-[0.35em] px-3 py-1"
            style={{ background: LIME, color: "#000" }}
          >
            Your Vote
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={choice.img}
          alt={choice.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Tech spec tooltip icon */}
        <div
          className="absolute top-4 right-4 z-10"
          onMouseEnter={() => setHoveredSpec(choice.id)}
          onMouseLeave={() => setHoveredSpec(null)}
        >
          <div
            className="w-8 h-8 border-2 bg-black/80 flex items-center justify-center cursor-help transition-all duration-200"
            style={{
              borderColor:
                hoveredSpec === choice.id ? LIME : `${LIME}55`,
              background:
                hoveredSpec === choice.id ? `${LIME}18` : "rgba(0,0,0,0.8)",
            }}
          >
            <Info size={13} style={{ color: LIME }} />
          </div>

          <AnimatePresence>
            {hoveredSpec === choice.id && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute top-10 right-0 w-64 bg-black border-2 p-4 z-20"
                style={{ borderColor: `${LIME}35` }}
              >
                <p
                  className="text-[9px] tracking-[0.35em] uppercase font-black mb-3"
                  style={{ color: LIME }}
                >
                  Dancer Tech Specs
                </p>
                <ul className="space-y-2.5">
                  {choice.specs.map((spec, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-white/55 text-xs leading-relaxed"
                    >
                      <span className="flex-shrink-0 mt-0.5" style={{ color: LIME }}>
                        —
                      </span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <p
            className="text-[9px] tracking-[0.4em] uppercase font-black mb-1"
            style={{ color: `${LIME}88` }}
          >
            {choice.subtitle}
          </p>
          <h2 className="text-xl font-black uppercase tracking-tight text-white">
            {choice.title}
          </h2>
        </div>

        {/* Vote button / Results */}
        <AnimatePresence mode="wait">
          {!voted ? (
            <motion.button
              key="btn"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onClick={() => onVote(choice.id)}
              className="w-full py-4 text-black text-[10px] font-black uppercase tracking-[0.35em] transition-all duration-300 active:scale-[0.98]"
              style={{
                background: LIME,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 28px ${LIME}55`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Vote → {choice.title}
            </motion.button>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-white/35 text-[9px] tracking-[0.3em] uppercase">
                  Live Results
                </span>
                <span
                  className="text-base font-black"
                  style={{ color: isMyVote ? LIME : "rgba(255,255,255,0.55)" }}
                >
                  {votePercent}%
                </span>
              </div>
              <div className="h-[3px] w-full bg-white/8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${votePercent}%` }}
                  transition={{
                    duration: 1.3,
                    delay: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full"
                  style={{
                    background: isMyVote ? LIME : "rgba(255,255,255,0.35)",
                    boxShadow: isMyVote ? `0 0 10px ${LIME}88` : "none",
                  }}
                />
              </div>
              <p className="text-white/20 text-[9px] mt-2 tracking-wider uppercase">
                {Math.round((TOTAL_VOTES * votePercent) / 100).toLocaleString()}{" "}
                votes
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
