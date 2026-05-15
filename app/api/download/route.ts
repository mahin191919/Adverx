import { NextResponse } from "next/server";
import { createSignedStorageUrl } from "@/lib/supabase-server";
import { supabaseFetch } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const { token } = await request.json();
  if (!token || typeof token !== "string") return NextResponse.json({ error: "Missing download token" }, { status: 400 });

  try {
    const [download] = await supabaseFetch<Array<{ id: string; product_id: string; products: { file_path: string } }>>(`/rest/v1/downloads?token=eq.${token}&status=eq.active&expires_at=gt.${new Date().toISOString()}&select=id,product_id,products(file_path)`, { serviceRole: true });
    if (!download) return NextResponse.json({ error: "Download is unavailable or expired" }, { status: 404 });

    const url = await createSignedStorageUrl(download.products.file_path, 60 * 10);
    await supabaseFetch(`/rest/v1/downloads?id=eq.${download.id}`, { method: "PATCH", serviceRole: true, body: JSON.stringify({ download_count: 1 }) });
    return NextResponse.json({ url, expiresIn: 600 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to sign download" }, { status: 400 });
  }
}
