"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, DollarSign, CheckCircle, Clock, Crown, ArrowRight } from "lucide-react"
import { formatCurrency } from "@/lib/invoice"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface DashboardOverviewProps {
  stats: {
    totalInvoices: number
    totalBilled: number
    totalPaid: number
    outstanding: number
  }
  isPro: boolean
}

export default function DashboardOverview({ stats, isPro }: DashboardOverviewProps) {
  const searchParams = useSearchParams()
  const showUpgrade = searchParams.get("upgrade") === "true"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your invoice overview.</p>
      </div>

      {/* Upgrade Banner */}
      {(!isPro || showUpgrade) && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
          <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
                <Crown className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Upgrade to Pro</h3>
                <p className="text-sm text-muted-foreground">Save invoices, track payments, manage clients, and more</p>
              </div>
            </div>
            <Button className="gap-2" asChild>
              <Link href="/pricing">
                View Plans
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalInvoices}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Billed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalBilled)}</div>
            <p className="text-xs text-muted-foreground">Total invoice value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Received</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalPaid)}</div>
            <p className="text-xs text-muted-foreground">Payments received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{formatCurrency(stats.outstanding)}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <Link href="/invoice">
                <FileText className="h-4 w-4" />
                Create New Invoice
              </Link>
            </Button>
            {isPro ? (
              <>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                  <Link href="/dashboard/clients">
                    <FileText className="h-4 w-4" />
                    Manage Clients
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                  <Link href="/dashboard/invoices">
                    <FileText className="h-4 w-4" />
                    View All Invoices
                  </Link>
                </Button>
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-4 text-center">
                <Crown className="mx-auto mb-2 h-6 w-6 text-amber-500" />
                <p className="text-sm text-muted-foreground">
                  Upgrade to Pro to save invoices, manage clients, and track payments
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest invoice activities</CardDescription>
          </CardHeader>
          <CardContent>
            {isPro && stats.totalInvoices > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  You have {stats.totalInvoices} invoice{stats.totalInvoices !== 1 ? "s" : ""} in your account.
                </p>
                <Button variant="link" className="h-auto p-0 text-primary" asChild>
                  <Link href="/dashboard/invoices">View all invoices</Link>
                </Button>
              </div>
            ) : isPro ? (
              <div className="py-8 text-center">
                <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No invoices yet</p>
                <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
                  <Link href="/invoice">Create your first invoice</Link>
                </Button>
              </div>
            ) : (
              <div className="py-8 text-center">
                <Crown className="mx-auto mb-2 h-8 w-8 text-amber-500/50" />
                <p className="text-sm text-muted-foreground">Upgrade to track invoice activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
