import { redirect } from "next/navigation"
import { getUrlBySlug, trackClick } from "@/lib/actions"
import { headers } from "next/headers"

export default async function RedirectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const headersList = headers()
  const userAgent = headersList.get("user-agent") || ""
  const ipAddress = headersList.get("x-forwarded-for") || "unknown"

  const result = await getUrlBySlug(slug)

  if (result.error) {
    redirect("/not-found")
  }

  // Track the click
  await trackClick(slug, ipAddress, userAgent)

  // Redirect to the original URL
  redirect(result.originalUrl)
}

