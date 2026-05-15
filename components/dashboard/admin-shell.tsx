import Link from "next/link";
import { BarChart3, Boxes, Receipt, Settings, Tags, Users } from "lucide-react";

const links = [
  ["/admin", "Analytics", BarChart3], ["/admin#products", "Products", Boxes], ["/admin#orders", "Orders", Receipt], ["/admin#users", "Users", Users], ["/admin#coupons", "Coupons", Tags], ["/admin#settings", "Settings", Settings]
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="container grid gap-6 py-8 lg:grid-cols-[260px_1fr]"><aside className="glass sticky top-6 h-fit rounded-3xl p-4"><p className="px-3 py-2 text-lg font-black">AdverX Admin</p><nav className="mt-4 grid gap-1">{links.map(([href,label,Icon]) => <Link key={label} href={href} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-muted-foreground transition hover:bg-white/10 hover:text-white"><Icon className="h-4 w-4" />{label}</Link>)}</nav></aside><section>{children}</section></div>;
}
