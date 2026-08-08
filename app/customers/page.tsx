import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { DataTable, type Column } from '@/components/ui/data-table'
import { StatusBadge, toneForStatus } from '@/components/ui/status-badge'
import { getCustomers } from '@/lib/data'
import type { Customer } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Customers',
}

const columns: Column<Customer>[] = [
  {
    key: 'name',
    header: 'Customer',
    cell: (c) => (
      <div className="space-y-0.5">
        <p className="font-medium">{c.name}</p>
        {c.aliases.length > 0 && (
          <p className="text-xs text-muted-foreground">
            aka {c.aliases.join(', ')}
          </p>
        )}
      </div>
    ),
  },
  {
    key: 'line',
    header: 'Line',
    cell: (c) => (
      <StatusBadge tone={c.business === 'crab' ? 'success' : 'info'}>
        {c.business === 'crab' ? 'Crab' : 'Foam'}
      </StatusBadge>
    ),
  },
  {
    key: 'phone',
    header: 'Phone',
    cell: (c) => <span className="font-mono text-xs">{c.phone}</span>,
  },
  {
    key: 'location',
    header: 'Location',
    cell: (c) => <span className="text-muted-foreground">{c.location}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (c) => (
      <StatusBadge tone={toneForStatus(c.status)} dot>
        {c.status}
      </StatusBadge>
    ),
  },
  {
    key: 'notes',
    header: 'Notes',
    className: 'max-w-xs',
    cell: (c) => (
      <span className="block truncate text-xs text-muted-foreground">
        {c.notes}
      </span>
    ),
  },
]

export default function CustomersPage() {
  const customers = getCustomers()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Buyers across both business lines, with canonical names and aliases ready for entity resolution."
      />
      <Card className="overflow-hidden p-0">
        <DataTable
          columns={columns}
          rows={customers}
          getRowId={(c) => c.id}
          emptyMessage="No customers yet."
        />
      </Card>
    </div>
  )
}
