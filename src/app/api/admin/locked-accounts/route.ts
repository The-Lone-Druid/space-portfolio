import { adminApiRoute } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'

interface LockedAccount {
  email: string
  failedAttempts: number
  lockedUntil: Date | null
  lastAttempt: Date
  remainingTime?: number
}

export const GET = adminApiRoute(
  async (): Promise<NextResponse<ApiResponse<LockedAccount[]>>> => {
    try {
      const now = new Date()

      // Get all locked accounts
      const lockedAccounts = await prisma.accountLockout.findMany({
        where: {
          lockedUntil: {
            gt: now,
          },
        },
        orderBy: {
          lastAttempt: 'desc',
        },
      })

      // Transform to include remaining time
      const accountsWithTime: LockedAccount[] = lockedAccounts.map(lockout => {
        const remainingMs = lockout.lockedUntil
          ? lockout.lockedUntil.getTime() - now.getTime()
          : 0
        const remainingMinutes = Math.ceil(remainingMs / (1000 * 60))

        return {
          email: lockout.email,
          failedAttempts: lockout.failedAttempts,
          lockedUntil: lockout.lockedUntil,
          lastAttempt: lockout.lastAttempt,
          remainingTime: remainingMinutes > 0 ? remainingMinutes : 0,
        }
      })

      return NextResponse.json({
        success: true,
        data: accountsWithTime,
      })
    } catch (error) {
      console.error('Error fetching locked accounts:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch locked accounts' },
        { status: 500 }
      )
    }
  }
)
