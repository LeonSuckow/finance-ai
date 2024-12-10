import Navbar from '../_components/custom/navbar'
import { DataTable } from '../_components/ui/data-table'
import { db } from '../_lib/prisma'

import { getUserLogged } from '../_actions/auth'
import { ScrollArea } from '../_components/ui/scroll-area'
import { transactionsColumns } from './_columns'
import AddTransactions from './_components/add-transaction'

const TransactionsPage = async () => {
  const userId = getUserLogged()
  const transactions = await db.transaction.findMany({
    where: { userId },
  })
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 p-6 overflow-hidden">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactions />
          {/* <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUpIcon className="font-bold" />
        </Button> */}
        </div>

        <ScrollArea className="h-full">
          <DataTable columns={transactionsColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  )
}

export default TransactionsPage
