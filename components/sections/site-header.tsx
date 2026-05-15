import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/products", label: "Marketplace" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-glow"><Sparkles className="h-5 w-5" /></span>
          <span>AdverX Store</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => <Link key={item.href} className="text-sm text-muted-foreground transition hover:text-white" href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link href="/login">Login</Link></Button>
          <Button asChild><Link href="/signup"><ShoppingBag className="h-4 w-4" /> Start selling</Link></Button>
        </div>
      </div>
    </header>
  );
}
