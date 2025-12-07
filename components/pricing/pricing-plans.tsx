import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for occasional invoicing needs",
    features: [
      "Unlimited invoice creation",
      "3 professional templates",
      "PDF download",
      "AI-powered suggestions",
      "Basic tax calculations",
      "Email support",
    ],
    limitations: ["No saved invoices", "No client management", "No payment tracking"],
    cta: "Get Started Free",
    href: "/invoice",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For freelancers and small businesses",
    features: [
      "Everything in Free, plus:",
      "Unlimited saved invoices",
      "Client database & management",
      "Payment tracking & reminders",
      "Invoice analytics & reports",
      "Custom branding & logo",
      "Recurring invoices",
      "Multi-currency support",
      "CSV/Excel export",
      "Priority support",
    ],
    limitations: [],
    cta: "Start 14-Day Free Trial",
    href: "/auth/signup?plan=pro",
    popular: true,
  },
]

export function PricingPlans() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular ? "border-primary shadow-lg scale-105" : "border-border"
              }`}
            >
              {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <li key={limitation} className="flex items-start gap-3 text-muted-foreground">
                      <span className="h-5 w-5 shrink-0 mt-0.5 text-center">—</span>
                      <span className="text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>All plans include SSL encryption and GDPR compliance.</p>
          <p className="mt-1">
            Need a custom plan for your team?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
