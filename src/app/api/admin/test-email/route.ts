import { NextRequest, NextResponse } from 'next/server'
import { sendPasswordResetEmail } from '@/lib/email'
import { requireStrictAdmin } from '@/lib/auth'

/**
 * Test email endpoint - Admin only
 * Useful for testing email configuration without triggering password reset flow
 */
export async function POST(request: NextRequest) {
  try {
    // Only admin can access this endpoint
    await requireStrictAdmin()

    const body = await request.json()
    const { email, type = 'password-reset' } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Generate test token
    const testToken = 'test-token-for-demo-purposes-only'

    switch (type) {
      case 'password-reset':
        await sendPasswordResetEmail(email, testToken)
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid email type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      message: `Test ${type} email sent successfully to ${email}`,
      note: 'This was a test email with a demo token - not a real password reset',
    })
  } catch (error) {
    console.error('Test email error:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
