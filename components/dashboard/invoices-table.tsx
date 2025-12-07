"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Invoice } from "@/lib/types"
import { formatCurrency } from "@/lib/invoice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Eye, Download, Mail, Trash2, Plus, FileText } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import AddPaymentDialog from "./add-payment-dialog"

interface InvoicesTableProps {
  invoices: Invoice[]
}

const statusColors = {
  unpaid: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
  partially_paid: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
  paid: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200",
  overdue: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
}

export default function InvoicesTable({ invoices: initialInvoices }: InvoicesTableProps) {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const router = useRouter()

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client_company?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDelete = async (invoiceId: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return

    const supabase = createClient()
    const { error } = await supabase.from("invoices").delete().eq("id", invoiceId)

    if (error) {
      toast.error("Failed to delete invoice")
      return
    }

    setInvoices(invoices.filter((inv) => inv.id !== invoiceId))
    toast.success("Invoice deleted")
  }

  const handleAddPayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setPaymentDialogOpen(true)
  }

  const handlePaymentAdded = (invoiceId: string, newAmountPaid: number, newBalanceDue: number, newStatus: string) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              amount_paid: newAmountPaid,
              balance_due: newBalanceDue,
              status: newStatus as Invoice["status"],
            }
          : inv,
      ),
    )
    setPaymentDialogOpen(false)
    setSelectedInvoice(null)
  }

  const exportToCSV = () => {
    const headers = [
      "Invoice Number",
      "Client Name",
      "Client Company",
      "Total Amount",
      "Amount Paid",
      "Balance Due",
      "Status",
      "Invoice Date",
      "Due Date",
    ]

    const rows = filteredInvoices.map((inv) => [
      inv.invoice_number,
      inv.client_name || "",
      inv.client_company || "",
      inv.total_amount,
      inv.amount_paid,
      inv.balance_due,
      inv.status,
      inv.invoice_date,
      inv.due_date || "",
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoices-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Invoices</CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="partially_paid">Partially Paid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportToCSV} className="bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button asChild>
              <Link href="/invoice">
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-lg font-medium text-foreground">No invoices found</h3>
              <p className="mt-1 text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter"
                  : "Create your first invoice to get started"}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button className="mt-4" asChild>
                  <Link href="/invoice">Create Invoice</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{invoice.client_name || "—"}</p>
                          {invoice.client_company && (
                            <p className="text-sm text-muted-foreground">{invoice.client_company}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(invoice.total_amount, invoice.currency)}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        {formatCurrency(invoice.amount_paid, invoice.currency)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(invoice.balance_due, invoice.currency)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusColors[invoice.status]}>
                          {invoice.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(invoice.invoice_date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/invoices/${invoice.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAddPayment(invoice)}>
                              <Download className="mr-2 h-4 w-4" />
                              Add Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Email Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(invoice.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AddPaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        invoice={selectedInvoice}
        onPaymentAdded={handlePaymentAdded}
      />
    </>
  )
}
