import Link from "next/link";
import { ChevronRight, Quote, Search, Shield, Sparkles } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { ProductCard } from "@/components/sections/product-card";
import { SiteHeader } from "@/components/sections/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories, products } from "@/lib/data";

const faqs = [
  ["How are downloads protected?", "Paid orders generate signed Supabase Storage URLs and download records with expiry timestamps."],
  ["Can I use LemonSqueezy or Stripe?", "The app includes a LemonSqueezy checkout route and a Stripe-ready abstraction for future expansion."],
  ["Is this free to host?", "Yes. Use GitHub, Vercel's hobby plan, and Supabase's free project tier to launch."],
  ["Does it support admin workflows?", "Admins can upload products, manage categories, review orders, create coupons, and watch revenue analytics." ]
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <section className="py-16">
          <div className="container">
            <div className="mb-8 flex items-end justify-between gap-4"><div><Badge>Featured</Badge><h2 className="mt-3 text-3xl font-black sm:text-4xl">Premium drops for builders</h2></div><Button asChild variant="secondary"><Link href="/products">View all <ChevronRight className="h-4 w-4" /></Link></Button></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          </div>
        </section>
        <section className="py-16">
          <div className="container grid gap-6 md:grid-cols-3">
            {categories.map((category) => <Card key={category} className="p-6"><Sparkles className="mb-5 h-8 w-8 text-purple-300" /><h3 className="text-xl font-bold">{category}</h3><p className="mt-2 text-sm text-muted-foreground">Curated, reviewed, SEO-friendly digital assets for {category.toLowerCase()} teams.</p></Card>)}
          </div>
        </section>
        <section className="py-16">
          <div className="container grid gap-6 lg:grid-cols-3">
            {["Fast checkout", "Secure delivery", "Smart discovery"].map((title, index) => <Card key={title} className="p-6"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20">{index === 0 ? <Sparkles /> : index === 1 ? <Shield /> : <Search />}</div><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 text-muted-foreground">Production-ready UX patterns inspired by Gumroad, Stripe, Framer, and Vercel.</p></Card>)}
          </div>
        </section>
        <section className="py-16"><div className="container"><Card className="p-8 sm:p-12"><Quote className="h-10 w-10 text-purple-300" /><p className="mt-6 max-w-4xl text-2xl font-bold">“AdverX gives creators the marketplace polish, admin visibility, and secure fulfillment flow normally reserved for much larger teams.”</p><p className="mt-5 text-muted-foreground">— Maya Chen, Indie founder</p></Card></div></section>
        <section className="py-16"><div className="container"><h2 className="text-3xl font-black">FAQ</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{faqs.map(([q, a]) => <Card key={q} className="p-6"><h3 className="font-bold">{q}</h3><p className="mt-2 text-sm text-muted-foreground">{a}</p></Card>)}</div></div></section>
        <section className="py-16"><div className="container"><Card className="bg-gradient-to-br from-purple-600/30 to-fuchsia-600/20 p-10 text-center"><h2 className="text-4xl font-black">Ready to launch your store?</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Connect Supabase, add LemonSqueezy keys, upload your first product, and deploy on Vercel.</p><Button asChild size="lg" className="mt-8"><Link href="/signup">Create free account</Link></Button></Card></div></section>
      </main>
      <Footer />
    </>
  );
}
