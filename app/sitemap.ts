import type { MetadataRoute } from "next";
import { products } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; return ["", "/products", "/blog", "/contact", "/terms", "/privacy"].map((path)=>({url:`${base}${path}`, lastModified:new Date()})).concat(products.map((p)=>({url:`${base}/products/${p.slug}`, lastModified:new Date()}))); }
