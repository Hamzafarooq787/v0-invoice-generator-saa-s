import type { Metadata } from "next"
import { generateMetadata as generateSEO } from "@/lib/seo"
import AuthLayout from "@/components/auth/auth-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = generateSEO(
  "Authentication Error",
  "An error occurred during authentication",
  "/auth/error",
  true,
)

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Something Went Wrong</CardTitle>
          <CardDescription>An error occurred during authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {params.error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">
              Error code: {params.error}
            </div>
          )}
          <p className="text-center text-sm text-muted-foreground">
            Please try again or contact support if the problem persists.
          </p>
          <div className="flex flex-col gap-2 pt-4">
            <Button asChild>
              <Link href="/auth/signin">Try Again</Link>
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent" asChild>
              <Link href="/invoice">
                <ArrowLeft className="h-4 w-4" />
                Back to Invoice Generator
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
