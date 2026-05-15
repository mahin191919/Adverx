import { ProductFilters } from "@/components/marketplace/product-filters";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Badge } from "@/components/ui/badge";
import { categories, products } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Marketplace", description: "Browse premium digital products, templates, prompts, and code assets.", path: "/products" });

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-12">
        <div className="mb-10">
          <Badge>Marketplace</Badge>
          <h1 className="mt-3 text-4xl font-black">Discover your next digital advantage</h1>
          <p className="mt-3 text-muted-foreground">Search by keyword, filter by category, price, and trending status.</p>
        </div>
        <ProductFilters categories={categories} products={products} />
      </main>
      <Footer />
    </>
  );
}
