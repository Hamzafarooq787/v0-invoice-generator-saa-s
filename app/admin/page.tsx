import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { generateMetadata as generateSEO } from "@/lib/seo"
import { getCurrentProfile } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import AdminLayout from "@/components/admin/admin-layout"
import AdminOverview from "@/components/admin/admin-overview"

export const metadata: Metadata = generateSEO("Admin Dashboard", "Manage your invoice platform", "/admin", true)

export default async function AdminPage() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/auth/signin")
  }

  if (!profile.is_admin) {
    redirect("/dashboard")
  }

  // Fetch admin stats
  const supabase = await createClient()

  const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { count: proUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("plan", "pro")

  const { count: totalInvoices } = await supabase.from("invoices").select("*", { count: "exact", head: true })

  const { data: invoiceStats } = await supabase.from("invoices").select("total_amount")

  const totalRevenue = invoiceStats?.reduce((sum, inv) => sum + Number(inv.total_amount), 0) || 0

  const stats = {
    totalUsers: totalUsers || 0,
    proUsers: proUsers || 0,
    totalInvoices: totalInvoices || 0,
    totalRevenue,
  }

  return (
    <AdminLayout profile={profile}>
      <AdminOverview stats={stats} />
    </AdminLayout>
  )
}
