import { createClient } from "@/lib/supabase/server"
import type { Profile } from "./types"

export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return profile
}

export async function isAdmin(): Promise<boolean> {
  const profile = await getCurrentProfile()
  return profile?.is_admin === true
}

export async function isPro(): Promise<boolean> {
  const profile = await getCurrentProfile()
  return profile?.plan === "pro"
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
