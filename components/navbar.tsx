"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { LinkIcon } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LinkIcon className="h-6 w-6" />
          <span>Shortly</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${pathname === "/" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
          >
            Home
          </Link>
          <Link
            href="/analytics"
            className={`text-sm font-medium ${pathname === "/analytics" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
          >
            Analytics
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

