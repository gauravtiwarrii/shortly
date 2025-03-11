"use server"

import { nanoid } from "nanoid"
import clientPromise from "./db"
import { revalidatePath } from "next/cache"

// Update the shortenUrl function to properly handle the URL shortening
export async function shortenUrl(longUrl: string, customSlug?: string) {
  try {
    // Validate URL
    try {
      new URL(longUrl)
    } catch (error) {
      return { error: "Invalid URL. Please enter a valid URL including http:// or https://" }
    }

    const client = await clientPromise
    const db = client.db("url-shortener")
    const urlsCollection = db.collection("urls")

    // Generate slug or use custom one
    const slug = customSlug || nanoid(7)

    // Check if custom slug already exists
    if (customSlug) {
      const existingUrl = await urlsCollection.findOne({ slug: customSlug })
      if (existingUrl) {
        return { error: "Custom slug already in use. Please choose another one." }
      }
    }

    // Create URL document
    const urlDoc = {
      originalUrl: longUrl,
      slug,
      createdAt: new Date(),
      clicks: 0,
    }

    // Insert into database
    await urlsCollection.insertOne(urlDoc)

    // Construct short URL
    const domain = process.env.NEXT_PUBLIC_DOMAIN || "shortly.sillygeeks.com"
    const shortUrl = `https://${domain}/${slug}`

    return { shortUrl, slug }
  } catch (error) {
    console.error("Error shortening URL:", error)
    return { error: "Failed to shorten URL. Please try again." }
  }
}

export async function getUrlBySlug(slug: string) {
  try {
    const client = await clientPromise
    const db = client.db("url-shortener")
    const urlsCollection = db.collection("urls")

    const urlDoc = await urlsCollection.findOne({ slug })

    if (!urlDoc) {
      return { error: "URL not found" }
    }

    return { originalUrl: urlDoc.originalUrl }
  } catch (error) {
    console.error("Error getting URL:", error)
    return { error: "Failed to retrieve URL" }
  }
}

export async function trackClick(slug: string, ipAddress: string, userAgent: string) {
  try {
    const client = await clientPromise
    const db = client.db("url-shortener")
    const urlsCollection = db.collection("urls")
    const analyticsCollection = db.collection("analytics")

    // Update click count
    await urlsCollection.updateOne({ slug }, { $inc: { clicks: 1 } })

    // Record analytics
    await analyticsCollection.insertOne({
      slug,
      timestamp: new Date(),
      ipAddress,
      userAgent,
    })

    revalidatePath(`/analytics`)
  } catch (error) {
    console.error("Error tracking click:", error)
  }
}

export async function getUrlAnalytics(limit = 10) {
  try {
    const client = await clientPromise
    const db = client.db("url-shortener")
    const urlsCollection = db.collection("urls")

    const urls = await urlsCollection.find({}).sort({ clicks: -1 }).limit(limit).toArray()

    return { urls }
  } catch (error) {
    console.error("Error getting analytics:", error)
    return { error: "Failed to retrieve analytics" }
  }
}

