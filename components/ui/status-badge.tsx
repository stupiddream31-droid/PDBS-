import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'border-border bg-muted text-muted-foreground',
        success:
          'border-transparent bg-success/12 text-success dark:bg-success/20',
        warning:
          'border-transparent bg-warning/15 text-warning-foreground dark:bg-warning/25 dark:text-warning',
        danger:
          'border-transparent bg-destructive/12 text-destructive dark:bg-destructive/20',
        info: 'border-transparent bg-primary/12 text-primary dark:bg-primary/20',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
)

export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>['tone']>

interface StatusBadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function StatusBadge({
  className,
  tone,
  dot = false,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot && (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-current"
        />
      )}
      {children}
    </span>
  )
}

/** Maps common status strings to a badge tone. */
export function toneForStatus(status: string): BadgeTone {
  switch (status) {
    case 'active':
    case 'completed':
    case 'income':
      return 'success'
    case 'pending':
    case 'draft':
    case 'used-fair':
      return 'warning'
    case 'cancelled':
    case 'refunded':
    case 'discontinued':
    case 'archived':
    case 'damaged':
    case 'expense':
      return 'danger'
    case 'inactive':
    case 'inflow':
      return 'neutral'
    default:
      return 'neutral'
  }
}
