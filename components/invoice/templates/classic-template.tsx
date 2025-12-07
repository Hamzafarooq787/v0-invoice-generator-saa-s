import { formatCurrency } from "@/lib/invoice"
import type { InvoiceFormData } from "@/lib/types"

interface ClassicTemplateProps {
  data: InvoiceFormData
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div className="font-sans text-sm text-gray-900">
      {/* Header */}
      <div className="mb-8 flex justify-between">
        <div>
          {data.companyLogo && (
            <img
              src={data.companyLogo || "/placeholder.svg"}
              alt="Company Logo"
              className="mb-4 h-16 w-auto object-contain"
              crossOrigin="anonymous"
            />
          )}
          <h1 className="text-2xl font-bold text-gray-900">{data.companyName || "Your Company"}</h1>
          {data.companyAddress && <p className="mt-1 whitespace-pre-line text-gray-600">{data.companyAddress}</p>}
          {data.companyEmail && <p className="text-gray-600">{data.companyEmail}</p>}
          {data.companyPhone && <p className="text-gray-600">{data.companyPhone}</p>}
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-gray-900">INVOICE</h2>
          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Invoice #:</span> {data.invoiceNumber}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Date:</span> {data.invoiceDate}
          </p>
          {data.dueDate && (
            <p className="text-gray-600">
              <span className="font-semibold">Due Date:</span> {data.dueDate}
            </p>
          )}
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Bill To</h3>
        <p className="font-semibold text-gray-900">{data.clientName || "Client Name"}</p>
        {data.clientCompany && <p className="text-gray-600">{data.clientCompany}</p>}
        {data.clientAddress && <p className="whitespace-pre-line text-gray-600">{data.clientAddress}</p>}
        {data.clientEmail && <p className="text-gray-600">{data.clientEmail}</p>}
      </div>

      {/* Items Table */}
      <table className="mb-8 w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="py-3 text-left font-semibold text-gray-900">Description</th>
            <th className="py-3 text-right font-semibold text-gray-900">Qty</th>
            <th className="py-3 text-right font-semibold text-gray-900">Rate</th>
            <th className="py-3 text-right font-semibold text-gray-900">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={item.id || index} className="border-b border-gray-100">
              <td className="py-3">
                <p className="font-medium text-gray-900">{item.name || "Item"}</p>
                {item.description && <p className="text-gray-500">{item.description}</p>}
              </td>
              <td className="py-3 text-right text-gray-600">{item.quantity}</td>
              <td className="py-3 text-right text-gray-600">{formatCurrency(item.unitPrice, data.currency)}</td>
              <td className="py-3 text-right font-medium text-gray-900">{formatCurrency(item.total, data.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">{formatCurrency(data.subtotal, data.currency)}</span>
          </div>
          {data.taxAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Tax ({data.taxRate}%)</span>
              <span className="font-medium text-gray-900">{formatCurrency(data.taxAmount, data.currency)}</span>
            </div>
          )}
          {data.discountAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Discount ({data.discountRate}%)</span>
              <span className="font-medium text-gray-900">-{formatCurrency(data.discountAmount, data.currency)}</span>
            </div>
          )}
          {data.shippingAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">{formatCurrency(data.shippingAmount, data.currency)}</span>
            </div>
          )}
          <div className="flex justify-between border-t-2 border-gray-900 pt-2">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(data.total, data.currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          {data.notes && (
            <div className="mb-4">
              <h4 className="mb-1 font-semibold text-gray-900">Notes</h4>
              <p className="whitespace-pre-line text-gray-600">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div>
              <h4 className="mb-1 font-semibold text-gray-900">Terms & Conditions</h4>
              <p className="whitespace-pre-line text-gray-600">{data.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
