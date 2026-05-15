import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "AdverX Store | Digital Product Marketplace", template: "%s | AdverX Store" },
  description: "A modern dark-themed marketplace for selling digital products with instant secure downloads.",
  keywords: ["digital products", "marketplace", "Next.js", "Supabase", "LemonSqueezy"],
  openGraph: { title: "AdverX Store", description: "Sell premium digital products with instant delivery.", url: "/", siteName: "AdverX Store", type: "website" }
};

export const viewport: Viewport = { themeColor: "#05020a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster richColors theme="dark" position="top-right" />
      </body>
    </html>
  );
}
