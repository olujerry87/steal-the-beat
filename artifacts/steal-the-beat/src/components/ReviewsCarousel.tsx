"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    name: "Adekunle S.",
    rating: 5,
    text: "Best streetwear brand out of Lagos right now. The quality is insane and the fit is perfect for dancing.",
    date: "2 weeks ago",
    location: "Lagos, Nigeria",
  },
  {
    name: "Zara M.",
    rating: 5,
    text: "I wore the Afrobeats Hoodie to a dance battle and everyone was asking where I got it. Real craftsmanship.",
    date: "1 month ago",
    location: "London, UK",
  },
  {
    name: "Emmanuel O.",
    rating: 5,
    text: "Shipped to Houston in 9 days, arrived perfectly packaged. The quality speaks for itself.",
    date: "3 weeks ago",
    location: "Houston, USA",
  },
  {
    name: "Funke A.",
    rating: 5,
    text: "The Cargo Pants are everything. Comfortable for full choreography, sharp enough for a night out.",
    date: "1 week ago",
    location: "Accra, Ghana",
  },
  {
    name: "Jay P.",
    rating: 5,
    text: "Finally a brand that understands dance culture without making it corny. Real product, real heritage.",
    date: "2 months ago",
    location: "Toronto, Canada",
  },
  {
    name: "Temi O.",
    rating: 5,
    text: "Ordered twice already. The packaging alone tells you this brand takes pride in what they do.",
    date: "3 days ago",
    location: "Abuja, Nigeria",
  },
  {
    name: "Marcus D.",
    rating: 5,
    text: "Wore this to a show in Amsterdam — got stopped four times. Quality, cut, everything is on point.",
    date: "2 weeks ago",
    location: "Amsterdam, NL",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={10} className="fill-black text-black" />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="flex-none w-[320px] bg-white border border-brand-lgray p-7 flex flex-col justify-between">
      <div>
        <StarRow count={review.rating} />
        <p className="text-black text-sm font-light leading-relaxed mt-4 mb-5">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>
      <div className="border-t border-brand-lgray pt-4 flex items-center justify-between">
        <span className="text-black text-xs font-medium">{review.name}</span>
        <span className="section-label text-black/35">{review.location}</span>
      </div>
    </div>
  );
}

export function ReviewsCarousel() {
  const doubled = [...reviews, ...reviews];

  return (
    <section className="bg-brand-offwhite py-24 overflow-hidden">
      {/* Header */}
      <div className="px-6 lg:px-16 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="section-label text-black/30 mb-4">Google Reviews</p>
            <h2 className="font-cursive text-[clamp(3rem,7vw,6rem)] text-black leading-none">
              What They&apos;re Saying
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <StarRow count={5} />
            <span className="text-black/40 text-xs font-light ml-1">
              5.0 · 94 reviews
            </span>
          </div>
        </div>
      </div>

      {/* Infinite scroll strip */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-offwhite to-transparent z-10" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brand-offwhite to-transparent z-10" />

        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
