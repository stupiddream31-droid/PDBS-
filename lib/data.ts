/**
 * PDBS — sample data layer.
 *
 * IMPORTANT: This is illustrative in-memory sample data used to build out the
 * application foundation and navigation. There is NO database, backend, or
 * external API behind it yet. When Supabase is added later, the exported
 * accessor functions below (getProducts, getDashboardMetrics, etc.) are the
 * seam to replace — the UI reads only through them.
 */

import type {
  Customer,
  FinanceEntry,
  InventoryItem,
  Product,
  Supplier,
  Transaction,
} from './types'

/** Returns an ISO date string offset by `days` from now (negative = past). */
function dayOffset(days: number): string {
  const d = new Date()
  d.setHours(9, 0, 0, 0)
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

export const products: Product[] = [
  {
    id: 'prd_fb_lg',
    name: 'Used Foam Box — Large (60L)',
    sku: 'FB-LG-060',
    category: 'Insulated Boxes',
    business: 'foam',
    unit: 'box',
    costPrice: 1.5,
    sellingPrice: 4.5,
    status: 'active',
  },
  {
    id: 'prd_fb_md',
    name: 'Used Foam Box — Medium (40L)',
    sku: 'FB-MD-040',
    category: 'Insulated Boxes',
    business: 'foam',
    unit: 'box',
    costPrice: 1.0,
    sellingPrice: 3.0,
    status: 'active',
  },
  {
    id: 'prd_fb_sm',
    name: 'Used Foam Box — Small (20L)',
    sku: 'FB-SM-020',
    category: 'Insulated Boxes',
    business: 'foam',
    unit: 'box',
    costPrice: 0.6,
    sellingPrice: 1.8,
    status: 'active',
  },
  {
    id: 'prd_fb_lid',
    name: 'Replacement Foam Lid — Large',
    sku: 'FB-LID-060',
    category: 'Accessories',
    business: 'foam',
    unit: 'piece',
    costPrice: 0.3,
    sellingPrice: 1.0,
    status: 'draft',
  },
  {
    id: 'prd_cr_mud',
    name: 'Live Mud Crab — Grade A',
    sku: 'CR-MUD-A',
    category: 'Live Crab',
    business: 'crab',
    unit: 'kg',
    costPrice: 8.0,
    sellingPrice: 15.5,
    status: 'active',
  },
  {
    id: 'prd_cr_blue',
    name: 'Live Blue Swimmer Crab',
    sku: 'CR-BLU-01',
    category: 'Live Crab',
    business: 'crab',
    unit: 'kg',
    costPrice: 6.5,
    sellingPrice: 12.0,
    status: 'active',
  },
  {
    id: 'prd_cr_soft',
    name: 'Soft Shell Crab (Frozen)',
    sku: 'CR-SFT-FZ',
    category: 'Processed Crab',
    business: 'crab',
    unit: 'kg',
    costPrice: 11.0,
    sellingPrice: 22.0,
    status: 'active',
  },
  {
    id: 'prd_cr_meat',
    name: 'Picked Crab Meat (500g)',
    sku: 'CR-MEAT-500',
    category: 'Processed Crab',
    business: 'crab',
    unit: 'pack',
    costPrice: 9.0,
    sellingPrice: 18.5,
    status: 'discontinued',
  },
]

export const inventory: InventoryItem[] = [
  {
    id: 'inv_fb_lg',
    productId: 'prd_fb_lg',
    quantity: 320,
    availableQuantity: 284,
    condition: 'used-good',
    location: 'Warehouse A — Bay 1',
    updatedAt: dayOffset(-1),
  },
  {
    id: 'inv_fb_md',
    productId: 'prd_fb_md',
    quantity: 210,
    availableQuantity: 156,
    condition: 'used-good',
    location: 'Warehouse A — Bay 2',
    updatedAt: dayOffset(-2),
  },
  {
    id: 'inv_fb_sm',
    productId: 'prd_fb_sm',
    quantity: 145,
    availableQuantity: 40,
    condition: 'used-fair',
    location: 'Warehouse A — Bay 3',
    updatedAt: dayOffset(0),
  },
  {
    id: 'inv_cr_mud',
    productId: 'prd_cr_mud',
    quantity: 62,
    availableQuantity: 48,
    condition: 'fresh',
    location: 'Holding Tank 1',
    updatedAt: dayOffset(0),
  },
  {
    id: 'inv_cr_blue',
    productId: 'prd_cr_blue',
    quantity: 40,
    availableQuantity: 12,
    condition: 'fresh',
    location: 'Holding Tank 2',
    updatedAt: dayOffset(0),
  },
  {
    id: 'inv_cr_soft',
    productId: 'prd_cr_soft',
    quantity: 25,
    availableQuantity: 25,
    condition: 'frozen',
    location: 'Freezer Unit 1',
    updatedAt: dayOffset(-3),
  },
]

export const suppliers: Supplier[] = [
  {
    id: 'sup_ocean',
    canonicalName: 'Ocean Fresh Fisheries',
    aliases: ['Ocean Fresh', 'OFF Ltd'],
    phone: '+1 555 0142',
    location: 'Harbour District',
    business: 'crab',
    status: 'active',
    notes: 'Primary mud crab supplier. Delivers Tue & Fri mornings.',
  },
  {
    id: 'sup_baywatch',
    canonicalName: 'Baywatch Crabbers Co-op',
    aliases: ['Baywatch', 'BC Coop'],
    phone: '+1 555 0198',
    location: 'North Pier',
    business: 'crab',
    status: 'active',
    notes: 'Seasonal blue swimmer supply. Price varies with catch.',
  },
  {
    id: 'sup_packrecl',
    canonicalName: 'PackReclaim Recycling',
    aliases: ['Pack Reclaim', 'PRR'],
    phone: '+1 555 0110',
    location: 'Industrial Estate',
    business: 'foam',
    status: 'active',
    notes: 'Bulk used foam box reclaimer. Sorted by size on request.',
  },
  {
    id: 'sup_coldstore',
    canonicalName: 'Coldstore Logistics',
    aliases: ['Coldstore'],
    phone: '+1 555 0176',
    location: 'Depot Road',
    business: 'foam',
    status: 'inactive',
    notes: 'Occasional surplus foam boxes from cold-chain operations.',
  },
]

export const customers: Customer[] = [
  {
    id: 'cus_harbourgrill',
    name: 'Harbour Grill Restaurant',
    aliases: ['Harbour Grill', 'The Grill'],
    phone: '+1 555 0223',
    location: 'Waterfront',
    business: 'crab',
    status: 'active',
    notes: 'Weekly standing order for Grade A mud crab.',
  },
  {
    id: 'cus_seasonmkt',
    name: 'Seaside Market Stall 12',
    aliases: ['Stall 12', 'Seaside Mkt'],
    phone: '+1 555 0241',
    location: 'Central Market',
    business: 'crab',
    status: 'active',
    notes: 'Buys mixed live crab; pays cash on collection.',
  },
  {
    id: 'cus_freshpack',
    name: 'FreshPack Distributors',
    aliases: ['FreshPack'],
    phone: '+1 555 0267',
    location: 'Trade Park',
    business: 'foam',
    status: 'active',
    notes: 'Reuses large foam boxes for produce distribution.',
  },
  {
    id: 'cus_growlocal',
    name: 'GrowLocal Farm Supply',
    aliases: ['GrowLocal'],
    phone: '+1 555 0289',
    location: 'Rural Route 4',
    business: 'foam',
    status: 'inactive',
    notes: 'Buys small/medium boxes for seedling transport.',
  },
]

export const transactions: Transaction[] = [
  {
    id: 'txn_1001',
    type: 'sale',
    business: 'crab',
    customerId: 'cus_harbourgrill',
    supplierId: null,
    productId: 'prd_cr_mud',
    quantity: 12,
    unitPrice: 15.5,
    totalAmount: 186,
    transactionDate: dayOffset(0),
    status: 'completed',
    notes: 'Weekly standing order.',
  },
  {
    id: 'txn_1002',
    type: 'sale',
    business: 'foam',
    customerId: 'cus_freshpack',
    supplierId: null,
    productId: 'prd_fb_lg',
    quantity: 40,
    unitPrice: 4.5,
    totalAmount: 180,
    transactionDate: dayOffset(0),
    status: 'completed',
    notes: 'Pallet of large boxes.',
  },
  {
    id: 'txn_1003',
    type: 'purchase',
    business: 'crab',
    customerId: null,
    supplierId: 'sup_ocean',
    productId: 'prd_cr_mud',
    quantity: 30,
    unitPrice: 8.0,
    totalAmount: 240,
    transactionDate: dayOffset(0),
    status: 'completed',
    notes: 'Tuesday delivery.',
  },
  {
    id: 'txn_1004',
    type: 'sale',
    business: 'crab',
    customerId: 'cus_seasonmkt',
    supplierId: null,
    productId: 'prd_cr_blue',
    quantity: 8,
    unitPrice: 12.0,
    totalAmount: 96,
    transactionDate: dayOffset(-1),
    status: 'completed',
    notes: 'Cash on collection.',
  },
  {
    id: 'txn_1005',
    type: 'purchase',
    business: 'foam',
    customerId: null,
    supplierId: 'sup_packrecl',
    productId: 'prd_fb_md',
    quantity: 120,
    unitPrice: 1.0,
    totalAmount: 120,
    transactionDate: dayOffset(-2),
    status: 'completed',
    notes: 'Bulk sorted medium boxes.',
  },
  {
    id: 'txn_1006',
    type: 'sale',
    business: 'foam',
    customerId: 'cus_freshpack',
    supplierId: null,
    productId: 'prd_fb_sm',
    quantity: 60,
    unitPrice: 1.8,
    totalAmount: 108,
    transactionDate: dayOffset(-3),
    status: 'pending',
    notes: 'Awaiting collection confirmation.',
  },
]

export const financeEntries: FinanceEntry[] = [
  {
    id: 'fin_1',
    transactionId: 'txn_1001',
    type: 'income',
    amount: 186,
    category: 'Crab Sales',
    paymentMethod: 'bank-transfer',
    transactionDate: dayOffset(0),
    notes: 'Harbour Grill weekly order.',
  },
  {
    id: 'fin_2',
    transactionId: 'txn_1002',
    type: 'income',
    amount: 180,
    category: 'Foam Box Sales',
    paymentMethod: 'cash',
    transactionDate: dayOffset(0),
    notes: 'FreshPack pallet.',
  },
  {
    id: 'fin_3',
    transactionId: 'txn_1003',
    type: 'expense',
    amount: 240,
    category: 'Crab Purchases',
    paymentMethod: 'bank-transfer',
    transactionDate: dayOffset(0),
    notes: 'Ocean Fresh delivery.',
  },
  {
    id: 'fin_4',
    transactionId: null,
    type: 'expense',
    amount: 45,
    category: 'Fuel & Transport',
    paymentMethod: 'cash',
    transactionDate: dayOffset(0),
    notes: 'Van refuel for collections.',
  },
  {
    id: 'fin_5',
    transactionId: 'txn_1004',
    type: 'income',
    amount: 96,
    category: 'Crab Sales',
    paymentMethod: 'cash',
    transactionDate: dayOffset(-1),
    notes: 'Seaside Market.',
  },
  {
    id: 'fin_6',
    transactionId: 'txn_1005',
    type: 'expense',
    amount: 120,
    category: 'Foam Purchases',
    paymentMethod: 'bank-transfer',
    transactionDate: dayOffset(-2),
    notes: 'PackReclaim bulk.',
  },
]

/* ------------------------------------------------------------------ */
/* Accessors — the seam to replace with Supabase queries later.        */
/* ------------------------------------------------------------------ */

export function getProducts(): Product[] {
  return products
}

export function getInventory(): InventoryItem[] {
  return inventory
}

export function getSuppliers(): Supplier[] {
  return suppliers
}

export function getCustomers(): Customer[] {
  return customers
}

export function getTransactions(): Transaction[] {
  return [...transactions].sort(
    (a, b) =>
      new Date(b.transactionDate).getTime() -
      new Date(a.transactionDate).getTime(),
  )
}

export function getFinanceEntries(): FinanceEntry[] {
  return [...financeEntries].sort(
    (a, b) =>
      new Date(b.transactionDate).getTime() -
      new Date(a.transactionDate).getTime(),
  )
}

export function getProductName(productId: string): string {
  return products.find((p) => p.id === productId)?.name ?? '—'
}

export function getCustomerName(customerId: string | null): string {
  if (!customerId) return '—'
  return customers.find((c) => c.id === customerId)?.name ?? '—'
}

export function getSupplierName(supplierId: string | null): string {
  if (!supplierId) return '—'
  return suppliers.find((s) => s.id === supplierId)?.canonicalName ?? '—'
}

function isToday(iso: string): boolean {
  const d = new Date(iso)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

export interface DashboardMetrics {
  totalProducts: number
  totalInventory: number
  totalSuppliers: number
  totalCustomers: number
  todaysSales: number
  todaysExpenses: number
}

export function getDashboardMetrics(): DashboardMetrics {
  const totalInventory = inventory.reduce(
    (sum, item) => sum + item.availableQuantity,
    0,
  )

  const todaysSales = financeEntries
    .filter((f) => f.type === 'income' && isToday(f.transactionDate))
    .reduce((sum, f) => sum + f.amount, 0)

  const todaysExpenses = financeEntries
    .filter((f) => f.type === 'expense' && isToday(f.transactionDate))
    .reduce((sum, f) => sum + f.amount, 0)

  return {
    totalProducts: products.length,
    totalInventory,
    totalSuppliers: suppliers.filter((s) => s.status === 'active').length,
    totalCustomers: customers.filter((c) => c.status === 'active').length,
    todaysSales,
    todaysExpenses,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
