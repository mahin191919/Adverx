export async function createSignedStorageUrl(path: string, expiresIn = 600) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) throw new Error("Missing Supabase server environment variables");

  const response = await fetch(`${url}/storage/v1/object/sign/product-files/${path}`, {
    method: "POST",
    headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ expiresIn })
  });
  if (!response.ok) throw new Error(await response.text());
  const data = await response.json() as { signedURL: string };
  return `${url}/storage/v1${data.signedURL}`;
}
