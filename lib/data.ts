import type { Order, Product } from "@/lib/types";

export const categories = ["Design", "Templates", "Code", "Marketing", "AI", "E-books"];

export const products: Product[] = [
  {
    id: "prod_1",
    title: "Neon SaaS Landing Kit",
    slug: "neon-saas-landing-kit",
    description: "A polished Framer-inspired landing page kit with 18 sections, dark gradients, pricing, FAQs, and conversion-focused copy blocks.",
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop"],
    price: 39,
    tags: ["Next.js", "SaaS", "Landing"],
    category: "Templates",
    rating: 4.9,
    sales: 1840,
    trending: true
  },
  {
    id: "prod_2",
    title: "Creator Analytics Dashboard",
    slug: "creator-analytics-dashboard",
    description: "Admin analytics dashboard for digital sellers with revenue cards, charts, user tables, and product management screens.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"],
    price: 59,
    tags: ["Dashboard", "Admin", "Charts"],
    category: "Code",
    rating: 4.8,
    sales: 960,
    trending: true
  },
  {
    id: "prod_3",
    title: "AI Prompt Vault Pro",
    slug: "ai-prompt-vault-pro",
    description: "400+ tested prompts for founders, marketers, developers, and designers packaged with Notion and PDF versions.",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"],
    price: 19,
    tags: ["AI", "Prompts", "Notion"],
    category: "AI",
    rating: 4.7,
    sales: 3120
  },
  {
    id: "prod_4",
    title: "Launch Email Swipe File",
    slug: "launch-email-swipe-file",
    description: "High-converting launch emails, welcome sequences, abandoned cart templates, and segmentation playbooks.",
    thumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"],
    price: 29,
    tags: ["Email", "Marketing", "Copy"],
    category: "Marketing",
    rating: 4.9,
    sales: 1433
  }
];

export const orders: Order[] = [
  { id: "ORD-1057", productTitle: "Neon SaaS Landing Kit", amount: 39, status: "paid", createdAt: "2026-05-10" },
  { id: "ORD-1058", productTitle: "AI Prompt Vault Pro", amount: 19, status: "paid", createdAt: "2026-05-12" },
  { id: "ORD-1059", productTitle: "Creator Analytics Dashboard", amount: 59, status: "pending", createdAt: "2026-05-14" }
];
