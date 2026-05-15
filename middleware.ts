import { NextResponse, type NextRequest } from "next/server";

const hits = new Map<string, { count: number; reset: number }>();

function readRole(request: NextRequest) {
  const raw = request.cookies.get("adverx-user")?.value;
  if (!raw) return null;
  try {
    const normalized = raw.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
    return (JSON.parse(json) as { role?: string }).role ?? null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "local";
  const now = Date.now();
  const bucket = hits.get(ip) ?? { count: 0, reset: now + 60_000 };
  if (bucket.reset < now) {
    bucket.count = 0;
    bucket.reset = now + 60_000;
  }
  bucket.count += 1;
  hits.set(ip, bucket);
  if (bucket.count > 180) return new NextResponse("Too many requests", { status: 429 });

  if (request.nextUrl.pathname.startsWith("/admin") && readRole(request) !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/:path*"] };
