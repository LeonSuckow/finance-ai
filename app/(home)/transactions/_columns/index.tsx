'use client'
import { CustomBadge } from '@/app/_components/custom/badge/CustomBadge'
import { Button } from '@/app/_components/ui/button'
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
  TRANSACTION_TYPE_COLUMN_CONFIG,
} from '@/app/_constants/transaction'
import utils from '@/app/_utils'
import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { useTransactionContext } from '../_context/trasaction-context'

interface ActionTransactionProps {
  transaction: Transaction
}
const ActionTransaction = ({ transaction }: ActionTransactionProps) => {
  const { handleOpenTransactionDialog, handleDeleteTransaction } =
    useTransactionContext()

  return (
    <div className="space-x-1">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => handleOpenTransactionDialog('update', transaction)}
      >
        <PencilIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => handleDeleteTransaction(transaction.id)}
      >
        <TrashIcon />
      </Button>
    </div>
  )
}

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      const { text, badgeType } =
        TRANSACTION_TYPE_COLUMN_CONFIG[transaction.type]
      return <CustomBadge type={badgeType} text={text} />
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row: { original: transaction } }) => {
      const label = TRANSACTION_CATEGORY_LABELS[transaction.category]
      return label
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método de pagamento',
    cell: ({ row: { original: transaction } }) => {
      const label = TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
      return label
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      const date = utils.format.formatDate(transaction.date)
      return date
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      const amount = utils.format.formatCurrency(transaction.amount.toString())
      return amount
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: transaction } }) => {
      return <ActionTransaction transaction={transaction} />
    },
  },
]
