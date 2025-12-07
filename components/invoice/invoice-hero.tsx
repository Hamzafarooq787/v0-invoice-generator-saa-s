import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"

export default function InvoiceHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Free Invoice Generator with AI Assistance
          </div>

          <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Free Online Invoice Generator by Airanko
          </h1>

          <p className="mb-10 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Create professional invoices in minutes. No signup required. Choose from beautiful templates, add your logo,
            and download your invoice as PDF instantly.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 rounded-lg px-8" asChild>
              <a href="#generator">
                Create Invoice Now
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-lg bg-transparent px-8" asChild>
              <a href="/pricing">View Pro Features</a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required. Start creating invoices for free.
          </p>
        </div>
      </div>
    </section>
  )
}
