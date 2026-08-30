import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { DataTable, type Column } from '@/components/ui/data-table'
import { StatusBadge, toneForStatus } from '@/components/ui/status-badge'
import { getSuppliers } from '@/lib/data'
import type { Supplier } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Suppliers',
}

const columns: Column<Supplier>[] = [
  {
    key: 'name',
    header: 'Supplier',
    cell: (s) => (
      <div className="space-y-0.5">
        <p className="font-medium">{s.canonicalName}</p>
        {s.aliases.length > 0 && (
          <p className="text-xs text-muted-foreground">
            aka {s.aliases.join(', ')}
          </p>
        )}
      </div>
    ),
  },
  {
    key: 'line',
    header: 'Line',
    cell: (s) => (
      <StatusBadge tone={s.business === 'crab' ? 'success' : 'info'}>
        {s.business === 'crab' ? 'Crab' : 'Foam'}
      </StatusBadge>
    ),
  },
  {
    key: 'phone',
    header: 'Phone',
    cell: (s) => <span className="font-mono text-xs">{s.phone}</span>,
  },
  {
    key: 'location',
    header: 'Location',
    cell: (s) => <span className="text-muted-foreground">{s.location}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (s) => (
      <StatusBadge tone={toneForStatus(s.status)} dot>
        {s.status}
      </StatusBadge>
    ),
  },
  {
    key: 'notes',
    header: 'Notes',
    className: 'max-w-xs',
    cell: (s) => (
      <span className="block truncate text-xs text-muted-foreground">
        {s.notes}
      </span>
    ),
  },
]

export default function SuppliersPage() {
  const suppliers = getSuppliers()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suppliers"
        description="Sources for used foam boxes and crab, with canonical names and known aliases for future entity resolution."
      />
      <Card className="overflow-hidden p-0">
        <DataTable
          columns={columns}
          rows={suppliers}
          getRowId={(s) => s.id}
          emptyMessage="No suppliers yet."
        />
      </Card>
    </div>
  )
}
