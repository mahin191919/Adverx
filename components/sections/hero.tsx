"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="mb-6 inline-flex rounded-full border border-purple-300/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-100">New: instant delivery marketplace stack</div>
          <h1 className="text-gradient text-5xl font-black tracking-tight sm:text-7xl">Sell premium digital products in minutes.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">AdverX Store combines Supabase auth, secure file delivery, LemonSqueezy checkout, dashboards, coupons, reviews, and SEO-ready storefront pages.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/products">Explore products <ArrowRight className="h-5 w-5" /></Link></Button>
            <Button asChild size="lg" variant="secondary"><Link href="/admin">Open admin demo</Link></Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-purple-300" /> Protected downloads</span>
            <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-purple-300" /> Fast Vercel deployment</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1 }} className="glass animate-float rounded-[2rem] p-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
            <div className="mb-5 flex items-center justify-between"><span className="font-semibold">Revenue</span><span className="text-emerald-300">+38.2%</span></div>
            <div className="h-52 rounded-3xl bg-gradient-to-br from-purple-500/40 via-fuchsia-500/20 to-transparent p-5">
              <div className="h-full rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-5xl font-black">$42.8k</div>
                <p className="mt-3 text-sm text-muted-foreground">Digital downloads delivered automatically this month.</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm"><div className="rounded-2xl bg-white/5 p-3">1.8k<br /><span className="text-muted-foreground">Sales</span></div><div className="rounded-2xl bg-white/5 p-3">94%<br /><span className="text-muted-foreground">SEO</span></div><div className="rounded-2xl bg-white/5 p-3">4.9<br /><span className="text-muted-foreground">Rating</span></div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
