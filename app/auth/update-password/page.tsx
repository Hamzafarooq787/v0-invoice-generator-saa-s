import type { Metadata } from "next"
import { generateMetadata as generateSEO } from "@/lib/seo"
import UpdatePasswordForm from "@/components/auth/update-password-form"
import AuthLayout from "@/components/auth/auth-layout"

export const metadata: Metadata = generateSEO(
  "Set New Password",
  "Set a new password for your Airanko Invoice account",
  "/auth/update-password",
  true,
)

export default function UpdatePasswordPage() {
  return (
    <AuthLayout>
      <UpdatePasswordForm />
    </AuthLayout>
  )
}
