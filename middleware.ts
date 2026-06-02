import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. Define Protected Routes
  // We use the Route Groups you created: (admin) and (dashboard)
  const isAdminRoute = path.startsWith("/dashboard") || 
                       path.startsWith("/donor_management") || 
                       path.startsWith("/request_moderator") ||
                       path.startsWith("/inbox") ||
                       path.startsWith("/blood-groups");

  const isAuthRoute = path.startsWith("/login") || path.startsWith("/signup");

  // 2. Get the session token (Works with Google, Facebook, and Credentials)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 3. SECURITY LOGIC
  
  // A. Redirect unauthenticated users trying to access Admin pages
  if (isAdminRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", path); // Redirect back here after login
    return NextResponse.redirect(loginUrl);
  }

  // B. Role-Based Access Control (RBAC)
  // Even if they are logged in, check if they are an ADMIN
  if (isAdminRoute && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url)); // Send to home if not admin
  }

  // C. Redirect authenticated users away from Login/Signup pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// 4. MATCHER CONFIG
// Pro Tip: Only run middleware on specific paths to keep the site fast
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};