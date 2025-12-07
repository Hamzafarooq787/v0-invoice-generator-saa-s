import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { generateMetadata as generateSEO } from "@/lib/seo"
import { getCurrentProfile } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import InvoicesTable from "@/components/dashboard/invoices-table"

export const metadata: Metadata = generateSEO(
  "My Invoices",
  "View and manage your invoices",
  "/dashboard/invoices",
  true,
)

export default async function InvoicesPage() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/auth/signin")
  }

  if (profile.plan !== "pro") {
    redirect("/dashboard?upgrade=true")
  }

  const supabase = await createClient()
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })

  return (
    <DashboardLayout profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Invoices</h1>
          <p className="text-muted-foreground">View, edit, and manage all your invoices</p>
        </div>
        <InvoicesTable invoices={invoices || []} />
      </div>
    </DashboardLayout>
  )
}
