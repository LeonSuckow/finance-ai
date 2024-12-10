import { getUserLogged } from '@/app/_actions/auth'
import { db } from '@/app/_lib/prisma'
import { endOfMonth, startOfMonth } from 'date-fns'

export const getCurrentMonthTransactions = async () => {
  const userId = getUserLogged()

  return db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  })
}
