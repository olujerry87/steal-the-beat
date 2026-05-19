import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/woocommerce";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";

export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<{ category?: string; search?: string }>;
};

async function ShopContent({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const [products, categories] = await Promise.all([
    getProducts({
      per_page: 24,
      category: category
        ? String(
            (await getCategories()).find((c) => c.slug === category)?.id ?? ""
          )
        : undefined,
      search,
    }),
    getCategories(),
  ]);

  return (
    <>
      <div className="mb-8">
        <Suspense fallback={<div className="h-10" />}>
          <CategoryFilter categories={categories} active={category} />
        </Suspense>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="section-label text-black/35">
          {products.length} product{products.length !== 1 ? "s" : ""}
          {category ? ` in ${category.replace(/-/g, " ")}` : ""}
        </p>
      </div>

      <ProductGrid products={products} />
    </>
  );
}

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { category, search } = params;

  return (
    <div className="min-h-screen bg-brand-offwhite">
      {/* Header */}
      <div className="pt-24 pb-12 border-b border-black/8 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label text-black/30 mb-4">Steal the Beat Collection</p>
          <h1 className="font-cursive text-[clamp(3.5rem,9vw,8rem)] text-black leading-none">
            {category ? category.replace(/-/g, " ") : "All Products"}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-white border border-black/8 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <ShopContent category={category} search={search} />
        </Suspense>
      </div>
    </div>
  );
}
