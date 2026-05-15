import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <main className="container grid min-h-screen place-items-center py-12"><Card className="w-full max-w-lg p-6"><Lock className="h-10 w-10 text-purple-300" /><h1 className="mt-5 text-3xl font-black">Secure checkout</h1><p className="mt-2 text-muted-foreground">{product.title}</p><div className="my-6 flex items-center justify-between rounded-2xl bg-white/5 p-4"><span>Total</span><span className="text-2xl font-black">{formatCurrency(product.price)}</span></div><form action="/api/checkout" method="POST"><input type="hidden" name="productId" value={product.id} /><Button className="w-full" size="lg" type="submit">Pay with LemonSqueezy</Button></form><Button asChild variant="secondary" className="mt-3 w-full"><Link href="/payment/success">Demo success flow</Link></Button></Card></main>;
}
