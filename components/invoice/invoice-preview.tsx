"use client"

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, Lock } from "lucide-react"
import { formatCurrency } from "@/lib/invoice"
import type { InvoiceFormData } from "@/lib/types"
import ClassicTemplate from "./templates/classic-template"
import ModernTemplate from "./templates/modern-template"
import MinimalTemplate from "./templates/minimal-template"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InvoicePreviewProps {
  data: InvoiceFormData
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return

    // Dynamic import to reduce initial bundle size
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).default

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

    // If content is longer than one page
    if (imgHeight > pageHeight) {
      let heightLeft = imgHeight - pageHeight
      let position = -pageHeight

      while (heightLeft > 0) {
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
        position -= pageHeight
      }
    }

    pdf.save(`invoice-${data.invoiceNumber}.pdf`)
  }

  const renderTemplate = () => {
    switch (data.template) {
      case "modern":
        return <ModernTemplate data={data} />
      case "minimal":
        return <MinimalTemplate data={data} />
      default:
        return <ClassicTemplate data={data} />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Eye className="h-5 w-5 text-primary" />
          Preview
        </CardTitle>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" disabled className="gap-2 bg-transparent">
                  <Lock className="h-4 w-4" />
                  Save
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Saving invoices is a Pro feature</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button size="sm" onClick={handleDownloadPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border border-border">
          <div ref={previewRef} className="bg-white p-8">
            {renderTemplate()}
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-muted/50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-foreground">Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">{formatCurrency(data.subtotal, data.currency)}</span>
            </div>
            {data.taxAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax ({data.taxRate}%)</span>
                <span className="font-medium text-foreground">{formatCurrency(data.taxAmount, data.currency)}</span>
              </div>
            )}
            {data.discountAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount ({data.discountRate}%)</span>
                <span className="font-medium text-foreground">
                  -{formatCurrency(data.discountAmount, data.currency)}
                </span>
              </div>
            )}
            {data.shippingAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(data.shippingAmount, data.currency)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-border pt-2">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-foreground">{formatCurrency(data.total, data.currency)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
