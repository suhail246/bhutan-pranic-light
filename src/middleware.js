import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import ROUTES from "./constants/routes";
import setLanguageAction from "./i18n/set-language-action";

// NOTE: Deifine Routes -->
const authRoutes = ["/login"];

const protectedRoutes = ["/admin"];

// NOTE: Main middleware function
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // NextAuth token
  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const cookie = await cookies();
  const language = cookie.get("language");
  if (!language) {
    setLanguageAction("en");
  }

  const token = nextAuthToken || null;
  const redirect = (path) => NextResponse.redirect(new URL(path, request.url));

  // Handle Auth Routes
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    return token
      ? redirect(ROUTES.ADMIN_DASHBOARD_ECOMMERCE)
      : NextResponse.next();
  }

  // Handle Protected Routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) return redirect(ROUTES.LOGIN);

    if (!token.role.includes("Admin")) {
      return redirect(ROUTES.HOME);
    }

    return NextResponse.next();
  }

  // Allow the request to proceed if no conditions matched
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Auth
    "/login",
    // IDEA Protected ----------------
    "/admin/:path*",
  ],
};
