import type { Profile } from "./types"

export type PlanFeature = {
  name: string
  free: boolean | string
  pro: boolean | string
}

export const planFeatures: PlanFeature[] = [
  { name: "Create invoices", free: true, pro: true },
  { name: "Download PDF", free: true, pro: true },
  { name: "Multiple templates", free: "3 templates", pro: "All templates" },
  { name: "Auto tax calculations", free: false, pro: true },
  { name: "Auto discount calculations", free: false, pro: true },
  { name: "Save invoices", free: false, pro: true },
  { name: "Invoice history", free: false, pro: true },
  { name: "Client management", free: false, pro: true },
  { name: "Email invoices", free: false, pro: true },
  { name: "Payment tracking", free: false, pro: true },
  { name: "Dashboard analytics", free: false, pro: true },
  { name: "Export to CSV/Excel", free: false, pro: true },
  { name: "AI assistance", free: "Limited", pro: "Unlimited" },
]

export const pricingPlans = {
  free: {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for occasional invoicing",
    cta: "Get Started",
    highlighted: false,
  },
  pro: {
    name: "Pro",
    price: 10,
    period: "month",
    description: "For growing businesses",
    cta: "Start Free Trial",
    highlighted: true,
  },
}

export function canAccessFeature(profile: Profile | null, feature: string): boolean {
  if (!profile) return false

  const isPro = profile.plan === "pro"

  switch (feature) {
    case "save_invoices":
    case "auto_calculations":
    case "email_invoices":
    case "payment_tracking":
    case "dashboard":
    case "export":
    case "client_management":
      return isPro
    case "create_invoice":
    case "download_pdf":
      return true
    default:
      return isPro
  }
}
