import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function PricingCta() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <h2 className="text-balance text-2xl font-bold md:text-3xl lg:text-4xl">Ready to streamline your invoicing?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Join thousands of freelancers and small businesses who trust Airanko for their invoicing needs. Start free,
          upgrade when you're ready.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-lg px-8">
            <Link href="/invoice">
              Create Free Invoice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-lg bg-transparent px-8">
            <Link href="/auth/signup?plan=pro">Start Pro Trial</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
