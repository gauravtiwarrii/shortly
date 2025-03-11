import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function DomainSetupGuide() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "shortly.sillygeeks.com"

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Custom Domain Setup Guide</CardTitle>
        <CardDescription>Follow these steps to set up your custom domain for URL shortening</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Your URL shortener is configured to use <strong>{domain}</strong> as the custom domain.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium">1. Add your domain in Vercel</h3>
              <p className="text-sm text-muted-foreground">
                Go to your Vercel project settings and add <strong>{domain}</strong> as a domain.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium">2. Configure DNS settings</h3>
              <p className="text-sm text-muted-foreground">
                Add the DNS records provided by Vercel to your domain registrar.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium">3. Verify domain ownership</h3>
              <p className="text-sm text-muted-foreground">
                Follow Vercel's instructions to verify that you own the domain.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium">4. Wait for DNS propagation</h3>
              <p className="text-sm text-muted-foreground">
                DNS changes can take up to 48 hours to propagate globally.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

