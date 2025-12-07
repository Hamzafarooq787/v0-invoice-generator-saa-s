import type { Metadata } from "next"
import { Suspense } from "react"
import { generateMetadata as generateSEO } from "@/lib/seo"
import SignUpForm from "@/components/auth/signup-form"
import AuthLayout from "@/components/auth/auth-layout"
import { Loader2 } from "lucide-react"

export const metadata: Metadata = generateSEO(
  "Sign Up",
  "Create your Airanko Invoice account to save invoices and track payments",
  "/auth/signup",
  true,
)

function SignUpFormFallback() {
  return (
    <div className="flex h-64 w-full max-w-md items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}

export default function SignUpPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<SignUpFormFallback />}>
        <SignUpForm />
      </Suspense>
    </AuthLayout>
  )
}
