import type { Metadata } from "next"
import { generateMetadata as generateSEO, invoicePageStructuredData, faqStructuredData } from "@/lib/seo"
import InvoiceGenerator from "@/components/invoice/invoice-generator"
import InvoiceHero from "@/components/invoice/invoice-hero"
import InvoiceFeatures from "@/components/invoice/invoice-features"
import InvoiceHowItWorks from "@/components/invoice/invoice-how-it-works"
import InvoiceComparison from "@/components/invoice/invoice-comparison"
import InvoiceFaq from "@/components/invoice/invoice-faq"
import InvoiceCta from "@/components/invoice/invoice-cta"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"

export const metadata: Metadata = generateSEO(
  "Free Online Invoice Generator",
  "Create professional invoices in minutes with Airanko's free online invoice generator. Download PDFs, customize templates, and upgrade for powerful tracking features.",
  "/invoice",
)

export default function InvoicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(invoicePageStructuredData) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />

        <main className="flex-1">
          <InvoiceHero />

          <section id="generator" className="border-t border-border bg-muted/30 py-12 md:py-16">
            <div className="mx-auto max-w-[1280px] px-6">
              <InvoiceGenerator />
            </div>
          </section>

          <InvoiceHowItWorks />
          <InvoiceFeatures />
          <InvoiceComparison />
          <InvoiceFaq />
          <InvoiceCta />
        </main>

        <SiteFooter />
      </div>
    </>
  )
}
