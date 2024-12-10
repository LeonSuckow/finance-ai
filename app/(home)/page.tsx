import Navbar from '../_components/custom/navbar'
import { getHomeData } from './_actions/get-home-data'
import AiReportButton from './_components/ai-report-button'
import CardsGruped from './_components/cards-gruped'
import ExpensesPerCategory from './_components/expenses-per-category'
import LastTransactions from './_components/last-transactions'
import MonthSelect from './_components/time-select'
import TransactionsPieChart from './_components/transactions-pie-chart'

interface HomeProps {
  searchParams: {
    month: string
  }
}

const Home = async ({ searchParams }: HomeProps) => {
  const { dashboard, month, clerkUser, userCanAddTransaction } =
    await getHomeData({
      searchParams,
    })

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                clerkUser.publicMetadata.subscriptionPlan === 'premium'
              }
            />
            <MonthSelect />
          </div>
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <CardsGruped
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  )
}

export default Home
