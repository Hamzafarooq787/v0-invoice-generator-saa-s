import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is Airanko Invoice Generator free to use?",
    answer:
      "Yes! The basic invoice generator is completely free. You can create invoices, customize templates, and download PDFs without signing up. Premium features like saving invoices, tracking payments, and analytics require a Pro subscription.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is needed to use the free invoice generator. However, if you want to save invoices, track payments, and access your invoice history, you'll need to create a free account and optionally upgrade to Pro.",
  },
  {
    question: "Can I customize invoice templates?",
    answer:
      "Yes! Airanko offers multiple professional invoice templates including Classic, Modern, and Minimal designs. All templates support your company logo, custom colors, and detailed line items.",
  },
  {
    question: "What payment methods do you support for Pro subscriptions?",
    answer:
      "We accept all major credit cards through our secure payment processor, Stripe. Your payment information is never stored on our servers.",
  },
  {
    question: "Can I email invoices directly to clients?",
    answer:
      "Email functionality is available with a Pro subscription. You can send professional invoices directly to your clients' email addresses with a single click.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption for all data transmission and storage. Your invoices and business information are protected with the same level of security used by major financial institutions.",
  },
]

export default function InvoiceFaq() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Everything you need to know about Airanko Invoice</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
