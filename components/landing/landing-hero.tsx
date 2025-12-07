import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Sparkles, Download } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-powered invoice suggestions
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance max-w-4xl">
            Create professional invoices in <span className="text-primary">minutes</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty">
            The fastest way to create, send, and track invoices. Free forever for basic invoicing, with powerful Pro
            features for growing businesses.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/invoice">
                Create Free Invoice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 bg-transparent">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
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
            <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                  <div>
                    <div className="h-3 w-32 bg-muted rounded" />
                    <div className="h-2 w-24 bg-muted/60 rounded mt-2" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">INVOICE</div>
                    <div className="text-sm text-muted-foreground">#INV-001</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="h-2 w-16 bg-muted/60 rounded mb-2" />
                    <div className="h-3 w-40 bg-muted rounded" />
                    <div className="h-2 w-32 bg-muted/60 rounded mt-1" />
                  </div>
                  <div>
                    <div className="h-2 w-16 bg-muted/60 rounded mb-2" />
                    <div className="h-3 w-36 bg-muted rounded" />
                    <div className="h-2 w-28 bg-muted/60 rounded mt-1" />
                  </div>
                </div>
                <div className="mt-8 border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2 grid grid-cols-4 text-xs font-medium text-muted-foreground">
                    <span>Description</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Rate</span>
                    <span className="text-right">Amount</span>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-4 text-sm border-b border-border">
                    <span>Web Design Services</span>
                    <span className="text-center">1</span>
                    <span className="text-right">$2,500</span>
                    <span className="text-right font-medium">$2,500</span>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-4 text-sm">
                    <span>Development Hours</span>
                    <span className="text-center">40</span>
                    <span className="text-right">$75</span>
                    <span className="text-right font-medium">$3,000</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
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
