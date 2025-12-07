import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { generateMetadata as generateSEO } from "@/lib/seo"
import { getCurrentProfile } from "@/lib/auth"
import AdminLayout from "@/components/admin/admin-layout"
import AdminSettings from "@/components/admin/admin-settings"

export const metadata: Metadata = generateSEO(
  "Platform Settings",
  "Configure platform settings",
  "/admin/settings",
  true,
)

export default async function AdminSettingsPage() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/auth/signin")
  }

  if (!profile.is_admin) {
    redirect("/dashboard")
  }

  return (
    <AdminLayout profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground">Configure SEO, captcha, and brand settings</p>
        </div>
        <AdminSettings />
      </div>
    </AdminLayout>
  )
}
