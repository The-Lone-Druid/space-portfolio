import { sendPasswordResetEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createPasswordResetToken } from '../../../../services/password-reset-service'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Always return success to prevent email enumeration attacks
    // But only send email if user actually exists
    if (user) {
      try {
        const resetToken = await createPasswordResetToken(email.toLowerCase())
        await sendPasswordResetEmail(email.toLowerCase(), resetToken)
      } catch (error) {
        console.error('Failed to send password reset email:', error)
        // Don't reveal the error to the client
      }
    }

    return NextResponse.json({
      success: true,
      message:
        'If an account with that email exists, we have sent a password reset link.',
    })
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
