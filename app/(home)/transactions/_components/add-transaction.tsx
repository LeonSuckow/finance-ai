'use client'

import { Button } from '@/app/_components/ui/button'
import { useTransactionContext } from '../_context/trasaction-context'

export const AddTransactionsButton = () => {
  const { handleOpenTransactionDialog } = useTransactionContext()

  return (
    <>
      <Button onClick={() => handleOpenTransactionDialog('create')}>
        Adicionar transação
      </Button>
    </>
  )
}
