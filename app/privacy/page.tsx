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
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 text-3xl font-bold md:text-4xl">Privacy Policy</h1>
            <div className="space-y-8">
              <p className="text-sm text-muted-foreground">Last updated: January 2025</p>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">1. Information We Collect</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We collect information you provide directly to us, such as when you create an account, create an
                  invoice, or contact us for support. This may include your name, email address, company information,
                  and billing details.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">2. How We Use Your Information</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We use the information we collect to provide, maintain, and improve our services, process
                  transactions, send you technical notices and support messages, and respond to your inquiries.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">3. Data Security</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit
                  and at rest.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">4. Data Retention</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We retain your personal information for as long as necessary to provide our services and fulfill the
                  purposes described in this policy, unless a longer retention period is required by law.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">5. Your Rights</h2>
                <p className="leading-relaxed text-muted-foreground">
                  You have the right to access, correct, or delete your personal information. You can also request a
                  copy of your data or ask us to restrict processing. Contact us at privacy@airanko.com to exercise
                  these rights.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">6. Contact Us</h2>
                <p className="leading-relaxed text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at privacy@airanko.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
