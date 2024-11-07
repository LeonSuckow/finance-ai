"use client";

import {
  CustomBadge,
  CustomBedgeType,
} from "@/app/_components/custom/badge/CustomBadge";
import { Button } from "@/app/_components/ui/button";
import utils from "@/app/_utils";
import {
  Transaction,
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";

const transactionTypeConfig: Record<
  TransactionType,
  { text: string; badgeType: CustomBedgeType }
> = {
  [TransactionType.DEPOSIT]: { text: "Depósito", badgeType: "success" },
  [TransactionType.EXPENSE]: { text: "Despesa", badgeType: "danger" },
  [TransactionType.INVESTMENT]: { text: "Investimento", badgeType: "white" },
};

export const transactionCategoryLabels: Record<TransactionCategory, string> = {
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

export const transactionMethodPayment: Record<
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

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      const { text, badgeType } = transactionTypeConfig[transaction.type];
      return <CustomBadge type={badgeType} text={text} />;
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) => {
      const label = transactionCategoryLabels[transaction.category];
      return label;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: ({ row: { original: transaction } }) => {
      const label = transactionMethodPayment[transaction.paymentMethod];
      return label;
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      const date = utils.format.formatDate(transaction.date);
      return date;
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      const amount = utils.format.formatCurrency(transaction.amount.toString());
      return amount;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: () => {
      return (
        <div className="space-x-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <PencilIcon />
          </Button>
        </div>
      );
    },
  },
];
