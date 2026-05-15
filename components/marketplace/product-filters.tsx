"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/sections/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/types";

export function ProductFilters({ categories, products }: { categories: string[]; products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const [trendingOnly, setTrendingOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = [product.title, product.description, product.category, product.tags.join(" ")].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      const matchesPrice = price === "All" || (price === "Under $30" ? product.price < 30 : product.price >= 30);
      const matchesTrending = !trendingOnly || product.trending;
      return matchesQuery && matchesCategory && matchesPrice && matchesTrending;
    });
  }, [category, price, products, query, trendingOnly]);

  return (
    <>
      <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search templates, AI prompts, dashboards..." />
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((item) => <button key={item} onClick={() => setCategory(item)}><Badge className={category === item ? "border-purple-300/60 bg-purple-500/30" : undefined}>{item}</Badge></button>)}
          {["All", "Under $30", "$30+"].map((item) => <button key={item} onClick={() => setPrice(item)}><Badge className={price === item ? "border-fuchsia-300/60 bg-fuchsia-500/30" : undefined}>{item}</Badge></button>)}
          <Button size="sm" variant={trendingOnly ? "default" : "secondary"} onClick={() => setTrendingOnly((value) => !value)}>Trending</Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      {filteredProducts.length === 0 && <div className="glass rounded-3xl p-10 text-center text-muted-foreground">No products match these filters yet.</div>}
    </>
  );
}
