import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { getUrlAnalytics } from "@/lib/actions"

export default async function AnalyticsPage() {
  const { urls, error } = await getUrlAnalytics(20)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">URL Analytics</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Track the performance of your shortened URLs
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl mt-8">
              {error ? (
                <div className="p-4 text-center text-red-500">{error}</div>
              ) : (
                <AnalyticsDashboard urls={urls || []} />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

