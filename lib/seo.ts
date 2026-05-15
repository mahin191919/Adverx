import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function buildMetadata({ title, description, path = "/" }: { title: string; description: string; path?: string }): Metadata {
  const url = new URL(path, siteUrl).toString();
  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "AdverX Store", type: "website", images: ["/og.svg"] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.svg"] }
  };
}
