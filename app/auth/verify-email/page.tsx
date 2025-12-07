import type { Metadata } from "next"
import { generateMetadata as generateSEO } from "@/lib/seo"
import AuthLayout from "@/components/auth/auth-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = generateSEO(
  "Verify Your Email",
  "Check your email to verify your Airanko Invoice account",
  "/auth/verify-email",
  true,
)

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>We've sent you a verification link</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            We've sent a verification email to your inbox. Click the link in the email to verify your account and start
            using Airanko Invoice.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or try signing up again.
          </p>
          <div className="pt-4">
            <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
              <Link href="/auth/signin">
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
