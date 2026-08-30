import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { StatusBadge, toneForStatus } from '@/components/ui/status-badge'
import {
  formatCurrency,
  formatDate,
  getCustomerName,
  getProductName,
  getSupplierName,
} from '@/lib/data'
import type { Transaction } from '@/lib/types'
import { cn } from '@/lib/utils'

export function RecentTransactions({ rows }: { rows: Transaction[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Link
          href="/transactions"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {rows.map((txn) => {
            const isSale = txn.type === 'sale'
            const counterparty = isSale
              ? getCustomerName(txn.customerId)
              : getSupplierName(txn.supplierId)
            return (
              <li
                key={txn.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-sm font-medium">
                    {getProductName(txn.productId)}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {counterparty} · {formatDate(txn.transactionDate)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={cn(
                      'font-mono text-sm font-semibold tabular-nums',
                      isSale ? 'text-success' : 'text-foreground',
                    )}
                  >
                    {isSale ? '+' : '−'}
                    {formatCurrency(txn.totalAmount)}
                  </span>
                  <StatusBadge tone={toneForStatus(txn.status)}>
                    {txn.status}
                  </StatusBadge>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
