import { getUserLogged } from '@/app/_actions/auth'
import { db } from '@/app/_lib/prisma'

export const getTransactionData = async () => {
  const user = await getUserLogged()
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
  })

  return { transactions }
}
