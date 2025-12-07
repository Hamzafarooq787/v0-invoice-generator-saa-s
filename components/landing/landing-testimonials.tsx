import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Airanko has saved me hours every week. I used to dread creating invoices, now it takes me 2 minutes.",
    author: "Sarah Chen",
    role: "Freelance Designer",
    rating: 5,
  },
  {
    quote: "The payment tracking feature alone is worth the Pro upgrade. I always know exactly where my money is.",
    author: "Marcus Johnson",
    role: "Web Developer",
    rating: 5,
  },
  {
    quote: "Clean, simple, and just works. Finally an invoicing tool that doesn't try to do too much.",
    author: "Emily Rodriguez",
    role: "Marketing Consultant",
    rating: 5,
  },
]

export function LandingTestimonials() {
  return (
    <section className="py-20 md:py-32">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Loved by freelancers worldwide</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of professionals who trust Airanko for their invoicing
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-xl border border-border bg-card p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4">"{testimonial.quote}"</p>
              <div>
                <div className="font-medium">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
