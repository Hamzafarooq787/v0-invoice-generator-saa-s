import type { Metadata } from "next"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingFeatures } from "@/components/landing/landing-features"
import { LandingTestimonials } from "@/components/landing/landing-testimonials"
import { LandingCta } from "@/components/landing/landing-cta"

export const metadata: Metadata = {
  title: "Airanko Invoice - Free Online Invoice Generator for Freelancers & Small Businesses",
  description:
    "Create professional invoices in minutes with Airanko's free online invoice generator. Download PDFs instantly, customize templates, track payments, and get paid faster.",
  openGraph: {
    title: "Airanko Invoice - Free Online Invoice Generator",
    description: "Create professional invoices in minutes. Download PDFs, customize templates, track payments.",
    type: "website",
    url: "https://airanko.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airanko Invoice - Free Online Invoice Generator",
    description: "Create professional invoices in minutes. Download PDFs, customize templates, track payments.",
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingCta />
      </main>
      <SiteFooter />
    </div>
  )
}
