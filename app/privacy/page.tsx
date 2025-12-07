import type { Metadata } from "next"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export const metadata: Metadata = {
  title: "Privacy Policy - Airanko Invoice",
  description: "Learn about how Airanko collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground">Last updated: January 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, such as when you create an account, create an invoice,
              or contact us for support. This may include your name, email address, company information, and billing
              details.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to provide, maintain, and improve our services, process transactions,
              send you technical notices and support messages, and respond to your inquiries.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and
              at rest.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your personal information for as long as necessary to provide our services and fulfill the
              purposes described in this policy, unless a longer retention period is required by law.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to access, correct, or delete your personal information. You can also request a copy of
              your data or ask us to restrict processing. Contact us at privacy@airanko.com to exercise these rights.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us at privacy@airanko.com.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
