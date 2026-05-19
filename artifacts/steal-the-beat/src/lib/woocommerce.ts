import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  images: { id: number; src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  attributes: {
    id: number;
    name: string;
    options: string[];
  }[];
  variations: number[];
  type: string;
  status: string;
};

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
  image: { src: string; alt: string } | null;
};

function isConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;
  return (
    !!url &&
    !!key &&
    !!secret &&
    !url.includes("your-woocommerce-store") &&
    !key.startsWith("ck_xxx") &&
    !secret.startsWith("cs_xxx")
  );
}

function createClient() {
  const url = process.env.NEXT_PUBLIC_WORDPRESS_URL!;
  const consumerKey = process.env.WC_CONSUMER_KEY!;
  const consumerSecret = process.env.WC_CONSUMER_SECRET!;
  return new WooCommerceRestApi({ url, consumerKey, consumerSecret, version: "wc/v3" });
}

export async function getProducts(params?: {
  per_page?: number;
  page?: number;
  category?: string;
  search?: string;
  orderby?: string;
  order?: "asc" | "desc";
  status?: string;
}): Promise<WooProduct[]> {
  if (!isConfigured()) return getMockProducts();
  try {
    const api = createClient();
    const response = await api.get("products", {
      per_page: params?.per_page ?? 24,
      page: params?.page ?? 1,
      status: "publish",
      ...params,
    });
    return response.data as WooProduct[];
  } catch (err) {
    console.error("[WooCommerce] getProducts error:", err);
    return getMockProducts();
  }
}

export async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  if (!isConfigured()) {
    const mocks = getMockProducts();
    return mocks.find((p) => p.slug === slug) ?? mocks[0];
  }
  try {
    const api = createClient();
    const response = await api.get("products", { slug });
    const products = response.data as WooProduct[];
    return products[0] ?? null;
  } catch (err) {
    console.error("[WooCommerce] getProductBySlug error:", err);
    const mocks = getMockProducts();
    return mocks.find((p) => p.slug === slug) ?? mocks[0];
  }
}

export async function getCategories(): Promise<WooCategory[]> {
  if (!isConfigured()) return getMockCategories();
  try {
    const api = createClient();
    const response = await api.get("products/categories", {
      per_page: 20,
      hide_empty: true,
    });
    return response.data as WooCategory[];
  } catch (err) {
    console.error("[WooCommerce] getCategories error:", err);
    return getMockCategories();
  }
}

export async function getProductsByCategory(
  categorySlug: string,
  params?: { per_page?: number; page?: number }
): Promise<WooProduct[]> {
  if (!isConfigured()) {
    return getMockProducts().filter((p) =>
      p.categories.some((c) => c.slug === categorySlug)
    );
  }
  try {
    const categories = await getCategories();
    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) return [];
    return getProducts({ category: String(category.id), ...params });
  } catch (err) {
    console.error("[WooCommerce] getProductsByCategory error:", err);
    return getMockProducts().filter((p) =>
      p.categories.some((c) => c.slug === categorySlug)
    );
  }
}

function getMockCategories(): WooCategory[] {
  return [
    { id: 1, name: "T-Shirts", slug: "t-shirts", count: 8, image: null },
    { id: 2, name: "Hoodies", slug: "hoodies", count: 6, image: null },
    { id: 3, name: "Cargo Pants", slug: "cargo-pants", count: 4, image: null },
  ];
}

function getMockProducts(): WooProduct[] {
  const categories = getMockCategories();
  const items = [
    {
      id: 1,
      name: "Beat Drop Oversized Tee",
      slug: "beat-drop-oversized-tee",
      price: "35",
      regular_price: "35",
      sale_price: "",
      on_sale: false,
      category: categories[0],
      img: "/tee-steal-back.jpg",
    },
    {
      id: 2,
      name: "Lagos Nights Hoodie",
      slug: "lagos-nights-hoodie",
      price: "75",
      regular_price: "90",
      sale_price: "75",
      on_sale: true,
      category: categories[1],
      img: "/img-0196.jpg",
    },
    {
      id: 3,
      name: "Afrobeats Cargo Pants",
      slug: "afrobeats-cargo-pants",
      price: "95",
      regular_price: "95",
      sale_price: "",
      on_sale: false,
      category: categories[2],
      img: "/img-6213.jpg",
    },
    {
      id: 4,
      name: "Blayke Signature Tee",
      slug: "blayke-signature-tee",
      price: "40",
      regular_price: "40",
      sale_price: "",
      on_sale: false,
      category: categories[0],
      img: "/tee-steal-back.jpg",
    },
    {
      id: 5,
      name: "Dance Culture Hoodie",
      slug: "dance-culture-hoodie",
      price: "80",
      regular_price: "80",
      sale_price: "",
      on_sale: false,
      category: categories[1],
      img: "/img-0193.jpg",
    },
    {
      id: 6,
      name: "Rhythm Cargo Pants",
      slug: "rhythm-cargo-pants",
      price: "110",
      regular_price: "130",
      sale_price: "110",
      on_sale: true,
      category: categories[2],
      img: "/img-6184.jpg",
    },
    {
      id: 7,
      name: "Naija Pride Graphic Tee",
      slug: "naija-pride-graphic-tee",
      price: "38",
      regular_price: "38",
      sale_price: "",
      on_sale: false,
      category: categories[0],
      img: "/tee-steal-back.jpg",
    },
    {
      id: 8,
      name: "Streetwear Zip Hoodie",
      slug: "streetwear-zip-hoodie",
      price: "85",
      regular_price: "85",
      sale_price: "",
      on_sale: false,
      category: categories[1],
      img: "/img-0177.jpg",
    },
  ];

  return items.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    permalink: "",
    description: `<p>Premium streetwear inspired by the Nigerian dance scene. Designed for those who move with intention. ${item.name} is crafted from high-quality materials and built to last.</p>`,
    short_description: `Premium streetwear from Steal the Beat by Blayke. Nigerian dance culture meets global street style.`,
    price: item.price,
    regular_price: item.regular_price,
    sale_price: item.sale_price,
    on_sale: item.on_sale,
    purchasable: true,
    stock_status: "instock" as const,
    images: [{ id: item.id, src: item.img, alt: item.name }],
    categories: [item.category],
    attributes: [
      { id: 1, name: "Size", options: ["XS", "S", "M", "L", "XL", "2XL"] },
      { id: 2, name: "Color", options: ["Black", "White", "Orange"] },
    ],
    variations: [],
    type: "simple",
    status: "publish",
  }));
}
