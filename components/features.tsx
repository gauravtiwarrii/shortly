import { BarChart3, Clock, Link2, Shield } from "lucide-react"

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Everything you need to manage and track your shortened URLs
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Link2 className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">URL Shortening</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Create short, memorable links that redirect to your long URLs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <BarChart3 className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Analytics</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Track clicks, geographic data, and referrers for your links.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Shield className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Custom Domain</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Use your own domain for branded short links.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Clock className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Link History</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Access and manage all your shortened links in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

