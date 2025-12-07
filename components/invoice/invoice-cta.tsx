import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function InvoiceCta() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">Ready to Get Paid Faster?</h2>
          <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">
            Join thousands of businesses using Airanko Invoice to create professional invoices and manage their billing.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-lg px-8" asChild>
              <a href="#generator" className="gap-2">
                Create Free Invoice
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-lg bg-transparent px-8" asChild>
              <Link href="/pricing">View Pro Features</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
