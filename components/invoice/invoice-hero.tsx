import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"

export default function InvoiceHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Free Invoice Generator with AI Assistance
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Free Online Invoice Generator by Airanko
          </h1>

          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            Create professional invoices in minutes. No signup required. Choose from beautiful templates, add your logo,
            and download your invoice as PDF instantly.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <a href="#generator">
                Create Invoice Now
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/pricing">View Pro Features</a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required. Start creating invoices for free.
          </p>
        </div>
      </div>
    </section>
  )
}
