import type { LineItem, InvoiceFormData } from "./types"

export function generateInvoiceNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `INV-${year}${month}-${random}`
}

export function calculateItemTotal(item: LineItem, includeTax = false): number {
  const baseTotal = item.quantity * item.unitPrice
  if (includeTax && item.taxRate > 0) {
    return baseTotal * (1 + item.taxRate / 100)
  }
  return baseTotal
}

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
}

export function calculateTaxAmount(subtotal: number, taxRate: number): number {
  return subtotal * (taxRate / 100)
}

export function calculateDiscountAmount(subtotal: number, discountRate: number): number {
  return subtotal * (discountRate / 100)
}

export function calculateTotal(
  subtotal: number,
  taxAmount: number,
  discountAmount: number,
  shippingAmount: number,
): number {
  return subtotal + taxAmount - discountAmount + shippingAmount
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
]

export function getDefaultInvoiceData(): InvoiceFormData {
  return {
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
    companyLogo: "",
    clientName: "",
    clientCompany: "",
    clientAddress: "",
    clientEmail: "",
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    currency: "USD",
    items: [
      {
        id: crypto.randomUUID(),
        name: "",
        description: "",
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
        total: 0,
      },
    ],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    discountRate: 0,
    discountAmount: 0,
    shippingAmount: 0,
    total: 0,
    notes: "",
    terms: "Payment is due within 30 days of invoice date.",
    template: "classic",
  }
}
