type SupabaseFetchOptions = RequestInit & { serviceRole?: boolean };

export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured");
  return url.replace(/\/$/, "");
}

function getSupabaseKey(serviceRole = false) {
  const key = serviceRole ? process.env.SUPABASE_SERVICE_ROLE_KEY : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error(serviceRole ? "SUPABASE_SERVICE_ROLE_KEY is not configured" : "NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured");
  return key;
}

export async function supabaseFetch<T>(path: string, options: SupabaseFetchOptions = {}) {
  const key = getSupabaseKey(options.serviceRole);
  const response = await fetch(`${getSupabaseUrl()}${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (response.status === 204) return null as T;
  return response.json() as Promise<T>;
}

export async function uploadToSupabaseStorage(bucket: string, path: string, file: File) {
  const key = getSupabaseKey(true);
  const response = await fetch(`${getSupabaseUrl()}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": file.type || "application/octet-stream", "x-upsert": "true" },
    body: file
  });
  if (!response.ok) throw new Error(await response.text());
  return `${bucket}/${path}`;
}
