import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { addHours } from 'date-fns'

interface ServiceResponse {
  success: boolean
  error?: string
  data?: { message?: string; [key: string]: unknown }
}

/**
 * Generate a secure password reset token
 */
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Create a password reset token for a user
 */
export async function createPasswordResetToken(email: string): Promise<string> {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Invalidate any existing tokens for this email
  await prisma.passwordResetToken.updateMany({
    where: {
      email: email.toLowerCase(),
      used: false,
      expires: { gt: new Date() },
    },
    data: { used: true },
  })

  // Generate new token
  const token = generateResetToken()
  const expires = addHours(new Date(), 1) // Token expires in 1 hour

  // Create reset token record
  await prisma.passwordResetToken.create({
    data: {
      email: email.toLowerCase(),
      token,
      expires,
    },
  })

  return token
}

/**
 * Verify and consume a password reset token
 */
export async function verifyPasswordResetToken(
  token: string
): Promise<string | null> {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  })

  if (!resetToken) {
    return null
  }

  // Check if token is expired or already used
  if (resetToken.used || resetToken.expires < new Date()) {
    return null
  }

  return resetToken.email
}

/**
 * Mark a password reset token as used
 */
export async function consumePasswordResetToken(token: string): Promise<void> {
  await prisma.passwordResetToken.update({
    where: { token },
    data: { used: true },
  })
}

/**
 * Clean up expired password reset tokens
 */
export async function cleanupExpiredResetTokens(): Promise<void> {
  await prisma.passwordResetToken.deleteMany({
    where: {
      OR: [{ expires: { lt: new Date() } }, { used: true }],
    },
  })
}

/**
 * Password Reset Service
 * Handles all password reset business logic
 */
export class PasswordResetService {
  /**
   * Initiate password reset process
   */
  static async requestPasswordReset(email: string): Promise<ServiceResponse> {
    try {
      const normalizedEmail = email.toLowerCase()

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      })

      // Only send email if user exists (prevent enumeration attacks)
      if (user) {
        const resetToken = await createPasswordResetToken(normalizedEmail)
        await sendPasswordResetEmail(normalizedEmail, resetToken)
      }

      // Always return success to prevent email enumeration
      return {
        success: true,
        data: {
          message:
            'If an account with that email exists, you will receive a password reset link.',
        },
      }
    } catch (error) {
      console.error('Password reset request error:', error)
      return {
        success: false,
        error: 'Failed to process password reset request. Please try again.',
      }
    }
  }

  /**
   * Verify if a reset token is valid
   */
  static async verifyResetToken(token: string): Promise<{
    valid: boolean
    email?: string
    maskedEmail?: string
  }> {
    const email = await verifyPasswordResetToken(token)

    if (!email) {
      return { valid: false }
    }

    return {
      valid: true,
      email,
      maskedEmail: this.maskEmail(email),
    }
  }

  /**
   * Reset password using token
   */
  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ServiceResponse> {
    try {
      // Verify the reset token
      const email = await verifyPasswordResetToken(token)
      if (!email) {
        return {
          success: false,
          error: 'Invalid or expired reset token',
        }
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 12)

      // Update user's password
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      })

      // Mark the reset token as used
      await consumePasswordResetToken(token)

      return {
        success: true,
        data: { message: 'Password reset successfully' },
      }
    } catch (error) {
      console.error('Password reset error:', error)
      return {
        success: false,
        error: 'Failed to reset password. Please try again.',
      }
    }
  }

  /**
   * Mask email for security (show only first 2 chars before @)
   */
  private static maskEmail(email: string): string {
    return email.replace(/^(.{2}).*@/, '$1***@')
  }
}
