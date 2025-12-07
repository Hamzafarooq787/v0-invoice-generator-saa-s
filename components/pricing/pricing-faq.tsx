import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Can I use the free plan forever?",
    answer:
      "Yes! The free plan is free forever with no time limits. You can create unlimited invoices, download them as PDFs, and use our AI suggestions. The only limitation is that invoices aren't saved to your account.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All payments are processed securely through Stripe.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel your Pro subscription at any time from your dashboard. You'll continue to have access to Pro features until the end of your billing period.",
  },
  {
    question: "Is there a free trial for Pro?",
    answer:
      "Yes! Pro comes with a 14-day free trial. No credit card required to start. You'll only be charged if you decide to continue after the trial.",
  },
  {
    question: "What happens to my data if I downgrade?",
    answer:
      "Your invoices and client data remain saved in your account. You just won't be able to create new saved invoices or access Pro features until you upgrade again.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a full refund within 30 days of purchase if you're not satisfied. Just contact our support team and we'll process it right away.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use industry-standard SSL encryption, and all data is stored securely on Supabase infrastructure with row-level security. We're also GDPR compliant.",
  },
]

export function PricingFaq() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Frequently asked questions</h2>
            <p className="mt-3 text-muted-foreground">Everything you need to know about our pricing</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
