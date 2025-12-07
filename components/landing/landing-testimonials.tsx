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
    <section className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">Loved by freelancers worldwide</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Join thousands of professionals who trust Airanko for their invoicing
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-5 text-foreground leading-relaxed">"{testimonial.quote}"</p>
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
