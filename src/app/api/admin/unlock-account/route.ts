import { adminApiRoute } from '@/lib/auth-utils'
import { authOptions } from '@/lib/auth'
import { AccountLockoutService } from '@/services/account-lockout-service'
import { AuditService } from '@/services/audit-service'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import type { ApiResponse } from '@/types'
import { z } from 'zod'

const unlockAccountSchema = z.object({
  email: z.string().email('Valid email is required'),
})

export const POST = adminApiRoute(
  async (
    request: NextRequest
  ): Promise<NextResponse<ApiResponse<{ email: string }>>> => {
    try {
      const body = await request.json()
      const { email } = unlockAccountSchema.parse(body)

      // Check if account is actually locked
      const lockoutStatus = await AccountLockoutService.getLockoutStatus(email)

      if (!lockoutStatus.isLocked) {
        return NextResponse.json(
          {
            success: false,
            error: 'Account is not currently locked',
          },
          { status: 400 }
        )
      }

      // Get current admin user for audit logging
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, error: 'Admin session not found' },
          { status: 401 }
        )
      }

      // Unlock the account
      const unlockResult = await AccountLockoutService.unlockAccount(email)

      if (!unlockResult) {
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to unlock account',
          },
          { status: 500 }
        )
      }

      // Log admin action
      await AuditService.log({
        action: 'admin_unlock',
        userId: session.user.id,
        email: email,
        details: { unlockedEmail: email, reason: 'Manual unlock by admin' },
      })

      return NextResponse.json({
        success: true,
        data: { email },
        message: `Account ${email} has been unlocked successfully`,
      })
    } catch (error) {
      console.error('Admin unlock account error:', error)

      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { success: false, error: 'Invalid email provided' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { success: false, error: 'Failed to unlock account' },
        { status: 500 }
      )
    }
  }
)
