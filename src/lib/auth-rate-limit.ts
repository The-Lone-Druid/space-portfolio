import { NextRequest, NextResponse } from 'next/server'
import { loginRateLimit, applyRateLimit, AuditLogger } from '@/lib/rate-limit'

/**
 * Rate limiting middleware for authentication endpoints
 */
export async function withAuthRateLimit(request: NextRequest): Promise<{
  allowed: boolean
  response?: NextResponse
  headers: Record<string, string>
}> {
  const rateLimitResult = await applyRateLimit(request, loginRateLimit)

  if (!rateLimitResult.success) {
    // Log rate limit violation
    const clientIP =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    await AuditLogger.logFailedLogin(clientIP, 'unknown', 'rate_limit_exceeded')

    return {
      allowed: false,
      response: NextResponse.json(
        {
          success: false,
          error:
            rateLimitResult.error ||
            'Too many authentication attempts. Please try again later.',
        },
        {
          status: 429,
          headers: rateLimitResult.headers,
        }
      ),
      headers: rateLimitResult.headers,
    }
  }

  return {
    allowed: true,
    headers: rateLimitResult.headers,
  }
}

/**
 * Enhanced error handler with audit logging for auth endpoints
 */
export async function handleAuthError(
  error: Error,
  clientIP: string,
  endpoint: string,
  userEmail?: string
): Promise<void> {
  console.error(`Auth error in ${endpoint}:`, error)

  // Log the error for security monitoring
  console.warn(
    `Security event logged: ${endpoint} error for ${userEmail || 'unknown'} from ${clientIP}`
  )
}
