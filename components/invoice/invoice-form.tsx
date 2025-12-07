"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Building2, User, FileText, Lock } from "lucide-react"
import { currencies } from "@/lib/invoice"
import type { InvoiceFormData, LineItem } from "@/lib/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InvoiceFormProps {
  data: InvoiceFormData
  onUpdate: (updates: Partial<InvoiceFormData>) => void
  onUpdateItem: (index: number, updates: Partial<LineItem>) => void
  onAddItem: () => void
  onRemoveItem: (index: number) => void
}

export default function InvoiceForm({ data, onUpdate, onUpdateItem, onAddItem, onRemoveItem }: InvoiceFormProps) {
  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-primary" />
            Your Company
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Your Company Ltd."
                value={data.companyName}
                onChange={(e) => onUpdate({ companyName: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Email</Label>
              <Input
                id="companyEmail"
                type="email"
                placeholder="hello@company.com"
                value={data.companyEmail}
                onChange={(e) => onUpdate({ companyEmail: e.target.value })}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyPhone">Phone</Label>
              <Input
                id="companyPhone"
                placeholder="+1 (555) 123-4567"
                value={data.companyPhone}
                onChange={(e) => onUpdate({ companyPhone: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyLogo">Logo URL</Label>
              <Input
                id="companyLogo"
                placeholder="https://..."
                value={data.companyLogo}
                onChange={(e) => onUpdate({ companyLogo: e.target.value })}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Address</Label>
            <Textarea
              id="companyAddress"
              placeholder="123 Business St, City, State, ZIP"
              value={data.companyAddress}
              onChange={(e) => onUpdate({ companyAddress: e.target.value })}
              rows={2}
              className="rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-primary" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                placeholder="John Doe"
                value={data.clientName}
                onChange={(e) => onUpdate({ clientName: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientCompany">Company Name</Label>
              <Input
                id="clientCompany"
                placeholder="Client Company Inc."
                value={data.clientCompany}
                onChange={(e) => onUpdate({ clientCompany: e.target.value })}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="client@company.com"
              value={data.clientEmail}
              onChange={(e) => onUpdate({ clientEmail: e.target.value })}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientAddress">Address</Label>
            <Textarea
              id="clientAddress"
              placeholder="456 Client Ave, City, State, ZIP"
              value={data.clientAddress}
              onChange={(e) => onUpdate({ clientAddress: e.target.value })}
              rows={2}
              className="rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Invoice Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={data.invoiceNumber}
                onChange={(e) => onUpdate({ invoiceNumber: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={data.currency} onValueChange={(value) => onUpdate({ currency: value })}>
                <SelectTrigger id="currency" className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={data.invoiceDate}
                onChange={(e) => onUpdate({ invoiceDate: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={data.dueDate}
                onChange={(e) => onUpdate({ dueDate: e.target.value })}
                className="rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Line Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {data.items.map((item, index) => (
            <div key={item.id} className="space-y-4 rounded-xl border border-border bg-muted/30 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Item {index + 1}</span>
                {data.items.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(index)}
                    className="h-8 w-8 rounded-lg p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input
                    placeholder="Product or Service"
                    value={item.name}
                    onChange={(e) => onUpdateItem(index, { name: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Brief description"
                    value={item.description}
                    onChange={(e) => onUpdateItem(index, { description: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => onUpdateItem(index, { quantity: Number.parseFloat(e.target.value) || 0 })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => onUpdateItem(index, { unitPrice: Number.parseFloat(e.target.value) || 0 })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Tax Rate (%)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Per-item tax is a Pro feature</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.taxRate}
                    disabled
                    className="rounded-lg bg-muted"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={onAddItem} className="w-full gap-2 rounded-lg bg-transparent">
            <Plus className="h-4 w-4" />
            Add Line Item
          </Button>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Tax Rate (%)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Auto-calculation is a Pro feature</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input type="number" min="0" step="0.01" value={data.taxRate} disabled className="rounded-lg bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Discount (%)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Auto-calculation is a Pro feature</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={data.discountRate}
                disabled
                className="rounded-lg bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Shipping
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Shipping is a Pro feature</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={data.shippingAmount}
                disabled
                className="rounded-lg bg-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes & Terms */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Notes & Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Thank you for your business!"
              value={data.notes}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              rows={3}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              placeholder="Payment is due within 30 days..."
              value={data.terms}
              onChange={(e) => onUpdate({ terms: e.target.value })}
              rows={3}
              className="rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
