import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import {
  applyRateLimit,
  passwordResetCompletionRateLimit,
  tokenValidationRateLimit,
} from '@/lib/rate-limit'
import { AuditService } from '@/services/audit-service'
import {
  consumePasswordResetToken,
  verifyPasswordResetToken,
} from '@/services/password-reset-service'
import { publicApiRoute } from '@/lib/auth-utils'
import { resetPasswordApiSchema } from '@/lib/validations'
import type { ApiResponse } from '@/types'

export const POST = publicApiRoute(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<void>>> => {
    try {
      // Apply rate limiting for password reset completion
      const rateLimitResult = await applyRateLimit(
        request,
        passwordResetCompletionRateLimit
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

      // Parse and validate request body
      const body = await request.json()
      const { token, password } = resetPasswordApiSchema.parse(body)

      // Verify the reset token
      const email = await verifyPasswordResetToken(token)
      if (!email) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid or expired reset token',
          },
          {
            status: 400,
            headers: rateLimitResult.headers,
          }
        )
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Update user's password
      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      })

      // Mark the reset token as used
      await consumePasswordResetToken(token)

      // Log successful password reset
      const clientIP =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1'
      const userAgent = request.headers.get('user-agent') || undefined

      await AuditService.logPasswordResetComplete(email, clientIP, userAgent)
      console.warn(`Password successfully reset for email: ${email}`)

      return NextResponse.json(
        {
          success: true,
          message: 'Password reset successfully',
        },
        {
          headers: rateLimitResult.headers,
        }
      )
    } catch (error) {
      console.error('Reset password error:', error)

      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { success: false, error: 'Invalid input data' },
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

// GET route to verify if a reset token is valid
export const GET = publicApiRoute(
  async (
    request: NextRequest
  ): Promise<NextResponse<ApiResponse<{ valid: boolean; email?: string }>>> => {
    try {
      // Apply rate limiting for token validation
      const rateLimitResult = await applyRateLimit(
        request,
        tokenValidationRateLimit
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

      const { searchParams } = new URL(request.url)
      const token = searchParams.get('token')

      if (!token) {
        return NextResponse.json(
          {
            success: false,
            error: 'Reset token is required',
          },
          {
            status: 400,
            headers: rateLimitResult.headers,
          }
        )
      }

      // Verify the reset token
      const email = await verifyPasswordResetToken(token)

      return NextResponse.json(
        {
          success: true,
          data: {
            valid: !!email,
            email: email ? email.replace(/^(.{2}).*@/, '$1***@') : undefined, // Partially mask email
          },
        },
        {
          headers: rateLimitResult.headers,
        }
      )
    } catch (error) {
      console.error('Token verification error:', error)
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
)
