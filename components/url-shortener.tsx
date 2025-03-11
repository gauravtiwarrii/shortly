"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Check, ExternalLink } from "lucide-react"
import { shortenUrl } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"

export function UrlShortener() {
  const [longUrl, setLongUrl] = useState("")
  const [customSlug, setCustomSlug] = useState("")
  const [useCustomSlug, setUseCustomSlug] = useState(false)
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!longUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const slug = useCustomSlug && customSlug ? customSlug : undefined

      // Make sure the URL has a protocol
      let urlToShorten = longUrl
      if (!/^https?:\/\//i.test(longUrl)) {
        urlToShorten = `https://${longUrl}`
      }

      const result = await shortenUrl(urlToShorten, slug)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      setShortUrl(result.shortUrl)
      toast({
        title: "Success",
        description: "URL shortened successfully!",
      })
    } catch (error) {
      console.error("Error shortening URL:", error)
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard",
    })
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Enter your long URL</Label>
          <Input
            id="url"
            type="text"
            placeholder="example.com/very/long/url/that/needs/shortening"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="custom-slug"
            checked={useCustomSlug}
            onCheckedChange={(checked) => setUseCustomSlug(checked === true)}
          />
          <Label
            htmlFor="custom-slug"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Use custom slug
          </Label>
        </div>

        {useCustomSlug && (
          <div className="space-y-2">
            <Label htmlFor="custom-slug-input">Custom slug</Label>
            <Input
              id="custom-slug-input"
              placeholder="my-custom-slug"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>

      {shortUrl && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Your shortened URL</Label>
                <div className="flex items-center">
                  <Input value={shortUrl} readOnly className="flex-1" />
                  <Button variant="ghost" size="icon" onClick={copyToClipboard} className="ml-2">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy URL</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => window.open(shortUrl, "_blank")} className="ml-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Open URL</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

