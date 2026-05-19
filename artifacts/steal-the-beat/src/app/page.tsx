import { HeroParallax } from "@/components/HeroParallax";
import { MeetBlayke } from "@/components/MeetBlayke";
import { PhotoParallax } from "@/components/PhotoParallax";
import { ParallaxSection } from "@/components/ParallaxSection";
import { TheLab } from "@/components/TheLab";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { FAQSection } from "@/components/FAQSection";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/woocommerce";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 3600;

export default async function HomePage() {
  const products = await getProducts({ per_page: 8, orderby: "date", order: "desc" });

  return (
    <>
      {/* ─── Ch 1: Hero ─────────────────────────────────────── */}
      <HeroParallax />

      {/* ─── Ch 1.5: Meet Blayke ────────────────────────────── */}
      <MeetBlayke />

      {/* ─── Ch 1.75: Picture section ── */}
      <PhotoParallax
        src="/img-6183.jpg"
        alt="Steal the Beat — full look, Lagos streets"
        label="The Movement"
        heading="Born on the Floor"
        body="From Lagos to London, the culture moves and the clothes move with it."
        objectPosition="center 20%"
        scrollHeight="150vh"
        align="left"
      />

      {/* ─── Ch 2: Shop ─────────────────────────────────────── */}
      <ParallaxSection scrollHeight="270vh" className="bg-brand-offwhite" fadeStart={0.82}>
        <div className="relative w-full h-full flex flex-col justify-center px-6 lg:px-16 py-16">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label text-black/30 mb-4">The Collection</p>
                <h2 className="font-cursive text-[clamp(3rem,8vw,7rem)] text-black leading-none">
                  New Arrivals
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-2 section-label text-black/40 hover:text-black transition-colors group"
              >
                View All
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {products.slice(0, 8).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
            <div className="mt-8 flex sm:hidden justify-center">
              <Link href="/shop" className="btn-dark">View All Products</Link>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* ─── Ch 2.5: Picture section ── */}
      <PhotoParallax
        src="/img-6186.jpg"
        alt="Steal the Beat cargo pants pocket detail"
        label="The Craft"
        heading="Every Thread Counts"
        body="Each piece is designed for the dancer — built to move, styled to last."
        objectPosition="center 40%"
        scrollHeight="150vh"
        align="right"
        overlay="bg-gradient-to-l from-black/80 via-black/20 to-black/50"
      />

      {/* ─── Ch 3: The Lab ──────────────────────────────────── */}
      <ParallaxSection scrollHeight="220vh" className="bg-black" fadeStart={0.82}>
        <TheLab />
      </ParallaxSection>

      {/* ─── Ch 3.5: Picture section ── */}
      <PhotoParallax
        src="/img-0902.jpg"
        alt="Steal the Beat — worn everywhere"
        label="Worldwide"
        heading="Worn Everywhere"
        body="Nigeria raised it. The world wears it."
        objectPosition="center 40%"
        scrollHeight="150vh"
        align="center"
        overlay="bg-gradient-to-t from-black/90 via-black/30 to-black/50"
      />

      {/* ─── Reviews carousel ───────────────────────────────── */}
      <ReviewsCarousel />

      {/* ─── FAQ ────────────────────────────────────────────── */}
      <FAQSection />
    </>
  );
}
