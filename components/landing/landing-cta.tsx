import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LandingCta() {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to simplify your invoicing?</h2>
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Create your first invoice in under 2 minutes. No signup required, no credit card needed.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" variant="secondary" className="text-base px-8">
            <Link href="/invoice">
              Start Creating Invoices
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
