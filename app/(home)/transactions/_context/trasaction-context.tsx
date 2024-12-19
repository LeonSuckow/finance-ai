'use client'
import {
  deleteTransaction,
  upsertTransaction,
  UpsertTransactionParams,
} from '@/app/_actions/transacion'
import { FieldDialogConfig } from '@/app/_components/custom/dialog/dialog-form'
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/app/_constants/transaction'
import {
  Transaction,
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface TransactionContextProps {
  dialogIsOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  transaction: Transaction | null
  fieldsConfig: FieldDialogConfig[]
  dialogTitle: string
  setDialogTitle: Dispatch<SetStateAction<string>>
  setTransaction: Dispatch<SetStateAction<Transaction | null>>
  handleDeleteTransaction: (transactionId: string) => Promise<void>
  handleOpenTransactionDialog: (
    type: 'create' | 'update',
    transactionData?: Transaction,
  ) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dialogAction: any
}
export interface TransactionProviderProps {
  children: ReactNode
}

const TransactionContext = createContext({} as TransactionContextProps)

const getTransactionFieldsConfig = (
  transaction?: Transaction,
): FieldDialogConfig[] => [
  {
    name: 'name',
    label: 'Nome',
    type: 'text',
    defaultValue: transaction?.name || '',
  },
  {
    name: 'amount',
    label: 'Valor',
    type: 'numeric',
    defaultValue: transaction?.amount ? Number(transaction.amount) : '',
  },
  {
    name: 'type',
    label: 'Tipo de Transação',
    type: 'select',
    options: TRANSACTION_TYPE_OPTIONS,
    enumType: TransactionType,
    defaultValue: transaction?.type || TransactionType.EXPENSE,
  },
  {
    name: 'category',
    label: 'Categoria',
    type: 'select',
    options: TRANSACTION_CATEGORY_OPTIONS,
    enumType: TransactionCategory,
    defaultValue: transaction?.category || TransactionCategory.OTHER,
  },
  {
    name: 'paymentMethod',
    label: 'Método de Pagamento',
    type: 'select',
    options: TRANSACTION_PAYMENT_METHOD_OPTIONS,
    enumType: TransactionPaymentMethod,
    defaultValue: transaction?.paymentMethod || TransactionPaymentMethod.CASH,
  },
  {
    name: 'date',
    label: 'Data',
    type: 'date',
    defaultValue: transaction?.date || new Date(),
  },
]

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [dialogIsOpen, setIsDialogOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<string>('')
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [dialogAction, setDialogAction] = useState<
    ((data: UpsertTransactionParams) => Promise<void>) | null
  >(null)
  const [fieldsConfig, setFieldsConfig] = useState<FieldDialogConfig[]>([])

  const handleAddTransaction = async (data: UpsertTransactionParams) => {
    try {
      await upsertTransaction({ ...data })
      console.log('Transação adicionada:', data)
    } catch (error) {
      console.error('Erro ao adicionar transação:', error)
    }
  }

  const handleUpdateTransaction = async (
    data: UpsertTransactionParams,
    transactionId: string,
  ) => {
    try {
      await upsertTransaction({
        ...data,
        id: transactionId,
        amount: Number(data.amount),
      })
      console.log('Transação adicionada:', data)
    } catch (error) {
      console.error('Erro ao adicionar transação:', error)
    }
  }

  const handleOpenTransactionDialog = (
    type: 'create' | 'update',
    transactionData?: Transaction,
  ) => {
    setIsDialogOpen(true)
    setDialogTitle(type === 'create' ? 'Criar Transação' : 'Editar Transação')
    setTransaction(transactionData || null)
    setDialogAction(() => {
      return type === 'create'
        ? handleAddTransaction
        : (data: UpsertTransactionParams) =>
            handleUpdateTransaction(data, transactionData!.id)
    })

    setFieldsConfig(getTransactionFieldsConfig(transactionData))
  }

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteTransaction(transactionId)
      console.log('Transação adicionada:', transactionId)
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        dialogIsOpen,
        transaction,
        fieldsConfig,
        dialogTitle,
        dialogAction,
        setIsDialogOpen,
        setTransaction,
        setDialogTitle,
        handleDeleteTransaction,
        handleOpenTransactionDialog,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)
  if (!context)
    throw new Error(
      'useTransactionContext must be used within a <TransactionProvider />',
    )
  return context
}
