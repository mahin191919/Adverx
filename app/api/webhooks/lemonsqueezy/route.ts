import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseFetch } from "@/lib/supabase-rest";

function verifySignature(payload: string, signature: string | null) {
  if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET || !signature) return false;
  const hmac = crypto.createHmac("sha256", process.env.LEMONSQUEEZY_WEBHOOK_SECRET).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
}

async function sendConfirmationEmail(email: string | undefined, productTitle: string | undefined) {
  if (!email || !process.env.RESEND_API_KEY) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "AdverX Store <orders@adverx.store>", to: email, subject: "Your AdverX download is ready", html: `<p>Thanks for your purchase${productTitle ? ` of ${productTitle}` : ""}. Your download is available in your dashboard.</p>` })
  });
}

export async function POST(request: Request) {
  const payload = await request.text();
  if (!verifySignature(payload, request.headers.get("x-signature"))) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

  const event = JSON.parse(payload);
  if (event.meta?.event_name === "order_created") {
    const productId = event.meta?.custom_data?.product_id ?? event.data?.attributes?.custom_data?.product_id;
    const orderId = event.data?.id;
    const email = event.data?.attributes?.user_email;
    const total = Number(event.data?.attributes?.total_usd ?? 0) / 100;

    const [order] = await supabaseFetch<Array<{ id: string; product_id: string }>>("/rest/v1/orders", {
      method: "POST",
      serviceRole: true,
      body: JSON.stringify({ product_id: productId, provider_order_id: orderId, amount: total, status: "paid", metadata: event })
    });

    await supabaseFetch("/rest/v1/downloads", {
      method: "POST",
      serviceRole: true,
      body: JSON.stringify({ order_id: order.id, product_id: order.product_id, status: "active" })
    });

    await sendConfirmationEmail(email, event.data?.attributes?.first_order_item?.product_name);
  }

  return NextResponse.json({ received: true });
}
