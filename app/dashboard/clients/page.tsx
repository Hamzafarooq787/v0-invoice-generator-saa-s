import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { generateMetadata as generateSEO } from "@/lib/seo"
import { getCurrentProfile } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import ClientsTable from "@/components/dashboard/clients-table"

export const metadata: Metadata = generateSEO("My Clients", "Manage your client contacts", "/dashboard/clients", true)

export default async function ClientsPage() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/auth/signin")
  }

  if (profile.plan !== "pro") {
    redirect("/dashboard?upgrade=true")
  }

  const supabase = await createClient()
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })

  return (
    <DashboardLayout profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Clients</h1>
          <p className="text-muted-foreground">Manage your client information</p>
        </div>
        <ClientsTable clients={clients || []} />
      </div>
    </DashboardLayout>
  )
}
