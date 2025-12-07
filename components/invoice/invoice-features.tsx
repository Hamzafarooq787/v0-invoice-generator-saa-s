import { Check, Zap, Shield, Globe, Smartphone, Clock } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Create professional invoices in under 2 minutes with our intuitive interface.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared. We prioritize your privacy.",
  },
  {
    icon: Globe,
    title: "20+ Currencies",
    description: "Support for major world currencies including USD, EUR, GBP, and more.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Create invoices on any device - desktop, tablet, or mobile phone.",
  },
  {
    icon: Clock,
    title: "No Registration Required",
    description: "Start creating invoices immediately without signing up or logging in.",
  },
  {
    icon: Check,
    title: "Professional Templates",
    description: "Choose from beautifully designed templates that make your business look great.",
  },
]

export default function InvoiceFeatures() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Why Choose Airanko Invoice Generator</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create professional invoices, completely free
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-xl bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
