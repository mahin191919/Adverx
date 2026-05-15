import { cookies } from "next/headers";

export type SessionUser = { id?: string; email?: string; role?: string };

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("adverx-user")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as SessionUser;
  } catch {
    return null;
  }
}

export function encodeSessionUser(user: SessionUser) {
  return Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
}
