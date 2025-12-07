import type { Metadata } from "next"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ContactForm } from "@/components/contact/contact-form"
import { Mail, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Airanko Invoice",
  description: "Get in touch with the Airanko team. We're here to help with any questions about our invoice generator.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="text-3xl font-bold md:text-4xl">Get in touch</h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Support</h3>
                      <p className="text-sm text-muted-foreground">support@airanko.com</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    For general inquiries and support. We typically respond within 24 hours.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Pro Support</h3>
                      <p className="text-sm text-muted-foreground">Priority response</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Pro subscribers get priority support with faster response times.
                  </p>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
