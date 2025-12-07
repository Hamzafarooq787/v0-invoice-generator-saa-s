"use client"

import type React from "react"

import { useState } from "react"
import type { Invoice } from "@/lib/types"
import { formatCurrency } from "@/lib/invoice"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface AddPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoice: Invoice | null
  onPaymentAdded: (invoiceId: string, newAmountPaid: number, newBalanceDue: number, newStatus: string) => void
}

export default function AddPaymentDialog({ open, onOpenChange, invoice, onPaymentAdded }: AddPaymentDialogProps) {
  const [amount, setAmount] = useState("")
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!invoice) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const paymentAmount = Number.parseFloat(amount)
    if (Number.isNaN(paymentAmount) || paymentAmount <= 0) {
      toast.error("Please enter a valid amount")
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    // Add payment record
    const { error: paymentError } = await supabase.from("payments").insert({
      invoice_id: invoice.id,
      amount: paymentAmount,
      payment_date: paymentDate,
      notes: notes || null,
    })

    if (paymentError) {
      toast.error("Failed to add payment")
      setIsLoading(false)
      return
    }

    // Update invoice
    const newAmountPaid = Number(invoice.amount_paid) + paymentAmount
    const newBalanceDue = Number(invoice.total_amount) - newAmountPaid
    let newStatus: string = invoice.status

    if (newBalanceDue <= 0) {
      newStatus = "paid"
    } else if (newAmountPaid > 0) {
      newStatus = "partially_paid"
    }

    const { error: updateError } = await supabase
      .from("invoices")
      .update({
        amount_paid: newAmountPaid,
        balance_due: Math.max(0, newBalanceDue),
        status: newStatus,
      })
      .eq("id", invoice.id)

    if (updateError) {
      toast.error("Failed to update invoice")
      setIsLoading(false)
      return
    }

    toast.success("Payment added successfully")
    onPaymentAdded(invoice.id, newAmountPaid, Math.max(0, newBalanceDue), newStatus)
    setAmount("")
    setNotes("")
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
          <DialogDescription>Record a payment for invoice {invoice.invoice_number}</DialogDescription>
        </DialogHeader>

        <div className="mb-4 rounded-lg bg-muted p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Amount</p>
              <p className="font-semibold text-foreground">{formatCurrency(invoice.total_amount, invoice.currency)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Balance Due</p>
              <p className="font-semibold text-amber-600">{formatCurrency(invoice.balance_due, invoice.currency)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Payment Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              max={invoice.balance_due}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Input
              id="paymentDate"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Payment method, reference number, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Payment"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
