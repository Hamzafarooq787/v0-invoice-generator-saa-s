import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function InvoiceCta() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Ready to Get Paid Faster?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of businesses using Airanko Invoice to create professional invoices and manage their billing.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#generator" className="gap-2">
                Create Free Invoice
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pro Features</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
