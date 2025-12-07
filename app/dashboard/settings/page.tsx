import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { generateMetadata as generateSEO } from "@/lib/seo"
import { getCurrentProfile } from "@/lib/auth"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import SettingsForm from "@/components/dashboard/settings-form"

export const metadata: Metadata = generateSEO("Settings", "Manage your account settings", "/dashboard/settings", true)

export default async function SettingsPage() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/auth/signin")
  }

  return (
    <DashboardLayout profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and company information</p>
        </div>
        <SettingsForm profile={profile} />
      </div>
    </DashboardLayout>
  )
}
