import { Navbar } from "@/components/navbar"
import { UrlShortener } from "@/components/url-shortener"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Shorten Your URLs, Expand Your Reach
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create short, memorable links that redirect to your long URLs. Track clicks and analyze your traffic.
                </p>
              </div>
              <UrlShortener />
            </div>
          </div>
        </section>
        <Features />
      </main>
      <Footer />
    </div>
  )
}

