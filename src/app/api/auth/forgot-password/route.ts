import { sendPasswordResetEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { applyRateLimit, passwordResetRequestRateLimit } from '@/lib/rate-limit'
import { AuditService } from '@/services/audit-service'
import { createPasswordResetToken } from '../../../../services/password-reset-service'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting for password reset requests
    const rateLimitResult = await applyRateLimit(
      request,
      passwordResetRequestRateLimit
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

    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    // Check if user exists - providing immediate feedback
    // Note: This approach prioritizes user experience over preventing email enumeration
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      console.warn(
        `Password reset requested for non-existent email: ${email.toLowerCase()}`
      )

      return NextResponse.json(
        {
          success: false,
          error:
            'No account found with this email address. Please check your email or sign up for a new account.',
        },
        {
          status: 404,
          headers: rateLimitResult.headers,
        }
      )
    }

    // User exists, proceed with password reset
    try {
      const resetToken = await createPasswordResetToken(email.toLowerCase())
      await sendPasswordResetEmail(email.toLowerCase(), resetToken)

      // Log successful password reset request
      const clientIP =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1'
      const userAgent = request.headers.get('user-agent') || undefined

      await AuditService.logPasswordResetRequest(
        email.toLowerCase(),
        clientIP,
        userAgent
      )
      console.warn(`Password reset email sent to: ${email.toLowerCase()}`)

      return NextResponse.json(
        {
          success: true,
          message:
            'Password reset email sent successfully. Please check your inbox and follow the instructions.',
        },
        {
          headers: rateLimitResult.headers,
        }
      )
    } catch (error) {
      console.error('Failed to send password reset email:', error)

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send password reset email. Please try again later.',
        },
        {
          status: 500,
          headers: rateLimitResult.headers,
        }
      )
    }
  } catch (error) {
    console.error('Forgot password error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while processing your request',
      },
      { status: 500 }
    )
  }
}
