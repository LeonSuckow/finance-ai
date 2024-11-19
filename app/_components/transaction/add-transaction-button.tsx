'use client'

import { ArrowDownUpIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    if (userCanAddTransaction) {
      router.push('/transactions')
    }
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={handleClick}
              disabled={!userCanAddTransaction}
            >
              Adicionar transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction && (
              <p>
                Você atingiu o limite de transações. Atualize seu plano para
                criar transações ilimitadas
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}

export default AddTransactionButton
