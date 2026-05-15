import Image from "next/image";
import Link from "next/link";
import { Download, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1 hover:border-purple-400/40">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image src={product.thumbnail} alt={product.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {product.trending && <Badge className="absolute left-4 top-4">Trending</Badge>}
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <Badge>{product.category}</Badge>
          <span className="flex items-center gap-1 text-sm text-amber-300"><Star className="h-4 w-4 fill-current" /> {product.rating}</span>
        </div>
        <Link href={`/products/${product.slug}`}><h3 className="mt-4 text-xl font-bold transition group-hover:text-purple-200">{product.title}</h3></Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-black">{formatCurrency(product.price)}</span>
          <Button asChild size="sm"><Link href={`/checkout/${product.slug}`}><Download className="h-4 w-4" /> Buy</Link></Button>
        </div>
      </div>
    </Card>
  );
}
