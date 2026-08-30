import type { Metadata } from 'next'
import {
  Boxes,
  Package,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { StatCard } from '@/components/dashboard/stat-card'
import { PageHeader } from '@/components/layout/page-header'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  formatCurrency,
  getDashboardMetrics,
  getProducts,
  getTransactions,
} from '@/lib/data'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  const metrics = getDashboardMetrics()
  const recent = getTransactions().slice(0, 5)
  const products = getProducts()

  const foamCount = products.filter((p) => p.business === 'foam').length
  const crabCount = products.filter((p) => p.business === 'crab').length
  const netToday = metrics.todaysSales - metrics.todaysExpenses

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="A live overview of both business lines. Figures below are drawn from sample data seeded for this foundation build."
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Products"
          value={String(metrics.totalProducts)}
          hint={`${foamCount} foam · ${crabCount} crab`}
          icon={Package}
          accent="primary"
        />
        <StatCard
          label="Inventory"
          value={metrics.totalInventory.toLocaleString()}
          hint="Available units in stock"
          icon={Boxes}
          accent="neutral"
        />
        <StatCard
          label="Suppliers"
          value={String(metrics.totalSuppliers)}
          hint="Active sources"
          icon={Truck}
          accent="neutral"
        />
        <StatCard
          label="Customers"
          value={String(metrics.totalCustomers)}
          hint="Active buyers"
          icon={Users}
          accent="neutral"
        />
        <StatCard
          label="Today's Sales"
          value={formatCurrency(metrics.todaysSales)}
          hint="Income recorded today"
          icon={TrendingUp}
          accent="success"
        />
        <StatCard
          label="Today's Expenses"
          value={formatCurrency(metrics.todaysExpenses)}
          hint="Spend recorded today"
          icon={TrendingDown}
          accent="warning"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecentTransactions rows={recent} />
        </div>
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Today at a glance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Net position today
                </span>
                <span
                  className={`font-mono text-lg font-semibold tabular-nums ${
                    netToday >= 0 ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {netToday >= 0 ? '+' : '−'}
                  {formatCurrency(Math.abs(netToday))}
                </span>
              </div>
              <div className="h-px bg-border" />
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Sales</dt>
                  <dd className="font-mono tabular-nums text-success">
                    {formatCurrency(metrics.todaysSales)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Expenses</dt>
                  <dd className="font-mono tabular-nums">
                    {formatCurrency(metrics.todaysExpenses)}
                  </dd>
                </div>
              </dl>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Analytics and forecasting will arrive with the Business
                Intelligence module. This foundation shows structurตe only.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
