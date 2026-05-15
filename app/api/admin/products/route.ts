import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { supabaseFetch, uploadToSupabaseStorage } from "@/lib/supabase-rest";
import { requirePrice, requireString } from "@/lib/validation";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (user?.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });

  const formData = await request.formData();
  const title = requireString(formData.get("title"), "Title");
  const description = requireString(formData.get("description"), "Description", 20);
  const category = requireString(formData.get("category"), "Category");
  const price = requirePrice(formData.get("price"));
  const file = formData.get("file");
  if (!title.ok) return NextResponse.json({ error: title.error }, { status: 400 });
  if (!description.ok) return NextResponse.json({ error: description.error }, { status: 400 });
  if (!category.ok) return NextResponse.json({ error: category.error }, { status: 400 });
  if (!price.ok) return NextResponse.json({ error: price.error }, { status: 400 });
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Digital product file is required" }, { status: 400 });

  const slug = title.data.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const filePath = await uploadToSupabaseStorage("product-files", `${slug}/${file.name}`, file);
  const product = await supabaseFetch("/rest/v1/products", {
    method: "POST",
    serviceRole: true,
    body: JSON.stringify({ title: title.data, slug, description: description.data, price: price.data, file_path: filePath, tags: String(formData.get("tags") ?? "").split(",").map((tag) => tag.trim()).filter(Boolean), is_published: true })
  });
  if (request.headers.get("accept")?.includes("text/html")) {
    return NextResponse.redirect(new URL("/admin?uploaded=1#products", request.url));
  }
  return NextResponse.json({ product });
}
