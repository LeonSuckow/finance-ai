import { getUserLogged } from '@/app/_actions/auth'
import { canUserAddTransaction } from '@/app/_data/can-user-add-transaction'
import { getDashboard } from '@/app/_data/get-dashboard'
import { clerkClient } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'

interface HomeProps {
  searchParams: {
    month: string
  }
}

interface HomeData {
  dashboard: Awaited<ReturnType<typeof getDashboard>>
  userCanAddTransaction: Awaited<ReturnType<typeof canUserAddTransaction>>
  clerkUser: Awaited<ReturnType<typeof clerkClient.users.getUser>>
  month: string
}

export async function getHomeData({
  searchParams,
}: HomeProps): Promise<HomeData> {
  const userId = getUserLogged()

  if (!searchParams.month || !isMatch(searchParams.month, 'MM')) {
    const actualMonth = new Date().getMonth() + 1
    redirect(`/?month=${actualMonth}`)
  }

  const [dashboard, userCanAddTransaction, clerkUser] = await Promise.all([
    getDashboard(searchParams.month),
    canUserAddTransaction(),
    clerkClient.users.getUser(userId),
  ])

  return {
    dashboard,
    userCanAddTransaction,
    clerkUser,
    month: searchParams.month,
  }
}
