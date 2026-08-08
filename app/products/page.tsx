import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { DataTable, type Column } from '@/components/ui/data-table'
import { StatusBadge, toneForStatus } from '@/components/ui/status-badge'
import { formatCurrency, getProducts } from '@/lib/data'
import type { Product } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Products',
}

const businessLabel: Record<Product['business'], string> = {
  foam: 'Foam',
  crab: 'Crab',
}

const columns: Column<Product>[] = [
  {
    key: 'name',
    header: 'Product',
    cell: (p) => (
      <div className="space-y-0.5">
        <p className="font-medium">{p.name}</p>
        <p className="text-xs text-muted-foreground">{p.category}</p>
      </div>
    ),
  },
  {
    key: 'sku',
    header: 'SKU',
    cell: (p) => <span className="font-mono text-xs">{p.sku}</span>,
  },
  {
    key: 'business',
    header: 'Line',
    cell: (p) => (
      <StatusBadge tone={p.business === 'crab' ? 'success' : 'info'}>
        {businessLabel[p.business]}
      </StatusBadge>
    ),
  },
  {
    key: 'unit',
    header: 'Unit',
    cell: (p) => <span className="text-muted-foreground">{p.unit}</span>,
  },
  {
    key: 'cost',
    header: 'Cost',
    align: 'right',
    cell: (p) => (
      <span className="font-mono tabular-nums">
        {formatCurrency(p.costPrice)}
      </span>
    ),
  },
  {
    key: 'price',
    header: 'Selling',
    align: 'right',
    cell: (p) => (
      <span className="font-mono font-medium tabular-nums">
        {formatCurrency(p.sellingPrice)}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    cell: (p) => (
      <StatusBadge tone={toneForStatus(p.status)} dot>
        {p.status}
      </StatusBadge>
    ),
  },
]

export default function ProductsPage() {
  const products = getProducts()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Catalog across the foam box and crab business lines, with cost and selling prices."
      />
      <Card className="overflow-hidden p-0">
        <DataTable
          columns={columns}
          rows={products}
          getRowId={(p) => p.id}
          emptyMessage="No products yet."
        />
      </Card>
    </div>
  )
}
