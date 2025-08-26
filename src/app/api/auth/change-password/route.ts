import { protectedApiRoute } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { changePasswordSchema } from '@/lib/validations'
import { applyRateLimit, changePasswordRateLimit } from '@/lib/rate-limit'
import { AuditService } from '@/services/audit-service'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import type { ApiResponse } from '@/types'

export const POST = protectedApiRoute(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<void>>> => {
    try {
      // Apply rate limiting
      const rateLimitResult = await applyRateLimit(
        request,
        changePasswordRateLimit
      )

      if (!rateLimitResult.success) {
        return NextResponse.json(
          { success: false, error: rateLimitResult.error },
          {
            status: 429,
            headers: rateLimitResult.headers,
          }
        )
      }

      // Get session (already validated by protectedApiRoute)
      const session = await getServerSession(authOptions)
      const userEmail = session!.user!.email!

      // Parse and validate request body
      const body = await request.json()
      const { currentPassword, newPassword } = changePasswordSchema.parse(body)

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true, email: true, password: true },
      })

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User account not found' },
          {
            status: 404,
            headers: rateLimitResult.headers,
          }
        )
      }

      if (!user.password) {
        return NextResponse.json(
          {
            success: false,
            error:
              'No password set for this account. Please contact administrator.',
          },
          {
            status: 400,
            headers: rateLimitResult.headers,
          }
        )
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      )

      if (!isCurrentPasswordValid) {
        // Log failed attempt
        const clientIP =
          request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
          request.headers.get('x-real-ip') ||
          '127.0.0.1'
        const userAgent = request.headers.get('user-agent') || undefined

        await AuditService.logLoginFailed(
          userEmail,
          'incorrect_current_password',
          clientIP,
          userAgent
        )

        return NextResponse.json(
          { success: false, error: 'Current password is incorrect' },
          {
            status: 400,
            headers: rateLimitResult.headers,
          }
        )
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12)

      // Update password in database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedNewPassword,
          updatedAt: new Date(),
        },
      })

      // Log successful password change
      const clientIP =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1'
      const userAgent = request.headers.get('user-agent') || undefined

      await AuditService.logPasswordChange(
        user.id,
        userEmail,
        clientIP,
        userAgent
      )

      return NextResponse.json(
        {
          success: true,
          message: 'Password changed successfully',
        },
        {
          headers: rateLimitResult.headers,
        }
      )
    } catch (error) {
      console.error('Change password error:', error)

      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid input data',
          },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
)
