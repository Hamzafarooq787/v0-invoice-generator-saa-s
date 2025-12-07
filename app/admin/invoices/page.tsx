import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { generateMetadata as generateSEO } from "@/lib/seo"
import { getCurrentProfile } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import AdminLayout from "@/components/admin/admin-layout"
import AdminInvoicesTable from "@/components/admin/admin-invoices-table"

export const metadata: Metadata = generateSEO("Global Invoices", "View all platform invoices", "/admin/invoices", true)

export default async function AdminInvoicesPage() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/auth/signin")
  }

  if (!profile.is_admin) {
    redirect("/dashboard")
  }

  const supabase = await createClient()
  const { data: invoices } = await supabase.from("invoices").select("*").order("created_at", { ascending: false })

  return (
    <AdminLayout profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Global Invoices</h1>
          <p className="text-muted-foreground">View all invoices across the platform (read-only)</p>
        </div>
        <AdminInvoicesTable invoices={invoices || []} />
      </div>
    </AdminLayout>
  )
}
