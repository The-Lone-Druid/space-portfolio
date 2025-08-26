import { adminApiRoute } from '@/lib/auth-utils'
import { AccountLockoutService } from '@/services/account-lockout-service'
import { AuditService } from '@/services/audit-service'
import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'
import { z } from 'zod'

const unlockAccountSchema = z.object({
  email: z.string().email('Valid email is required'),
})

export const POST = adminApiRoute(
  async (
    request: NextRequest,
    context: { user: { id: string; email: string; role: string } }
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

      // Log the admin unlock action
      await AuditService.logAdminUnlock({
        adminUserId: context.user.id,
        targetEmail: email,
        ipAddress:
          request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
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
