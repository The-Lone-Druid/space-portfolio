import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function requireAuth() {
  const session = await getSession()

  if (!session?.user) {
    redirect('/auth/signin')
  }

  return session.user
}

export async function requireAdmin() {
  const user = await requireAuth()

  if (user.role !== 'ADMIN' && user.role !== 'EDITOR') {
    redirect('/auth/unauthorized')
  }

  return user
}
