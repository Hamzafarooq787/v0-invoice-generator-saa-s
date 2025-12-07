import { formatCurrency } from "@/lib/invoice"
import type { InvoiceFormData } from "@/lib/types"

interface ModernTemplateProps {
  data: InvoiceFormData
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="font-sans text-sm text-gray-900">
      {/* Header with accent */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center gap-4">
          {data.companyLogo ? (
            <img
              src={data.companyLogo || "/placeholder.svg"}
              alt="Company Logo"
              className="h-14 w-14 rounded-xl object-contain"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
              <span className="text-xl font-bold text-white">{(data.companyName || "C")[0]}</span>
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{data.companyName || "Your Company"}</h1>
            {data.companyEmail && <p className="text-gray-500">{data.companyEmail}</p>}
          </div>
        </div>
        <div className="rounded-xl bg-blue-600 px-6 py-3 text-white">
          <p className="text-sm opacity-80">Invoice</p>
          <p className="text-lg font-bold">{data.invoiceNumber}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="mb-8 grid grid-cols-3 gap-6 rounded-xl bg-gray-50 p-6">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">From</p>
          <p className="font-medium text-gray-900">{data.companyName || "Your Company"}</p>
          {data.companyAddress && <p className="whitespace-pre-line text-sm text-gray-500">{data.companyAddress}</p>}
          {data.companyPhone && <p className="text-sm text-gray-500">{data.companyPhone}</p>}
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Bill To</p>
          <p className="font-medium text-gray-900">{data.clientName || "Client Name"}</p>
          {data.clientCompany && <p className="text-sm text-gray-500">{data.clientCompany}</p>}
          {data.clientAddress && <p className="whitespace-pre-line text-sm text-gray-500">{data.clientAddress}</p>}
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Details</p>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Date:</span> {data.invoiceDate}
          </p>
          {data.dueDate && (
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Due:</span> {data.dueDate}
            </p>
          )}
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Currency:</span> {data.currency}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8 overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Item</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Qty</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Rate</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={item.id || index} className={index % 2 === 0 ? "bg-white" : "bg-blue-50/30"}>
                <td className="px-4 py-4">
                  <p className="font-medium text-gray-900">{item.name || "Item"}</p>
                  {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                </td>
                <td className="px-4 py-4 text-center text-gray-600">{item.quantity}</td>
                <td className="px-4 py-4 text-right text-gray-600">{formatCurrency(item.unitPrice, data.currency)}</td>
                <td className="px-4 py-4 text-right font-medium text-gray-900">
                  {formatCurrency(item.total, data.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-72 overflow-hidden rounded-xl border border-gray-200">
          <div className="space-y-0">
            <div className="flex justify-between bg-white px-4 py-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-900">{formatCurrency(data.subtotal, data.currency)}</span>
            </div>
            {data.taxAmount > 0 && (
              <div className="flex justify-between bg-gray-50 px-4 py-2">
                <span className="text-gray-500">Tax ({data.taxRate}%)</span>
                <span className="font-medium text-gray-900">{formatCurrency(data.taxAmount, data.currency)}</span>
              </div>
            )}
            {data.discountAmount > 0 && (
              <div className="flex justify-between bg-white px-4 py-2">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-gray-900">-{formatCurrency(data.discountAmount, data.currency)}</span>
              </div>
            )}
            {data.shippingAmount > 0 && (
              <div className="flex justify-between bg-gray-50 px-4 py-2">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-gray-900">{formatCurrency(data.shippingAmount, data.currency)}</span>
              </div>
            )}
            <div className="flex justify-between bg-blue-600 px-4 py-3">
              <span className="font-semibold text-white">Total Due</span>
              <span className="text-lg font-bold text-white">{formatCurrency(data.total, data.currency)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {data.notes && (
            <div className="rounded-xl bg-gray-50 p-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Notes</h4>
              <p className="whitespace-pre-line text-sm text-gray-600">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div className="rounded-xl bg-gray-50 p-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Terms</h4>
              <p className="whitespace-pre-line text-sm text-gray-600">{data.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
