import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export default function SuccessPage(){return <main className="container grid min-h-screen place-items-center py-12"><Card className="max-w-lg p-8 text-center"><CheckCircle className="mx-auto h-16 w-16 text-emerald-300"/><h1 className="mt-5 text-3xl font-black">Payment successful</h1><p className="mt-3 text-muted-foreground">Your order is saved, the product is unlocked, a secure download link is generated, and a confirmation email can be sent by your email provider.</p><Button asChild className="mt-6"><Link href="/dashboard">Go to downloads</Link></Button></Card></main>}
