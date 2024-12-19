import { auth, currentUser, User } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function getUserLogged(): Promise<User> {
  const user = await currentUser()

  if (!user?.id) {
    redirect('/login')
  }
  return user
}

export function redirectUserLooged(to = '/') {
  const { userId } = auth()
  if (userId) {
    redirect(to)
  }
}
