import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { CustomBedgeType } from "../_components/custom/badge/CustomBadge";

export const TRANSACTION_CATEGORY_LABELS: Record<TransactionCategory, string> =
  {
    EDUCATION: "Educação",
    ENTERTAINMENT: "Entretenimento",
    FOOD: "Alimentação",
    HEALTH: "Saúde",
    HOUSING: "Moradia",
    SALARY: "Salário",
    TRANSPORTATION: "Transporte",
    UTILITY: "Utilidades",
    OTHER: "Outros",
  };

export const TRANSACTION_PAYMENT_METHOD_LABELS: Record<
  TransactionPaymentMethod,
  string
> = {
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de crédito",
  DEBIT_CARD: "Cartão de debito",
  BANK_TRANSFER: "Transferência bancária",
  BANK_SPLIT: "Parcelamento bancário",
  PIX: "PIX",
  OTHER: "Outro",
};

export const TRANSACTION_TYPE_LABELS = {
  [TransactionType.DEPOSIT]: "Deposito",
  [TransactionType.EXPENSE]: "Despesa",
  [TransactionType.INVESTMENT]: "Investimento",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.DEPOSIT,
    label: "Deposito",
  },
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const TRANSACTION_TYPE_COLUMN_CONFIG: Record<
  TransactionType,
  { text: string; badgeType: CustomBedgeType }
> = {
  [TransactionType.DEPOSIT]: { text: "Depósito", badgeType: "success" },
  [TransactionType.EXPENSE]: { text: "Despesa", badgeType: "danger" },
  [TransactionType.INVESTMENT]: { text: "Investimento", badgeType: "white" },
};
