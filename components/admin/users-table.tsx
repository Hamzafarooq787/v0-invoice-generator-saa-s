"use client"

import { useState } from "react"
import type { Profile } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Crown, Shield, Ban, Users } from "lucide-react"
import { toast } from "sonner"

interface UsersTableProps {
  users: Profile[]
}

export default function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, setPlanFilter] = useState<string>("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company_email?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPlan = planFilter === "all" || user.plan === planFilter

    return matchesSearch && matchesPlan
  })

  const handleSetPlan = async (userId: string, plan: "free" | "pro") => {
    const supabase = createClient()
    const { error } = await supabase.from("profiles").update({ plan }).eq("id", userId)

    if (error) {
      toast.error("Failed to update plan")
      return
    }

    setUsers(users.map((u) => (u.id === userId ? { ...u, plan } : u)))
    toast.success(`User plan updated to ${plan}`)
  }

  const handleSetAdmin = async (userId: string, isAdmin: boolean) => {
    const supabase = createClient()
    const { error } = await supabase.from("profiles").update({ is_admin: isAdmin }).eq("id", userId)

    if (error) {
      toast.error("Failed to update admin status")
      return
    }

    setUsers(users.map((u) => (u.id === userId ? { ...u, is_admin: isAdmin } : u)))
    toast.success(isAdmin ? "User is now an admin" : "Admin access removed")
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Users ({filteredUsers.length})</CardTitle>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:w-64"
            />
          </div>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredUsers.length === 0 ? (
          <div className="py-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-medium text-foreground">No users found</h3>
            <p className="mt-1 text-muted-foreground">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                          {(user.full_name?.[0] || "U").toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.full_name || "Unknown"}</p>
                          <p className="text-sm text-muted-foreground">{user.company_email || "No email"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.company_name || "—"}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          user.plan === "pro"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
                            : ""
                        }
                      >
                        {user.plan === "pro" && <Crown className="mr-1 h-3 w-3" />}
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.is_admin && (
                        <Badge className="bg-primary">
                          <Shield className="mr-1 h-3 w-3" />
                          Admin
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.plan === "free" ? (
                            <DropdownMenuItem onClick={() => handleSetPlan(user.id, "pro")}>
                              <Crown className="mr-2 h-4 w-4" />
                              Upgrade to Pro
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleSetPlan(user.id, "free")}>
                              <Ban className="mr-2 h-4 w-4" />
                              Downgrade to Free
                            </DropdownMenuItem>
                          )}
                          {!user.is_admin ? (
                            <DropdownMenuItem onClick={() => handleSetAdmin(user.id, true)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleSetAdmin(user.id, false)}>
                              <Ban className="mr-2 h-4 w-4" />
                              Remove Admin
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
