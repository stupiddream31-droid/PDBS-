/**
 * PDBS — Personal Business Data System
 * Core domain types.
 *
 * These interfaces are the single source of truth for the shape of every
 * entity in the system. They are intentionally database-agnostic so that the
 * current in-memory sample data can later be swapped for a Supabase-backed
 * data layer without touching the UI. Each entity carries an `id` and, where
 * relevant, `createdAt`/`updatedAt` fields to mirror a future SQL schema.
 */

/** Which of the two businesses a record belongs to. */
export type BusinessLine = 'foam' | 'crab'

export type EntityStatus = 'active' | 'inactive' | 'archived'

export type ProductStatus = 'active' | 'discontinued' | 'draft'

export type InventoryCondition =
  | 'new'
  | 'like-new'
  | 'used-good'
  | 'used-fair'
  | 'damaged'
  | 'fresh'
  | 'frozen'

export type TransactionType = 'sale' | 'purchase' | 'return' | 'adjustment'

export type TransactionStatus =
  | 'draft'
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export type FinanceType = 'income' | 'expense'

export type PaymentMethod =
  | 'cash'
  | 'bank-transfer'
  | 'mobile-money'
  | 'card'
  | 'credit'

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  business: BusinessLine
  unit: string
  costPrice: number
  sellingPrice: number
  status: ProductStatus
}

export interface InventoryItem {
  id: string
  productId: string
  quantity: number
  availableQuantity: number
  condition: InventoryCondition
  location: string
  updatedAt: string
}

export interface Supplier {
  id: string
  canonicalName: string
  aliases: string[]
  phone: string
  location: string
  business: BusinessLine
  status: EntityStatus
  notes: string
}

export interface Customer {
  id: string
  name: string
  aliases: string[]
  phone: string
  location: string
  business: BusinessLine
  status: EntityStatus
  notes: string
}

export interface Transaction {
  id: string
  type: TransactionType
  business: BusinessLine
  customerId: string | null
  supplierId: string | null
  productId: string
  quantity: number
  unitPrice: number
  totalAmount: number
  transactionDate: string
  status: TransactionStatus
  notes: string
}

export interface FinanceEntry {
  id: string
  transactionId: string | null
  type: FinanceType
  amount: number
  category: string
  paymentMethod: PaymentMethod
  transactionDate: string
  notes: string
}
