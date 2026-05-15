import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Star } from "lucide-react";
import { WishlistButton } from "@/components/marketplace/wishlist-button";
import { Footer } from "@/components/sections/footer";
import { ProductCard } from "@/components/sections/product-card";
import { SiteHeader } from "@/components/sections/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return buildMetadata({ title: product?.title ?? "Product", description: product?.description ?? "Digital product", path: `/products/${slug}` });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).concat(products.filter((item) => item.id !== product.id)).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-white/10">
              <Image src={product.thumbnail} alt={product.title} fill className="object-cover" priority />
            </div>
            <Card className="mt-6 p-6">
              <h2 className="text-2xl font-bold">What you get</h2>
              <div className="mt-5 grid gap-3 text-muted-foreground sm:grid-cols-2">
                {["Instant secure download", "Lifetime product updates", "Commercial license", "Email confirmation", "Preview gallery", "Related resources"].map((item) => (
                  <span key={item} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-300" />{item}</span>
                ))}
              </div>
            </Card>
            <Card className="mt-6 p-6">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {["Exactly what I needed for launch week.", "Clean files, great docs, instant delivery."].map((review) => (
                  <div key={review} className="rounded-2xl bg-white/5 p-4">
                    <div className="flex text-amber-300">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
                    <p className="mt-3 text-sm text-muted-foreground">{review}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-6">
              <Badge>{product.category}</Badge>
              <h1 className="mt-4 text-4xl font-black">{product.title}</h1>
              <p className="mt-4 text-muted-foreground">{product.description}</p>
              <div className="mt-5 flex items-center gap-4">
                <span className="flex items-center gap-1 text-amber-300"><Star className="h-4 w-4 fill-current" /> {product.rating}</span>
                <span className="text-muted-foreground">{product.sales.toLocaleString()} sales</span>
              </div>
              <div className="mt-6 text-5xl font-black">{formatCurrency(product.price)}</div>
              <Button asChild size="lg" className="mt-6 w-full"><Link href={`/checkout/${product.slug}`}>Buy now</Link></Button>
              <WishlistButton productId={product.id} />
            </Card>
          </aside>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-black">Related products</h2>
          <div className="grid gap-6 md:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
