import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { encodeSessionUser } from "@/lib/auth";
import { getSupabaseUrl } from "@/lib/supabase-rest";
import { requireEmail, requireString } from "@/lib/validation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function authHeaders() {
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anon) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured");
  return { apikey: anon, Authorization: `Bearer ${anon}`, "Content-Type": "application/json" };
}

export async function POST(request: Request, { params }: { params: Promise<{ mode: string }> }) {
  const { mode } = await params;
  const formData = await request.formData();
  const email = requireEmail(formData.get("email"));
  if (!email.ok) return NextResponse.json({ error: email.error }, { status: 400 });

  if (mode === "reset") {
    await fetch(`${getSupabaseUrl()}/auth/v1/recover`, { method: "POST", headers: authHeaders(), body: JSON.stringify({ email: email.data }) });
    return NextResponse.redirect(new URL("/login?message=reset-sent", request.url));
  }

  const password = requireString(formData.get("password"), "Password", 8);
  if (!password.ok) return NextResponse.json({ error: password.error }, { status: 400 });

  const endpoint = mode === "signup" ? "/auth/v1/signup" : "/auth/v1/token?grant_type=password";
  const response = await fetch(`${getSupabaseUrl()}${endpoint}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ email: email.data, password: password.data, options: { emailRedirectTo: `${siteUrl}/dashboard` } })
  });

  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  const data = await response.json();
  const cookieStore = await cookies();
  if (data.access_token) cookieStore.set("sb-access-token", data.access_token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
  const user = data.user ?? data;
  cookieStore.set("adverx-user", encodeSessionUser({ id: user.id, email: user.email, role: email.data === process.env.ADMIN_EMAILS?.split(",")[0] ? "admin" : "customer" }), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
  return NextResponse.redirect(new URL(mode === "signup" ? "/dashboard?message=verify-email" : "/dashboard", request.url));
}
