import { DataTable } from '@/app/_components/ui/data-table'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { getTransactionData } from './_actions'
import { transactionsColumns } from './_columns'
import { AddTransactionsButton } from './_components/add-transaction'
import TransactionForm from './_components/transaction-form'
import { TransactionProvider } from './_context/trasaction-context'

const TransactionsPage = async () => {
  const { transactions } = await getTransactionData()
  return (
    <TransactionProvider>
      <div className="flex flex-col space-y-6 p-6 overflow-hidden">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionsButton />
        </div>
        <TransactionForm />

        <ScrollArea className="h-full">
          <DataTable columns={transactionsColumns} data={transactions} />
        </ScrollArea>
      </div>
    </TransactionProvider>
  )
}

export default TransactionsPage
