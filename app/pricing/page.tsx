import type { Metadata } from "next"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PricingHero } from "@/components/pricing/pricing-hero"
import { PricingPlans } from "@/components/pricing/pricing-plans"
import { PricingFaq } from "@/components/pricing/pricing-faq"
import { PricingCta } from "@/components/pricing/pricing-cta"

export const metadata: Metadata = {
  title: "Pricing - Simple, Transparent Pricing | Airanko Invoice",
  description:
    "Choose the plan that's right for you. Start free, upgrade when you're ready. No hidden fees, cancel anytime.",
  openGraph: {
    title: "Pricing - Airanko Invoice Generator",
    description: "Simple, transparent pricing for professional invoicing. Free tier available.",
  },
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <PricingHero />
        <PricingPlans />
        <PricingFaq />
        <PricingCta />
      </main>
      <SiteFooter />
    </div>
  )
}
