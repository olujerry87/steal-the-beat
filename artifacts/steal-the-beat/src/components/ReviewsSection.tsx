import { Star } from "lucide-react";

const reviews = [
  {
    name: "Adekunle S.",
    rating: 5,
    text: "Best streetwear brand out of Lagos right now. The quality is insane and the fit is perfect for dancing — loose where it needs to be, structured everywhere else.",
    date: "2 weeks ago",
    location: "Lagos, Nigeria",
  },
  {
    name: "Zara M.",
    rating: 5,
    text: "I wore the Afrobeats Hoodie to a dance battle and everyone was asking where I got it. The quality is premium — nothing like fast fashion. Real craftsmanship.",
    date: "1 month ago",
    location: "London, UK",
  },
  {
    name: "Emmanuel O.",
    rating: 5,
    text: "Shipped to Houston in 9 days, arrived perfectly packaged. The quality speaks for itself. Blayke clearly knows his craft and his culture.",
    date: "3 weeks ago",
    location: "Houston, USA",
  },
  {
    name: "Funke A.",
    rating: 5,
    text: "The Cargo Pants are everything. Comfortable enough for full choreography, sharp enough for a night out. That balance is impossible to find anywhere else.",
    date: "1 week ago",
    location: "Accra, Ghana",
  },
  {
    name: "Jay P.",
    rating: 5,
    text: "Finally a brand that understands dance culture without making it corny. Real product, real heritage. Will be ordering again for sure.",
    date: "2 months ago",
    location: "Toronto, Canada",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} className="fill-black text-black" />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="bg-brand-offwhite py-28 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="section-label text-black/30 mb-5">Google Reviews</p>
            <h2 className="font-cursive text-[clamp(3rem,7vw,6rem)] text-black leading-none">
              What They&apos;re Saying
            </h2>
          </div>
          <div className="flex items-center gap-2.5">
            <StarRow count={5} />
            <span className="text-black/40 text-xs font-light ml-1">
              5.0 · 94 reviews
            </span>
          </div>
        </div>

        {/* First row: 3 reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((review, i) => (
            <div key={i} className="bg-white p-8 border border-brand-lgray">
              <StarRow count={review.rating} />
              <p className="text-black text-sm font-light leading-relaxed mt-5 mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="border-t border-brand-lgray pt-5 flex items-center justify-between">
                <span className="text-black text-xs font-medium tracking-wide">
                  {review.name}
                </span>
                <span className="section-label text-black/35">{review.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Second row: 2 reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 md:w-2/3">
          {reviews.slice(3).map((review, i) => (
            <div key={i} className="bg-white p-8 border border-brand-lgray">
              <StarRow count={review.rating} />
              <p className="text-black text-sm font-light leading-relaxed mt-5 mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="border-t border-brand-lgray pt-5 flex items-center justify-between">
                <span className="text-black text-xs font-medium tracking-wide">
                  {review.name}
                </span>
                <span className="section-label text-black/35">{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
