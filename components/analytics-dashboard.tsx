"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Copy, Check, Search } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Url {
  _id: string
  originalUrl: string
  slug: string
  createdAt: string
  clicks: number
}

interface AnalyticsDashboardProps {
  urls: Url[]
}

export function AnalyticsDashboard({ urls }: AnalyticsDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const domain = process.env.NEXT_PUBLIC_DOMAIN || "shortly.sillygeeks.com"

  const filteredUrls = urls.filter(
    (url) =>
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const copyToClipboard = (slug: string) => {
    const shortUrl = `https://${domain}/${slug}`
    navigator.clipboard.writeText(shortUrl)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  const openUrl = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>URL Analytics Overview</CardTitle>
          <CardDescription>Track the performance of your shortened URLs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by URL or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Short URL</TableHead>
                  <TableHead>Original URL</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUrls.length > 0 ? (
                  filteredUrls.map((url) => (
                    <TableRow key={url._id}>
                      <TableCell className="font-medium">{`${domain}/${url.slug}`}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{url.originalUrl}</TableCell>
                      <TableCell>{formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}</TableCell>
                      <TableCell className="text-right">{url.clicks}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => copyToClipboard(url.slug)}>
                            {copiedSlug === url.slug ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span className="sr-only">Copy URL</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openUrl(`https://${domain}/${url.slug}`)}>
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Open URL</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No URLs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

