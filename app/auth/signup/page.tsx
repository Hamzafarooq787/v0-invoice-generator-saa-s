import type { Metadata } from "next"
import { generateMetadata as generateSEO } from "@/lib/seo"
import SignUpForm from "@/components/auth/signup-form"
import AuthLayout from "@/components/auth/auth-layout"

export const metadata: Metadata = generateSEO(
  "Sign Up",
  "Create your Airanko Invoice account to save invoices and track payments",
  "/auth/signup",
  true,
)

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  )
}
