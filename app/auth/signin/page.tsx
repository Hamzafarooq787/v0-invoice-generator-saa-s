import type { Metadata } from "next"
import { generateMetadata as generateSEO } from "@/lib/seo"
import SignInForm from "@/components/auth/signin-form"
import AuthLayout from "@/components/auth/auth-layout"

export const metadata: Metadata = generateSEO(
  "Sign In",
  "Sign in to your Airanko Invoice account",
  "/auth/signin",
  true,
)

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  )
}
