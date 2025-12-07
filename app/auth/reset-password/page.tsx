import type { Metadata } from "next"
import { generateMetadata as generateSEO } from "@/lib/seo"
import ResetPasswordForm from "@/components/auth/reset-password-form"
import AuthLayout from "@/components/auth/auth-layout"

export const metadata: Metadata = generateSEO(
  "Reset Password",
  "Reset your Airanko Invoice account password",
  "/auth/reset-password",
  true,
)

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  )
}
