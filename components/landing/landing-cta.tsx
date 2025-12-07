import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LandingCta() {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <h2 className="text-balance text-2xl font-bold md:text-3xl lg:text-4xl">Ready to simplify your invoicing?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
          Create your first invoice in under 2 minutes. No signup required, no credit card needed.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" variant="secondary" className="rounded-lg px-8 text-base">
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
