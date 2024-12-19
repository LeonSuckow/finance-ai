import { getUserLogged } from '@/app/_actions/auth'
import { db } from '@/app/_lib/prisma'

export const getCategoryPageData = async () => {
  const user = await getUserLogged()
  const categories = await db.category.findMany({
    where: { userId: user.id },
  })
  return {
    categories,
  }
}
