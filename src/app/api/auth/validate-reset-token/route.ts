import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyPasswordResetToken } from '@/services/password-reset-service'
import { applyRateLimit, tokenValidationRateLimit } from '@/lib/rate-limit'

const validateTokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

/**
 * Validate password reset token
 * Used by the reset password form to check token validity on page load
 */
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting for token validation
    const rateLimitResult = await applyRateLimit(
      request,
      tokenValidationRateLimit
    )

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { valid: false, error: rateLimitResult.error },
        {
          status: 429,
          headers: rateLimitResult.headers,
        }
      )
    }

    const body = await request.json()
    const { token } = validateTokenSchema.parse(body)

    // Verify the reset token
    const email = await verifyPasswordResetToken(token)
    const isValid = !!email

    return NextResponse.json(
      {
        valid: isValid,
        message: isValid ? 'Token is valid' : 'Token is invalid or expired',
      },
      {
        headers: rateLimitResult.headers,
      }
    )
  } catch (error) {
    console.error('Token validation error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          valid: false,
          error: 'Invalid request format',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        valid: false,
        error: 'An error occurred while validating the token',
      },
      { status: 500 }
    )
  }
}
