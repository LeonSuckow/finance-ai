import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { CustomBedgeType } from '../_components/custom/badge/CustomBadge'

function createOptionsFromLabels<T extends string>(labels: Record<T, string>) {
  return Object.keys(labels).map((key) => ({
    value: key as T,
    label: labels[key as T],
  }))
}

export const TRANSACTION_CATEGORY_LABELS: Record<TransactionCategory, string> =
  {
    EDUCATION: 'Educação',
    ENTERTAINMENT: 'Entretenimento',
    FOOD: 'Alimentação',
    HEALTH: 'Saúde',
    HOUSING: 'Moradia',
    SALARY: 'Salário',
    TRANSPORTATION: 'Transporte',
    UTILITY: 'Utilidades',
    OTHER: 'Outros',
  }

export const TRANSACTION_PAYMENT_METHOD_LABELS: Record<
  TransactionPaymentMethod,
  string
> = {
  CASH: 'Dinheiro',
  CREDIT_CARD: 'Cartão de crédito',
  DEBIT_CARD: 'Cartão de debito',
  BANK_TRANSFER: 'Transferência bancária',
  BANK_SPLIT: 'Parcelamento bancário',
  PIX: 'PIX',
  OTHER: 'Outro',
}

export const TRANSACTION_TYPE_LABELS = {
  [TransactionType.DEPOSIT]: 'Deposito',
  [TransactionType.EXPENSE]: 'Despesa',
  [TransactionType.INVESTMENT]: 'Investimento',
}

export const TRANSACTION_CATEGORY_OPTIONS = createOptionsFromLabels(
  TRANSACTION_CATEGORY_LABELS,
)
export const TRANSACTION_PAYMENT_METHOD_OPTIONS = createOptionsFromLabels(
  TRANSACTION_PAYMENT_METHOD_LABELS,
)

export const TRANSACTION_TYPE_OPTIONS = createOptionsFromLabels(
  TRANSACTION_TYPE_LABELS,
)

export const TRANSACTION_TYPE_COLUMN_CONFIG: Record<
  TransactionType,
  { text: string; badgeType: CustomBedgeType }
> = {
  [TransactionType.DEPOSIT]: { text: 'Depósito', badgeType: 'success' },
  [TransactionType.EXPENSE]: { text: 'Despesa', badgeType: 'danger' },
  [TransactionType.INVESTMENT]: { text: 'Investimento', badgeType: 'white' },
}

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.CREDIT_CARD]: 'credit-card.svg',
  [TransactionPaymentMethod.DEBIT_CARD]: 'debit-card.svg',
  [TransactionPaymentMethod.BANK_TRANSFER]: 'bank-transfer.svg',
  [TransactionPaymentMethod.BANK_SPLIT]: 'bank-slip.svg',
  [TransactionPaymentMethod.CASH]: 'money.svg',
  [TransactionPaymentMethod.PIX]: 'pix.svg',
  [TransactionPaymentMethod.OTHER]: 'other.svg',
}
