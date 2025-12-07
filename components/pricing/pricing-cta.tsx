import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function PricingCta() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to streamline your invoicing?</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of freelancers and small businesses who trust Airanko for their invoicing needs. Start free,
          upgrade when you're ready.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/invoice">
              Create Free Invoice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/signup?plan=pro">Start Pro Trial</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
