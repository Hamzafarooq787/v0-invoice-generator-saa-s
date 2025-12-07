import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Sparkles, Download } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-powered invoice suggestions
          </div>

          <h1 className="max-w-4xl text-balance text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Create professional invoices in <span className="text-primary">minutes</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            The fastest way to create, send, and track invoices. Free forever for basic invoicing, with powerful Pro
            features for growing businesses.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-lg px-8 text-base">
              <Link href="/invoice">
                Create Free Invoice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-lg bg-transparent px-8 text-base">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              No signup required
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Instant PDF download
            </div>
          </div>

          {/* Hero visual */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
              <div className="p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <div className="h-3 w-32 rounded bg-muted" />
                    <div className="mt-2 h-2 w-24 rounded bg-muted/60" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">INVOICE</div>
                    <div className="text-sm text-muted-foreground">#INV-001</div>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-2 h-2 w-16 rounded bg-muted/60" />
                    <div className="h-3 w-40 rounded bg-muted" />
                    <div className="mt-1 h-2 w-32 rounded bg-muted/60" />
                  </div>
                  <div>
                    <div className="mb-2 h-2 w-16 rounded bg-muted/60" />
                    <div className="h-3 w-36 rounded bg-muted" />
                    <div className="mt-1 h-2 w-28 rounded bg-muted/60" />
                  </div>
                </div>
                <div className="mt-8 overflow-hidden rounded-lg border border-border">
                  <div className="grid grid-cols-4 bg-muted/50 px-4 py-3 text-xs font-medium text-muted-foreground">
                    <span>Description</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Rate</span>
                    <span className="text-right">Amount</span>
                  </div>
                  <div className="grid grid-cols-4 border-b border-border px-4 py-3 text-sm">
                    <span>Web Design Services</span>
                    <span className="text-center">1</span>
                    <span className="text-right">$2,500</span>
                    <span className="text-right font-medium">$2,500</span>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-3 text-sm">
                    <span>Development Hours</span>
                    <span className="text-center">40</span>
                    <span className="text-right">$75</span>
                    <span className="text-right font-medium">$3,000</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total Due</div>
                    <div className="text-3xl font-bold text-primary">$5,500.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
