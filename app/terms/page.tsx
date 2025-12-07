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
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground">Last updated: January 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using Airanko Invoice, you agree to be bound by these Terms of Service. If you do not
              agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              Airanko provides online invoice generation tools. We offer both free and paid subscription plans with
              varying features and capabilities.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities
              that occur under your account. You must notify us immediately of any unauthorized use.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Subscription and Payments</h2>
            <p className="text-muted-foreground mb-4">
              Pro subscriptions are billed monthly or annually. You can cancel your subscription at any time, and you
              will continue to have access until the end of your billing period. Refunds are available within 30 days of
              purchase.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use our services for any illegal purposes, to infringe on intellectual property rights,
              or to transmit harmful content. We reserve the right to terminate accounts that violate these terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              Airanko shall not be liable for any indirect, incidental, special, or consequential damages arising from
              your use of our services. Our total liability shall not exceed the amount you paid us in the past 12
              months.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We may update these terms from time to time. We will notify you of significant changes by email or through
              our services. Your continued use constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, please contact us at legal@airanko.com.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
