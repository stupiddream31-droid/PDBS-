import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  hint?: string
  /** Accent color applied to the icon chip. */
  accent?: 'primary' | 'success' | 'warning' | 'neutral'
}

const accentClass = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/12 text-success',
  warning: 'bg-warning/15 text-warning-foreground dark:text-warning',
  neutral: 'bg-muted text-muted-foreground',
} as const

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  accent = 'neutral',
}: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="font-mono text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            accentClass[accent],
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
    </Card>
  )
}
