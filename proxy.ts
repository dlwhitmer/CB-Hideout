import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/admin/:path*",
    "/cart",
    "/checkout",
    "/account",
  ],
};

export default function proxy(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Cookies must be read from request.headers in Proxy API
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );

  const role = cookies["role"];
  const userId = cookies["userId"];

  // Allow admin login page
  if (pathname === "/admin-login") {
    return NextResponse.next();
  }

  // Protect ALL admin pages
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/admin-login", request.url));

    }
  }

  // Protect user pages
  const protectedRoutes = ["/cart", "/checkout", "/account"];
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!userId) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
