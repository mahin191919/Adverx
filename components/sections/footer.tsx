import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-xl font-black">AdverX Store</p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">A production-ready dark digital marketplace for creators, founders, and product teams.</p>
        </div>
        <div>
          <p className="font-semibold">Platform</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground"><Link href="/products">Products</Link><Link href="/dashboard">Dashboard</Link><Link href="/admin">Admin</Link></div>
        </div>
        <div>
          <p className="font-semibold">Legal</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></div>
        </div>
      </div>
    </footer>
  );
}
