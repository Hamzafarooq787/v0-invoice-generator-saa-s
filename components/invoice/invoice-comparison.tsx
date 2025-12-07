import { Check, X, Minus } from "lucide-react"

const competitors = [
  { name: "Airanko", features: [true, true, true, true, true, true] },
  { name: "Adobe Invoice", features: [true, false, true, false, false, true] },
  { name: "Zoho Invoice", features: [true, true, false, true, false, false] },
  { name: "Wave", features: [true, true, true, false, false, false] },
]

const featureNames = [
  "Free to use",
  "No signup required",
  "AI assistance",
  "Beautiful templates",
  "Instant PDF download",
  "Mobile friendly",
]

export default function InvoiceComparison() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Benefits of Airanko Invoice vs Other Generators
          </h2>
          <p className="text-lg text-muted-foreground">See how we compare to other popular invoice tools</p>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Feature</th>
                  {competitors.map((competitor) => (
                    <th
                      key={competitor.name}
                      className={`px-6 py-4 text-center text-sm font-semibold ${
                        competitor.name === "Airanko" ? "bg-primary/10 text-primary" : "text-foreground"
                      }`}
                    >
                      {competitor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureNames.map((feature, featureIndex) => (
                  <tr key={feature} className="border-t border-border">
                    <td className="px-6 py-4 text-sm text-foreground">{feature}</td>
                    {competitors.map((competitor) => (
                      <td
                        key={`${competitor.name}-${feature}`}
                        className={`px-6 py-4 text-center ${competitor.name === "Airanko" ? "bg-primary/5" : ""}`}
                      >
                        {competitor.features[featureIndex] === true ? (
                          <Check className="mx-auto h-5 w-5 text-green-500" />
                        ) : competitor.features[featureIndex] === false ? (
                          <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
                        ) : (
                          <Minus className="mx-auto h-5 w-5 text-muted-foreground/50" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h3 className="mb-4 text-xl font-semibold text-foreground">Why Airanko is Better for Growing Businesses</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Unlike other invoice generators that require account creation just to get started, Airanko lets you create
              and download professional invoices immediately. No credit card, no email verification - just start
              invoicing.
            </p>
            <p>
              When you're ready to scale, our Pro plan gives you powerful features like payment tracking, client
              management, and analytics - all designed to help growing businesses stay organized and get paid faster.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
