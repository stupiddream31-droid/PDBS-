import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { DataTable, type Column } from '@/components/ui/data-table'
import { StatusBadge, toneForStatus } from '@/components/ui/status-badge'
import {
  formatCurrency,
  formatDate,
  getCustomerName,
  getProductName,
  getSupplierName,
  getTransactions,
} from '@/lib/data'
import type { Transaction } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Transactions',
}

const typeTone: Record<Transaction['type'], 'success' | 'info' | 'warning' | 'danger'> = {
  sale: 'success',
  purchase: 'info',
  return: 'warning',
  adjustment: 'danger',
}

const columns: Column<Transaction>[] = [
  {
    key: 'id',
    header: 'Ref',
    cell: (t) => <span className="font-mono text-xs">{t.id}</span>,
  },
  {
    key: 'type',
    header: 'Type',
    cell: (t) => (
      <StatusBadge tone={typeTone[t.type]}>{t.type}</StatusBadge>
    ),
  },
  {
    key: 'party',
    header: 'Counterparty',
    cell: (t) => (
      <span>
        {t.type === 'sale'
          ? getCustomerName(t.customerId)
          : getSupplierName(t.supplierId)}
      </span>
    ),
  },
  {
    key: 'product',
    header: 'Product',
    cell: (t) => (
      <span className="text-muted-foreground">
        {getProductName(t.productId)}
      </span>
    ),
  },
  {
    key: 'qty',
    header: 'Qty',
    align: 'right',
    cell: (t) => (
      <span className="font-mono tabular-nums">{t.quantity}</span>
    ),
  },
  {
    key: 'unit',
    header: 'Unit price',
    align: 'right',
    cell: (t) => (
      <span className="font-mono tabular-nums text-muted-foreground">
        {formatCurrency(t.unitPrice)}
      </span>
    ),
  },
  {
    key: 'total',
    header: 'Total',
    align: 'right',
    cell: (t) => (
      <span className="font-mono font-medium tabular-nums">
        {formatCurrency(t.totalAmount)}
      </span>
    ),
  },
  {
    key: 'date',
    header: 'Date',
    align: 'right',
    cell: (t) => (
      <span className="text-xs text-muted-foreground">
        {formatDate(t.transactionDate)}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    cell: (t) => (
      <StatusBadge tone={toneForStatus(t.status)} dot>
        {t.status}
      </StatusBadge>
    ),
  },
]

export default function TransactionsPage() {
  const transactions = getTransactions()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Sales, purchases and adjustments across both businesses, most recent first."
      />
      <Card className="overflow-hidden p-0">
        <DataTable
          columns={columns}
          rows={transactions}
          getRowId={(t) => t.id}
          emptyMessage="No transactions yet."
        />
      </Card>
    </div>
  )
}
