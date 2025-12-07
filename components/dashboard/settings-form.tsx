"use client"

import type React from "react"

import { useState } from "react"
import type { Profile } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

interface SettingsFormProps {
  profile: Profile
}

export default function SettingsForm({ profile: initialProfile }: SettingsFormProps) {
  const [profile, setProfile] = useState(initialProfile)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        company_name: profile.company_name,
        company_address: profile.company_address,
        company_email: profile.company_email,
        company_phone: profile.company_phone,
        company_logo_url: profile.company_logo_url,
      })
      .eq("id", profile.id)

    if (error) {
      toast.error("Failed to save settings")
    } else {
      toast.success("Settings saved successfully")
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profile.full_name || ""}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>This information will appear on your invoices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={profile.company_name || ""}
                onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Company Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={profile.company_email || ""}
                onChange={(e) => setProfile({ ...profile, company_email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyPhone">Company Phone</Label>
              <Input
                id="companyPhone"
                value={profile.company_phone || ""}
                onChange={(e) => setProfile({ ...profile, company_phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyLogo">Logo URL</Label>
              <Input
                id="companyLogo"
                placeholder="https://..."
                value={profile.company_logo_url || ""}
                onChange={(e) => setProfile({ ...profile, company_logo_url: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <Textarea
              id="companyAddress"
              rows={3}
              value={profile.company_address || ""}
              onChange={(e) => setProfile({ ...profile, company_address: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Your current plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <div>
              <p className="font-medium capitalize text-foreground">{profile.plan} Plan</p>
              <p className="text-sm text-muted-foreground">
                {profile.plan === "pro" ? "Full access to all features" : "Limited features"}
              </p>
            </div>
            {profile.plan !== "pro" && (
              <Button asChild>
                <a href="/pricing">Upgrade to Pro</a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
