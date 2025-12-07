import type { Metadata } from "next"

export const defaultSEO = {
  title: "Airanko Invoice - Free Online Invoice Generator",
  description:
    "Create professional invoices in minutes with Airanko's free online invoice generator. Download PDFs, customize templates, and upgrade for powerful tracking features.",
  canonicalBase: "https://invoice.airanko.com",
  ogImage: "/og-image.png",
}

export function generateMetadata(title?: string, description?: string, path?: string, noIndex?: boolean): Metadata {
  const fullTitle = title ? `${title} | Airanko Invoice` : defaultSEO.title
  const fullDescription = description || defaultSEO.description
  const canonicalUrl = path ? `${defaultSEO.canonicalBase}${path}` : defaultSEO.canonicalBase

  return {
    title: fullTitle,
    description: fullDescription,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      siteName: "Airanko Invoice",
      type: "website",
      images: [
        {
          url: defaultSEO.ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [defaultSEO.ogImage],
    },
  }
}

export const invoicePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Airanko Invoice Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
  },
  description:
    "Free online invoice generator with professional templates, PDF download, and business tracking features.",
}

export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Airanko Invoice Generator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! The basic invoice generator is completely free. You can create invoices, customize templates, and download PDFs without signing up. Premium features like saving invoices, tracking payments, and analytics require a Pro subscription.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account is needed to use the free invoice generator. However, if you want to save invoices, track payments, and access your invoice history, you'll need to create a free account and optionally upgrade to Pro.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize invoice templates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Airanko offers multiple professional invoice templates including Classic, Modern, and Minimal designs. All templates support your company logo, custom colors, and detailed line items.",
      },
    },
  ],
}
