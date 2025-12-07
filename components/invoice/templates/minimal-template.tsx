import { formatCurrency } from "@/lib/invoice"
import type { InvoiceFormData } from "@/lib/types"

interface MinimalTemplateProps {
  data: InvoiceFormData
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="font-sans text-sm text-gray-800">
      {/* Header */}
      <div className="mb-12 text-center">
        {data.companyLogo && (
          <img
            src={data.companyLogo || "/placeholder.svg"}
            alt="Company Logo"
            className="mx-auto mb-4 h-12 w-auto object-contain"
            crossOrigin="anonymous"
          />
        )}
        <h1 className="text-3xl font-light tracking-tight text-gray-900">Invoice</h1>
        <p className="mt-1 text-gray-400">{data.invoiceNumber}</p>
      </div>

      {/* Info Row */}
      <div className="mb-12 flex justify-between text-sm">
        <div>
          <p className="mb-2 font-medium text-gray-900">{data.companyName || "Your Company"}</p>
          {data.companyAddress && <p className="whitespace-pre-line text-gray-500">{data.companyAddress}</p>}
          {data.companyEmail && <p className="text-gray-500">{data.companyEmail}</p>}
          {data.companyPhone && <p className="text-gray-500">{data.companyPhone}</p>}
        </div>
        <div className="text-right">
          <p className="mb-2 font-medium text-gray-900">{data.clientName || "Client"}</p>
          {data.clientCompany && <p className="text-gray-500">{data.clientCompany}</p>}
          {data.clientAddress && <p className="whitespace-pre-line text-gray-500">{data.clientAddress}</p>}
          {data.clientEmail && <p className="text-gray-500">{data.clientEmail}</p>}
        </div>
      </div>

      {/* Dates */}
      <div className="mb-8 flex justify-center gap-12 text-sm">
        <div className="text-center">
          <p className="text-gray-400">Date</p>
          <p className="font-medium text-gray-900">{data.invoiceDate}</p>
        </div>
        {data.dueDate && (
          <div className="text-center">
            <p className="text-gray-400">Due</p>
            <p className="font-medium text-gray-900">{data.dueDate}</p>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="mb-8 border-t border-gray-100">
        {data.items.map((item, index) => (
          <div key={item.id || index} className="flex items-center justify-between border-b border-gray-100 py-4">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name || "Item"}</p>
              {item.description && <p className="text-gray-500">{item.description}</p>}
            </div>
            <div className="flex items-center gap-8 text-right">
              <span className="text-gray-500">
                {item.quantity} × {formatCurrency(item.unitPrice, data.currency)}
              </span>
              <span className="w-24 font-medium text-gray-900">{formatCurrency(item.total, data.currency)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mb-12 flex justify-end">
        <div className="w-64 space-y-2 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>{formatCurrency(data.subtotal, data.currency)}</span>
          </div>
          {data.taxAmount > 0 && (
            <div className="flex justify-between text-gray-500">
              <span>Tax</span>
              <span>{formatCurrency(data.taxAmount, data.currency)}</span>
            </div>
          )}
          {data.discountAmount > 0 && (
            <div className="flex justify-between text-gray-500">
              <span>Discount</span>
              <span>-{formatCurrency(data.discountAmount, data.currency)}</span>
            </div>
          )}
          {data.shippingAmount > 0 && (
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>{formatCurrency(data.shippingAmount, data.currency)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-200 pt-2">
            <span className="text-lg font-medium text-gray-900">Total</span>
            <span className="text-lg font-medium text-gray-900">{formatCurrency(data.total, data.currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
          {data.notes && <p className="mb-2">{data.notes}</p>}
          {data.terms && <p>{data.terms}</p>}
        </div>
      )}
    </div>
  )
}
