import { Download, Heart, Receipt, Settings } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { orders } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const cards = [
  { icon: Download, label: "Downloads", value: "12" },
  { icon: Receipt, label: "Orders", value: "3" },
  { icon: Heart, label: "Wishlist", value: "8" },
  { icon: Settings, label: "Account", value: "Verified" }
];

export default function DashboardPage() {
  return <><SiteHeader /><main className="container py-10"><h1 className="text-4xl font-black">Your dashboard</h1><p className="mt-2 text-muted-foreground">Purchased products, secure downloads, account settings, wishlist, and order history.</p><div className="mt-8 grid gap-4 md:grid-cols-4">{cards.map(({ icon: Icon, label, value }) => <Card key={label} className="p-5"><Icon className="h-6 w-6 text-purple-300" /><p className="mt-4 text-sm text-muted-foreground">{label}</p><p className="text-2xl font-black">{value}</p></Card>)}</div><Card className="mt-8 overflow-hidden"><div className="border-b border-white/10 p-6"><h2 className="text-2xl font-bold">Order history</h2></div><div className="divide-y divide-white/10">{orders.map((order) => <div key={order.id} className="grid gap-3 p-5 md:grid-cols-5 md:items-center"><span className="font-mono text-sm">{order.id}</span><span className="md:col-span-2">{order.productTitle}</span><span>{formatCurrency(order.amount)}</span><Button size="sm" variant="secondary">Download</Button></div>)}</div></Card></main><Footer /></>;
}
