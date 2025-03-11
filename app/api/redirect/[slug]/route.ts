import { type NextRequest, NextResponse } from "next/server"
import { getUrlBySlug, trackClick } from "@/lib/actions"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug

  if (!slug) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  try {
    const result = await getUrlBySlug(slug)

    if (result.error) {
      return NextResponse.redirect(new URL("/not-found", request.url))
    }

    // Track the click
    const ipAddress = request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || ""
    await trackClick(slug, ipAddress, userAgent)

    // Redirect to the original URL
    return NextResponse.redirect(new URL(result.originalUrl))
  } catch (error) {
    console.error("Error redirecting:", error)
    return NextResponse.redirect(new URL("/not-found", request.url))
  }
}

