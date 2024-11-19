import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import SummaryCard from './summary-card'

interface SummaryCards {
  month: string
  balance: number
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
  userCanAddTransaction?: boolean
}

const CardsGruped = ({ ...props }: SummaryCards) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={props.balance}
        size="large"
        userCanAddTransaction={props.userCanAddTransaction}
        hasAddTransactionButton={true}
      />
      <div className="grid grid-cols-3  gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={props.investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={props.depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={props.expensesTotal}
        />
      </div>
    </div>
  )
}

export default CardsGruped
