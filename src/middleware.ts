import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "pm_secure_token";

const AUTH_ROUTE = "/sign-in";
const DASHBOARD_ROUTE = "/dashboard";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME);
  let redirect: string | undefined;

  if (request.nextUrl.pathname === AUTH_ROUTE && cookie) {
    // trying to access authentication routes but is logged in
    redirect = DASHBOARD_ROUTE;
  }

  if (!cookie && request.nextUrl.pathname !== AUTH_ROUTE) {
    // trying to access dashboard routes but is not logged in
    redirect = AUTH_ROUTE;
  }

  const response = redirect
    ? NextResponse.redirect(new URL(redirect, request.url))
    : NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
  ],
};