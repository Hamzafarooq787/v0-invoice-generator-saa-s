"use client"

import { useState, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InvoiceForm from "./invoice-form"
import InvoicePreview from "./invoice-preview"
import TemplateSelector from "./template-selector"
import AiAssistant from "./ai-assistant"
import {
  getDefaultInvoiceData,
  calculateSubtotal,
  calculateTaxAmount,
  calculateDiscountAmount,
  calculateTotal,
} from "@/lib/invoice"
import type { InvoiceFormData, LineItem } from "@/lib/types"

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState<InvoiceFormData>(getDefaultInvoiceData())
  const [activeTab, setActiveTab] = useState("form")

  const updateInvoiceData = useCallback((updates: Partial<InvoiceFormData>) => {
    setInvoiceData((prev) => {
      const newData = { ...prev, ...updates }

      // Recalculate totals if items changed
      if (
        updates.items ||
        updates.taxRate !== undefined ||
        updates.discountRate !== undefined ||
        updates.shippingAmount !== undefined
      ) {
        const subtotal = calculateSubtotal(newData.items)
        const taxAmount = calculateTaxAmount(subtotal, newData.taxRate)
        const discountAmount = calculateDiscountAmount(subtotal, newData.discountRate)
        const total = calculateTotal(subtotal, taxAmount, discountAmount, newData.shippingAmount)

        return {
          ...newData,
          subtotal,
          taxAmount,
          discountAmount,
          total,
        }
      }

      return newData
    })
  }, [])

  const updateLineItem = useCallback((index: number, updates: Partial<LineItem>) => {
    setInvoiceData((prev) => {
      const newItems = [...prev.items]
      newItems[index] = { ...newItems[index], ...updates }

      // Calculate item total
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice

      const subtotal = calculateSubtotal(newItems)
      const taxAmount = calculateTaxAmount(subtotal, prev.taxRate)
      const discountAmount = calculateDiscountAmount(subtotal, prev.discountRate)
      const total = calculateTotal(subtotal, taxAmount, discountAmount, prev.shippingAmount)

      return {
        ...prev,
        items: newItems,
        subtotal,
        taxAmount,
        discountAmount,
        total,
      }
    })
  }, [])

  const addLineItem = useCallback(() => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
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
    }))
  }, [])

  const removeLineItem = useCallback((index: number) => {
    setInvoiceData((prev) => {
      if (prev.items.length <= 1) return prev

      const newItems = prev.items.filter((_, i) => i !== index)
      const subtotal = calculateSubtotal(newItems)
      const taxAmount = calculateTaxAmount(subtotal, prev.taxRate)
      const discountAmount = calculateDiscountAmount(subtotal, prev.discountRate)
      const total = calculateTotal(subtotal, taxAmount, discountAmount, prev.shippingAmount)

      return {
        ...prev,
        items: newItems,
        subtotal,
        taxAmount,
        discountAmount,
        total,
      }
    })
  }, [])

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">Create Your Invoice</h2>
        <p className="text-muted-foreground">
          Fill in your details, choose a template, and download your professional invoice
        </p>
      </div>

      {/* Template Selector */}
      <TemplateSelector
        selectedTemplate={invoiceData.template}
        onSelect={(template) => updateInvoiceData({ template })}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-lg">
              <TabsTrigger value="form" className="rounded-lg">
                Invoice Details
              </TabsTrigger>
              <TabsTrigger value="ai" className="rounded-lg">
                AI Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="mt-6">
              <InvoiceForm
                data={invoiceData}
                onUpdate={updateInvoiceData}
                onUpdateItem={updateLineItem}
                onAddItem={addLineItem}
                onRemoveItem={removeLineItem}
              />
            </TabsContent>

            <TabsContent value="ai" className="mt-6">
              <AiAssistant invoiceData={invoiceData} onApplySuggestion={updateInvoiceData} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <InvoicePreview data={invoiceData} />
        </div>
      </div>
    </div>
  )
}
