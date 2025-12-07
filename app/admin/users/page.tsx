import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { generateMetadata as generateSEO } from "@/lib/seo"
import { getCurrentProfile } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import AdminLayout from "@/components/admin/admin-layout"
import UsersTable from "@/components/admin/users-table"

export const metadata: Metadata = generateSEO("User Management", "Manage platform users", "/admin/users", true)

export default async function AdminUsersPage() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/auth/signin")
  }

  if (!profile.is_admin) {
    redirect("/dashboard")
  }

  const supabase = await createClient()
  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return (
    <AdminLayout profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">View and manage all platform users</p>
        </div>
        <UsersTable users={users || []} />
      </div>
    </AdminLayout>
  )
}
