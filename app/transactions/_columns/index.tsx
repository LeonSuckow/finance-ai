"use client";

import {
  CustomBadge,
  CustomBedgeType,
} from "@/app/_components/custom/badge/CustomBadge";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

const transactionTypeConfig: Record<
  TransactionType,
  { text: string; badgeType: CustomBedgeType }
> = {
  DEPOSIT: { text: "Depósito", badgeType: "success" },
  EXPENSE: { text: "Despesa", badgeType: "danger" },
  INVESTMENT: { text: "Investimento", badgeType: "white" },
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
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
