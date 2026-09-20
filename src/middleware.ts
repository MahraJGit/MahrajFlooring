import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/lib/auth/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/manage" || pathname.startsWith("/manage/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/manage/, "/admin") || "/admin";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/manage",
    "/manage/:path*",
  ],
};
