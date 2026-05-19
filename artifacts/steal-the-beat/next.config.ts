import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@woocommerce/woocommerce-rest-api"],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
