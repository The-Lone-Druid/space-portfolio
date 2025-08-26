import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { changePasswordSchema } from '@/lib/validations'
import {
  applyRateLimit,
  changePasswordRateLimit,
  AuditLogger,
} from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
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

    // Check authentication
    const session = await getServerSession(authOptions)
    console.warn('Session data:', JSON.stringify(session, null, 2))

    if (!session?.user?.email) {
      console.error('No session or email found')
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        {
          status: 401,
          headers: rateLimitResult.headers,
        }
      )
    }

    console.warn('Looking up user with email:', session.user.email)

    // Parse and validate request body
    const body = await request.json()
    const validatedData = changePasswordSchema.parse(body)

    // Get user from database with detailed logging
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true, password: true },
    })

    console.warn(
      'Database query result:',
      user ? 'User found' : 'User not found'
    )
    if (user) {
      console.warn('User details:', {
        id: user.id,
        email: user.email,
        hasPassword: !!user.password,
      })
    }

    if (!user) {
      console.error('User not found for email:', session.user.email)

      // Let's also check if any users exist at all
      const userCount = await prisma.user.count()
      console.warn('Total users in database:', userCount)

      return NextResponse.json(
        { success: false, error: 'User account not found' },
        { status: 404 }
      )
    }

    if (!user.password) {
      console.error('User has no password set:', session.user.email)
      return NextResponse.json(
        {
          success: false,
          error:
            'No password set for this account. Please contact administrator.',
        },
        { status: 400 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    )

    if (!isCurrentPasswordValid) {
      // Log failed attempt
      const clientIP =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1'

      await AuditLogger.logFailedLogin(
        clientIP,
        session.user.email,
        'incorrect_current_password'
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
    const hashedNewPassword = await bcrypt.hash(validatedData.newPassword, 12)

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

    await AuditLogger.logPasswordChange(user.id, clientIP)

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

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input data',
          details: error.issues,
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
