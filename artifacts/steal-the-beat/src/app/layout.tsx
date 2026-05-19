import type { Metadata } from "next";
import { Great_Vibes, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steal the Beat by Blayke | Nigerian Dance Culture Streetwear",
  description:
    "Premium streetwear rooted in Nigerian dance culture. T-Shirts, Hoodies, and Cargo Pants for the worldwide dance community — by Blayke.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${greatVibes.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="bg-brand-black text-brand-white font-body antialiased">
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
