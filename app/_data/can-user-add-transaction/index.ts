import { getUserLogged } from '@/app/_actions/auth'
import { getCurrentMonthTransactions } from '../get-current-month-transactions'

const MAX_TRANSACTIONS_PER_MONTH = 10
export const canUserAddTransaction = async () => {
  const user = await getUserLogged()

  if (user?.publicMetadata.subscriptionPlan === 'premium') {
    return true
  }

  const currentMonthTransaction = await getCurrentMonthTransactions()

  if (currentMonthTransaction >= MAX_TRANSACTIONS_PER_MONTH) {
    return false
  }
  return true
}
