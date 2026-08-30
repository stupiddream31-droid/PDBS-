import Link from 'next/link'
import { ArrowUpRight, Box, Database, Waves } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'
import { navItems } from '@/lib/nav'

const capabilities = [
  'Entity Resolution',
  'Relationship Mapping',
  'Transaction Intelligence',
  'Supplier Intelligence',
  'Customer Intelligence',
  'Inventory Intelligence',
  'Business Intelligence',
  'Audit Logs',
  'Workflow Engine',
  'AI Agent Runtime',
]

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <StatusBadge tone="info" dot>
          Foundation v1
        </StatusBadge>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            PDBS — Personal Business Data System
          </h1>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            A single operating foundation for two businesses. Manage products,
            inventory, suppliers, customers, transactions, and finance from one
            consistent, modular workspace — built to grow into a full business
            data system.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open Dashboard
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Browse Products
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Box className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-semibold">Used Foam Box Business</h2>
              <p className="text-xs text-muted-foreground">
                Reclaimed insulated boxes, lids and accessories
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-success/12 text-success">
              <Waves className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-semibold">Crab Business</h2>
              <p className="text-xs text-muted-foreground">
                Live, frozen and processed crab product lines
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Modules</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} className="group">
                <Card className="h-full p-4 transition-colors group-hover:border-primary/40 group-hover:bg-muted/40">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground/70">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="size-4 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-lg font-semibold tracking-tight">
            Designed to extend
          </h2>
        </div>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">
            The architecture is intentionally modular. These capabilities are
            planned for future versions and are{' '}
            <span className="font-medium text-foreground">
              not yet implemented
            </span>
            :
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <li key={cap}>
                <StatusBadge tone="neutral">{cap}</StatusBadge>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  )
}
