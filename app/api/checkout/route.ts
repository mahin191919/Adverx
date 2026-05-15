import { NextResponse } from "next/server";
import { products } from "@/lib/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const productId = String(formData.get("productId") ?? "");
  const product = products.find((item) => item.id === productId);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  if (!process.env.LEMONSQUEEZY_API_KEY || !process.env.LEMONSQUEEZY_STORE_ID) {
    return NextResponse.redirect(new URL(`/payment/success?demo=1&product=${product.slug}`, request.url));
  }

  const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: { custom: { product_id: product.id } },
          product_options: { name: product.title, description: product.description, redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success` }
        },
        relationships: { store: { data: { type: "stores", id: process.env.LEMONSQUEEZY_STORE_ID } } }
      }
    })
  });

  if (!response.ok) return NextResponse.json({ error: "Unable to create checkout" }, { status: 502 });
  const checkout = await response.json();
  return NextResponse.redirect(checkout.data.attributes.url);
}
