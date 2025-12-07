import { FileText, Users, CreditCard, BarChart3, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from beautifully designed invoice templates that make your business look professional.",
  },
  {
    icon: Zap,
    title: "AI-Powered Suggestions",
    description: "Get smart suggestions for item descriptions, payment terms, and thank you notes powered by AI.",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Save client details and auto-fill them on future invoices. Never re-enter the same info twice.",
  },
  {
    icon: CreditCard,
    title: "Payment Tracking",
    description: "Track payment status, send reminders, and know exactly who owes you money at a glance.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Understand your business with insights on invoicing trends, payment times, and revenue.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and stored securely. We never share your information with third parties.",
  },
]

export function LandingFeatures() {
  return (
    <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-balance text-2xl font-bold md:text-3xl lg:text-4xl">
            Everything you need to get paid faster
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            From creating your first invoice to managing a growing client base, we've got you covered.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
