import {
  Transaction,
  TransactionCategory,
  TransactionType,
} from '@prisma/client'

export type DashboartData = {
  balance: number
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
  typesPercentage: TransactionPercentagePerType
  totalExpensePerCategory: TotalExpensePerCategory[]
  lastTransactions: Transaction[]
}

export type TransactionPercentagePerType = {
  [key in TransactionType]: number
}

export interface TotalExpensePerCategory {
  category: TransactionCategory
  totalAmount: number
  percentageOfTotal: number
}
