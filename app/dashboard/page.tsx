import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { generateMetadata as generateSEO } from "@/lib/seo"
import { getCurrentProfile } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import DashboardOverview from "@/components/dashboard/dashboard-overview"

export const metadata: Metadata = generateSEO(
  "Dashboard",
  "Manage your invoices and track payments",
  "/dashboard",
  true,
)

export default async function DashboardPage() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/auth/signin")
  }

  // Fetch dashboard stats
  const supabase = await createClient()
  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, total_amount, amount_paid, balance_due, status")
    .eq("user_id", profile.id)

  const stats = {
    totalInvoices: invoices?.length || 0,
    totalBilled: invoices?.reduce((sum, inv) => sum + Number(inv.total_amount), 0) || 0,
    totalPaid: invoices?.reduce((sum, inv) => sum + Number(inv.amount_paid), 0) || 0,
    outstanding: invoices?.reduce((sum, inv) => sum + Number(inv.balance_due), 0) || 0,
  }

  return (
    <DashboardLayout profile={profile}>
      <DashboardOverview stats={stats} isPro={profile.plan === "pro"} />
    </DashboardLayout>
  )
}
