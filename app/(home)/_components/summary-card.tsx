import IconAndTitle from '@/app/_components/custom/iconAndTitle'
import AddTransactionButton from '@/app/_components/transaction/add-transaction-button'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import utils from '@/app/_utils'
import { ReactNode } from 'react'

interface SummaryCardProps {
  icon: ReactNode
  title: string
  amount: number
  size?: 'small' | 'large'
  userCanAddTransaction?: boolean
  hasAddTransactionButton?: boolean
}
const SummaryCard = ({ size = 'small', ...props }: SummaryCardProps) => {
  const isLarge = size === 'large'
  const titleStyle = isLarge ? 'text-white opacity-70' : 'text-muted-foreground'
  const amountStyle = isLarge ? 'text-4xl' : 'text-2xl'

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4 pb-3">
        <IconAndTitle
          icon={props.icon}
          title={props.title}
          titleClass={titleStyle}
        />
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className={`font-bold ${amountStyle}`}>
          {utils.format.formatCurrency(props.amount)}
        </p>
        {props.hasAddTransactionButton && (
          <AddTransactionButton
            userCanAddTransaction={props.userCanAddTransaction}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default SummaryCard
