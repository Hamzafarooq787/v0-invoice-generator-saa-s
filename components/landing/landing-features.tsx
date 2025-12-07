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
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Everything you need to get paid faster</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From creating your first invoice to managing a growing client base, we've got you covered.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
