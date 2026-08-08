import type { Metadata } from 'next'
import { StatCard } from '@/components/dashboard/stat-card'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { DataTable, type Column } from '@/components/ui/data-table'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatCurrency, formatDate, getFinanceEntries } from '@/lib/data'
import type { FinanceEntry, PaymentMethod } from '@/lib/types'
import { Scale, TrendingDown, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Finance',
}

const paymentLabel: Record<PaymentMethod, string> = {
  cash: 'Cash',
  'bank-transfer': 'Bank transfer',
  'mobile-money': 'Mobile money',
  card: 'Card',
  credit: 'Credit',
}

const columns: Column<FinanceEntry>[] = [
  {
    key: 'date',
    header: 'Date',
    cell: (f) => (
      <span className="text-xs text-muted-foreground">
        {formatDate(f.transactionDate)}
      </span>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    cell: (f) => <span className="font-medium">{f.category}</span>,
  },
  {
    key: 'type',
    header: 'Type',
    cell: (f) => (
      <StatusBadge tone={f.type === 'income' ? 'success' : 'danger'} dot>
        {f.type}
      </StatusBadge>
    ),
  },
  {
    key: 'method',
    header: 'Method',
    cell: (f) => (
      <span className="text-muted-foreground">
        {paymentLabel[f.paymentMethod]}
      </span>
    ),
  },
  {
    key: 'link',
    header: 'Linked txn',
    cell: (f) => (
      <span className="font-mono text-xs text-muted-foreground">
        {f.transactionId ?? '—'}
      </span>
    ),
  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'right',
    cell: (f) => (
      <span
        className={`font-mono font-medium tabular-nums ${
          f.type === 'income' ? 'text-success' : 'text-foreground'
        }`}
      >
        {f.type === 'income' ? '+' : '−'}
        {formatCurrency(f.amount)}
      </span>
    ),
  },
]

export default function FinancePage() {
  const entries = getFinanceEntries()
  const income = entries
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0)
  const expenses = entries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)
  const net = income - expenses

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance"
        description="Income and expense ledger. Totals summarize the sample entries seeded for this foundation build."
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Income"
          value={formatCurrency(income)}
          icon={TrendingUp}
          accent="success"
        />
        <StatCard
          label="Total Expenses"
          value={formatCurrency(expenses)}
          icon={TrendingDown}
          accent="warning"
        />
        <StatCard
          label="Net"
          value={`${net >= 0 ? '+' : '−'}${formatCurrency(Math.abs(net))}`}
          icon={Scale}
          accent={net >= 0 ? 'success' : 'primary'}
        />
      </section>

      <Card className="overflow-hidden p-0">
        <DataTable
          columns={columns}
          rows={entries}
          getRowId={(f) => f.id}
          emptyMessage="No finance entries yet."
        />
      </Card>
    </div>
  )
}
