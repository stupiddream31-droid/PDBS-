import {
  Boxes,
  LayoutDashboard,
  Package,
  Receipt,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  description: string
}

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Business overview and daily activity',
  },
  {
    label: 'Products',
    href: '/products',
    icon: Package,
    description: 'Catalog of foam boxes and crab products',
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: Boxes,
    description: 'Stock levels, condition and locations',
  },
  {
    label: 'Suppliers',
    href: '/suppliers',
    icon: Truck,
    description: 'Sources for foam boxes and crab',
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: Users,
    description: 'Buyers across both business lines',
  },
  {
    label: 'Transactions',
    href: '/transactions',
    icon: Receipt,
    description: 'Sales, purchases and adjustments',
  },
  {
    label: 'Finance',
    href: '/finance',
    icon: Wallet,
    description: 'Income and expense ledger',
  },
]
