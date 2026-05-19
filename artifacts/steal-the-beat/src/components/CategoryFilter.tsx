"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { WooCategory } from "@/lib/woocommerce";

type Props = {
  categories: WooCategory[];
  active?: string;
};

export function CategoryFilter({ categories, active }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/shop?${params.toString()}`);
  };

  const allCategories = [
    { id: 0, name: "All", slug: undefined, count: 0 },
    ...categories.map((c) => ({ ...c, slug: c.slug as string | undefined })),
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {allCategories.map((cat) => {
        const isActive = cat.slug ? active === cat.slug : !active;
        return (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.slug)}
            className={`px-4 py-2 text-[10px] uppercase tracking-[0.25em] font-light border transition-all duration-200 ${
              isActive
                ? "bg-black text-white border-black"
                : "bg-transparent text-black/40 border-black/15 hover:border-black hover:text-black"
            }`}
          >
            {cat.name}
            {cat.count > 0 && (
              <span className="ml-1.5 opacity-50">({cat.count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
