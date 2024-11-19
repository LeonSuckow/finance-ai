import { Button } from '@/app/_components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { TRANSACTION_PAYMENT_METHOD_ICONS } from '@/app/_constants/transactions'
import utils from '@/app/_utils'
import { Transaction, TransactionType } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface LastTransactionsProps {
  lastTransactions: Transaction[]
}

const getAmountColor = (transaction: Transaction) => {
  if (transaction.type === TransactionType.EXPENSE) {
    return 'text-red-500'
  }
  if (transaction.type === TransactionType.DEPOSIT) {
    return 'text-primary'
  }
  return 'text-white'
}

const getAmountPrefix = (transaction: Transaction) => {
  if (
    transaction.type === TransactionType.DEPOSIT ||
    transaction.type === TransactionType.INVESTMENT
  ) {
    return '+ '
  }
  return '- '
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  height={20}
                  width={20}
                  alt="PIX"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {utils.format.formatDateShort(transaction.date)}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {utils.format.formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}

export default LastTransactions
