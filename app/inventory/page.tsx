import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { DataTable, type Column } from '@/components/ui/data-table'
import { StatusBadge, toneForStatus } from '@/components/ui/status-badge'
import { formatDate, getInventory, getProductName } from '@/lib/data'
import type { InventoryItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Inventory',
}

const conditionLabel: Record<InventoryItem['condition'], string> = {
  new: 'New',
  'like-new': 'Like new',
  'used-good': 'Used — good',
  'used-fair': 'Used — fair',
  damaged: 'Damaged',
  fresh: 'Fresh',
  frozen: 'Frozen',
}

const columns: Column<InventoryItem>[] = [
  {
    key: 'product',
    header: 'Product',
    cell: (i) => <span className="font-medium">{getProductName(i.productId)}</span>,
  },
  {
    key: 'quantity',
    header: 'Quantity',
    align: 'right',
    cell: (i) => (
      <span className="font-mono tabular-nums text-muted-foreground">
        {i.quantity.toLocaleString()}
      </span>
    ),
  },
  {
    key: 'available',
    header: 'Available',
    align: 'right',
    cell: (i) => (
      <span className="font-mono font-medium tabular-nums">
        {i.availableQuantity.toLocaleString()}
      </span>
    ),
  },
  {
    key: 'condition',
    header: 'Condition',
    cell: (i) => (
      <StatusBadge tone={toneForStatus(i.condition)}>
        {conditionLabel[i.condition]}
      </StatusBadge>
    ),
  },
  {
    key: 'location',
    header: 'Location',
    cell: (i) => <span className="text-muted-foreground">{i.location}</span>,
  },
  {
    key: 'updated',
    header: 'Updated',
    align: 'right',
    cell: (i) => (
      <span className="text-xs text-muted-foreground">
        {formatDate(i.updatedAt)}
      </span>
    ),
  },
]

export default function InventoryPage() {
  const inventory = getInventory()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="Stock levels by product, including condition, storage location and last update."
      />
      <Card className="overflow-hidden p-0">
        <DataTable
          columns={columns}
          rows={inventory}
          getRowId={(i) => i.id}
          emptyMessage="No inventory records yet."
        />
      </Card>
    </div>
  )
}
