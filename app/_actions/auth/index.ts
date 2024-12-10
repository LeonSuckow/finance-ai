import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export function getUserLogged(): string {
  const { userId } = auth()

  if (!userId) {
    redirect('/login')
  }
  return userId
}

export function redirectUserLooged(to = '/') {
  const { userId } = auth()
  if (userId) {
    redirect(to)
  }
}
