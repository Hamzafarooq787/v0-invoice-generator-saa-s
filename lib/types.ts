export interface Profile {
  id: string
  full_name: string | null
  company_name: string | null
  company_address: string | null
  company_email: string | null
  company_phone: string | null
  company_logo_url: string | null
  plan: "free" | "pro"
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  user_id: string
  name: string
  company_name: string | null
  address: string | null
  email: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  user_id: string
  client_id: string | null
  invoice_number: string
  invoice_date: string
  due_date: string | null
  currency: string
  subtotal: number
  tax_amount: number
  discount_amount: number
  shipping_amount: number
  total_amount: number
  amount_paid: number
  balance_due: number
  status: "unpaid" | "partially_paid" | "paid" | "overdue"
  notes: string | null
  terms: string | null
  template: string
  company_name: string | null
  company_address: string | null
  company_email: string | null
  company_phone: string | null
  company_logo_url: string | null
  client_name: string | null
  client_company: string | null
  client_address: string | null
  client_email: string | null
  created_at: string
  updated_at: string
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  name: string
  description: string | null
  quantity: number
  unit_price: number
  tax_rate: number
  total: number
  created_at: string
}

export interface Payment {
  id: string
  invoice_id: string
  amount: number
  payment_date: string
  payment_method: string | null
  notes: string | null
  created_at: string
}

// Form types for the invoice generator
export interface InvoiceFormData {
  // Company info
  companyName: string
  companyAddress: string
  companyEmail: string
  companyPhone: string
  companyLogo: string
  // Client info
  clientName: string
  clientCompany: string
  clientAddress: string
  clientEmail: string
  // Invoice details
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  currency: string
  // Line items
  items: LineItem[]
  // Summary
  subtotal: number
  taxRate: number
  taxAmount: number
  discountRate: number
  discountAmount: number
  shippingAmount: number
  total: number
  // Additional
  notes: string
  terms: string
  template: "classic" | "modern" | "minimal"
}

export interface LineItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
  taxRate: number
  total: number
}
