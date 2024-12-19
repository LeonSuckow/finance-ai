import { getUserLogged } from '@/app/_actions/auth'
import { canUserAddTransaction } from '@/app/_data/can-user-add-transaction'
import { getDashboard } from '@/app/_data/get-dashboard'
import { User } from '@clerk/nextjs/server'
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
  clerkUser: User
  month: string
}

export async function getHomeData({
  searchParams,
}: HomeProps): Promise<HomeData> {
  const clerkUser = await getUserLogged()

  if (!searchParams.month || !isMatch(searchParams.month, 'MM')) {
    const actualMonth = new Date().getMonth() + 1
    redirect(`/?month=${actualMonth}`)
  }

  const [dashboard, userCanAddTransaction] = await Promise.all([
    getDashboard(searchParams.month),
    canUserAddTransaction(),
  ])

  return {
    dashboard,
    userCanAddTransaction,
    clerkUser,
    month: searchParams.month,
  }
}
