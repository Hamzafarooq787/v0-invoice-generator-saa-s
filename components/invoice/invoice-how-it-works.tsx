import { FileText, Palette, Download, Rocket } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Enter Your Details",
    description: "Fill in your business information, client details, and add line items for products or services.",
  },
  {
    icon: Palette,
    title: "Choose a Template",
    description: "Select from our professionally designed templates - Classic, Modern, or Minimal.",
  },
  {
    icon: Download,
    title: "Download Your Invoice",
    description: "Preview your invoice in real-time and download it as a professional PDF document.",
  },
  {
    icon: Rocket,
    title: "Upgrade for More",
    description: "Sign up to save invoices, track payments, manage clients, and access advanced features.",
  },
]

export default function InvoiceHowItWorks() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            How Our Invoice Software Works
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Create professional invoices in four simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="absolute -top-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
