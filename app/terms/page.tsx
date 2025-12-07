import type { Metadata } from "next"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export const metadata: Metadata = {
  title: "Terms of Service - Airanko Invoice",
  description: "Read the terms and conditions for using Airanko Invoice services.",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 text-3xl font-bold md:text-4xl">Terms of Service</h1>
            <div className="space-y-8">
              <p className="text-sm text-muted-foreground">Last updated: January 2025</p>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">1. Acceptance of Terms</h2>
                <p className="leading-relaxed text-muted-foreground">
                  By accessing or using Airanko Invoice, you agree to be bound by these Terms of Service. If you do not
                  agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">2. Description of Service</h2>
                <p className="leading-relaxed text-muted-foreground">
                  Airanko provides online invoice generation tools. We offer both free and paid subscription plans with
                  varying features and capabilities.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">3. User Accounts</h2>
                <p className="leading-relaxed text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account credentials and for all
                  activities that occur under your account. You must notify us immediately of any unauthorized use.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">4. Subscription and Payments</h2>
                <p className="leading-relaxed text-muted-foreground">
                  Pro subscriptions are billed monthly or annually. You can cancel your subscription at any time, and
                  you will continue to have access until the end of your billing period. Refunds are available within 30
                  days of purchase.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">5. Acceptable Use</h2>
                <p className="leading-relaxed text-muted-foreground">
                  You agree not to use our services for any illegal purposes, to infringe on intellectual property
                  rights, or to transmit harmful content. We reserve the right to terminate accounts that violate these
                  terms.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">6. Limitation of Liability</h2>
                <p className="leading-relaxed text-muted-foreground">
                  Airanko shall not be liable for any indirect, incidental, special, or consequential damages arising
                  from your use of our services. Our total liability shall not exceed the amount you paid us in the past
                  12 months.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">7. Changes to Terms</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We may update these terms from time to time. We will notify you of significant changes by email or
                  through our services. Your continued use constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">8. Contact</h2>
                <p className="leading-relaxed text-muted-foreground">
                  For questions about these Terms of Service, please contact us at legal@airanko.com.
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
