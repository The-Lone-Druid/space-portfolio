import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Account, Session, User } from '@prisma/client'
import { getServerSession } from 'next-auth'

// Extended types for user profile with relations
export type UserWithAccountsAndSessions = User & {
  accounts: Account[]
  sessions: Session[]
}

export type UserProfile = {
  user: UserWithAccountsAndSessions
  accountsCount: number
  sessionsCount: number
  lastLogin: Date | null
}

// Server-side function to get current user profile
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        accounts: true,
        sessions: {
          orderBy: { expires: 'desc' },
          take: 10, // Limit to recent sessions
        },
      },
    })

    if (!user) {
      return null
    }

    // Get the most recent session for last login (use updatedAt from user)
    const lastLogin = user.updatedAt

    return {
      user,
      accountsCount: user.accounts.length,
      sessionsCount: user.sessions.length,
      lastLogin,
    }
  } catch (error) {
    console.warn('Error fetching user profile:', error)
    return null
  }
}

// Server-side function to get user accounts
export async function getUserAccounts(): Promise<Account[]> {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return []
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return []
    }

    return await prisma.account.findMany({
      where: { userId: user.id },
    })
  } catch (error) {
    console.warn('Error fetching user accounts:', error)
    return []
  }
}

// Server-side function to get user sessions
export async function getUserSessions(): Promise<Session[]> {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return []
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return []
    }

    return await prisma.session.findMany({
      where: { userId: user.id },
      orderBy: { expires: 'desc' },
      take: 20, // Limit to recent sessions
    })
  } catch (error) {
    console.warn('Error fetching user sessions:', error)
    return []
  }
}
