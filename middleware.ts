import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Get hostname from request (e.g. shortly.sillygeeks.com)
  const hostname = request.headers.get("host") || ""
  const currentDomain = process.env.NEXT_PUBLIC_DOMAIN || ""

  // Check if the hostname matches our custom domain
  const isCustomDomain = hostname === currentDomain

  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/static") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // If we're on our custom domain and the path is not a known route,
  // treat it as a potential short URL slug
  if (
    isCustomDomain &&
    !request.nextUrl.pathname.startsWith("/analytics") &&
    !request.nextUrl.pathname.startsWith("/setup") &&
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/not-found"
  ) {
    // The slug is the entire path without the leading slash
    const slug = request.nextUrl.pathname.slice(1)

    // Rewrite to the API route that handles redirects
    return NextResponse.rewrite(new URL(`/api/redirect/${slug}`, request.url))
  }

  // For all other cases, continue with normal routing
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

