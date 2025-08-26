import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  consumePasswordResetToken,
  verifyPasswordResetToken,
} from '../../../../services/password-reset-service'

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = resetPasswordSchema.parse(body)

    // Verify the reset token
    const email = await verifyPasswordResetToken(token)
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired reset token',
        },
        { status: 400 }
      )
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user's password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    // Mark the reset token as used
    await consumePasswordResetToken(token)

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
    })
  } catch (error) {
    console.error('Reset password error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while resetting your password',
      },
      { status: 500 }
    )
  }
}

// GET route to verify if a reset token is valid
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reset token is required',
        },
        { status: 400 }
      )
    }

    // Verify the reset token
    const email = await verifyPasswordResetToken(token)

    return NextResponse.json({
      success: true,
      valid: !!email,
      email: email ? email.replace(/^(.{2}).*@/, '$1***@') : null, // Partially mask email
    })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while verifying the token',
      },
      { status: 500 }
    )
  }
}
