"use client";

import { motion } from "framer-motion";
import { Play, Heart, Instagram } from "lucide-react";

const labPosts = [
  { id: 1, img: "/img-0194.jpg", handle: "@stealthebeat", caption: "Lagos energy never sleeps #AfroBeats", likes: "2.4k", isVideo: true },
  { id: 2, img: "/img-0190.jpg", handle: "@blayke_moves", caption: "The new drop hits different on the dancefloor", likes: "1.8k", isVideo: false },
  { id: 3, img: "/img-0902.jpg", handle: "@stealthebeat", caption: "Culture over everything #StealTheBeat", likes: "3.1k", isVideo: true },
  { id: 4, img: "/img-0196.jpg", handle: "@blayke_official", caption: "Nigeria to the world — no passport needed", likes: "2.7k", isVideo: false },
  { id: 5, img: "/img-0193.jpg", handle: "@stealthebeat", caption: "Studio session with the crew", likes: "1.5k", isVideo: true },
  { id: 6, img: "/img-0177.jpg", handle: "@blayke_moves", caption: "Every move, every piece — intentional", likes: "4.2k", isVideo: false },
  { id: 7, img: "/img-6184.jpg", handle: "@stealthebeat", caption: "Cargo Pants drop this Friday", likes: "5.8k", isVideo: true },
  { id: 8, img: "/img-6209.jpg", handle: "@blayke_official", caption: "We don't follow trends, we set them", likes: "3.3k", isVideo: false },
];

export function TheLab() {
  return (
    <section
      id="the-lab"
      className="relative w-full h-full bg-black flex flex-col justify-center py-16 px-6 lg:px-16"
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-10 max-w-7xl mx-auto w-full">
        <div>
          <p className="section-label text-white/25 mb-5">The Lab</p>
          <h2 className="font-cursive text-[clamp(2.8rem,8vw,7rem)] text-white leading-none">
            Dance, Vibes & Culture
          </h2>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2.5 text-white/30 hover:text-white transition-colors duration-300 group"
        >
          <Instagram size={14} />
          <span className="section-label group-hover:text-white transition-colors">
            Follow on Instagram
          </span>
        </a>
      </div>

      {/* Horizontal scroll feed */}
      <div className="overflow-x-auto no-scrollbar max-w-7xl mx-auto w-full">
        <div className="flex gap-3 pb-2" style={{ width: "max-content" }}>
          {labPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              suppressHydrationWarning
              className="group relative flex-shrink-0 w-[190px] md:w-[230px] aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer"
            >
              <img
                src={post.img}
                alt={post.caption}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-3">
                {post.isVideo && (
                  <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
                    <Play size={14} className="text-white ml-0.5" fill="white" />
                  </div>
                )}
                <span className="section-label text-white">Watch on IG</span>
              </div>

              {/* Always-visible bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                <p className="text-white/40 text-[9px] uppercase tracking-wider mb-1.5">
                  {post.handle}
                </p>
                <p className="text-white text-[11px] font-light leading-snug line-clamp-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Heart size={9} className="text-white/30" />
                  <span className="text-white/30 text-[9px]">{post.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile IG link */}
      <div className="mt-8 flex sm:hidden items-center justify-center">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/30 hover:text-white transition-colors"
        >
          <Instagram size={14} />
          <span className="section-label">Follow on Instagram</span>
        </a>
      </div>
    </section>
  );
}
