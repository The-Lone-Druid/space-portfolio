import { NextRequest } from 'next/server'

interface RateLimitConfig {
  maxAttempts: number
  windowMs: number
  keyGenerator?: (request: NextRequest) => string
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store for rate limiting (for development)
// In production, use Redis or external cache
const rateLimitStore = new Map<string, RateLimitEntry>()

/**
 * Rate limiting utility for API routes
 * Uses in-memory storage for development
 */
export class RateLimit {
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  /**
   * Check if request should be rate limited
   * @param request - NextRequest object
   * @returns { success: boolean, limit: number, remaining: number, reset: number }
   */
  async check(request: NextRequest): Promise<{
    success: boolean
    limit: number
    remaining: number
    reset: number
    retryAfter?: number
  }> {
    const key = this.config.keyGenerator
      ? this.config.keyGenerator(request)
      : this.getDefaultKey(request)

    const now = Date.now()
    const windowStart = now - this.config.windowMs

    // Clean up old entries
    this.cleanupExpiredEntries(windowStart)

    // Get or create entry
    let entry = rateLimitStore.get(key)

    if (!entry || entry.resetTime <= windowStart) {
      // Create new window
      entry = {
        count: 0,
        resetTime: now + this.config.windowMs,
      }
    }

    // Check if limit exceeded
    if (entry.count >= this.config.maxAttempts) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
      return {
        success: false,
        limit: this.config.maxAttempts,
        remaining: 0,
        reset: entry.resetTime,
        retryAfter,
      }
    }

    // Increment counter
    entry.count++
    rateLimitStore.set(key, entry)

    return {
      success: true,
      limit: this.config.maxAttempts,
      remaining: this.config.maxAttempts - entry.count,
      reset: entry.resetTime,
    }
  }

  /**
   * Get default key for rate limiting (IP + endpoint)
   */
  private getDefaultKey(request: NextRequest): string {
    const ip = this.getClientIP(request)
    const endpoint = new URL(request.url).pathname
    return `${ip}:${endpoint}`
  }

  /**
   * Extract client IP from request
   */
  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const cfConnecting = request.headers.get('cf-connecting-ip')

    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }

    if (realIP) {
      return realIP
    }

    if (cfConnecting) {
      return cfConnecting
    }

    // Fallback for development
    return '127.0.0.1'
  }

  /**
   * Clean up expired rate limit entries
   */
  private cleanupExpiredEntries(windowStart: number): void {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime <= windowStart) {
        rateLimitStore.delete(key)
      }
    }
  }
}

/**
 * Pre-configured rate limiters for common use cases
 */

// Login attempts: 5 attempts per 15 minutes
export const loginRateLimit = new RateLimit({
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  keyGenerator: request => {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'
    return `login:${ip}`
  },
})

// Password reset request: 3 attempts per hour (for requesting reset emails)
export const passwordResetRequestRateLimit = new RateLimit({
  maxAttempts: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
  keyGenerator: request => {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'
    return `password-reset-request:${ip}`
  },
})

// Password reset completion: 5 attempts per hour (for actual password changes)
export const passwordResetCompletionRateLimit = new RateLimit({
  maxAttempts: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
  keyGenerator: request => {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'
    return `password-reset-completion:${ip}`
  },
})

// Token validation: 10 attempts per hour (for validating tokens)
export const tokenValidationRateLimit = new RateLimit({
  maxAttempts: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
  keyGenerator: request => {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'
    return `token-validation:${ip}`
  },
})

// Legacy rate limit - kept for backward compatibility
export const passwordResetRateLimit = passwordResetRequestRateLimit

// Change password: 10 attempts per hour (higher since it requires current password)
export const changePasswordRateLimit = new RateLimit({
  maxAttempts: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
  keyGenerator: request => {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'
    return `change-password:${ip}`
  },
})

// General API: 100 requests per minute
export const generalApiRateLimit = new RateLimit({
  maxAttempts: 100,
  windowMs: 60 * 1000, // 1 minute
})

/**
 * Helper function to apply rate limiting to API routes
 */
export async function applyRateLimit(
  request: NextRequest,
  rateLimit: RateLimit
): Promise<{
  success: boolean
  headers: Record<string, string>
  error?: string
}> {
  const result = await rateLimit.check(request)

  const headers: Record<string, string> = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  }

  if (!result.success && result.retryAfter) {
    headers['Retry-After'] = result.retryAfter.toString()
  }

  return {
    success: result.success,
    headers,
    error: result.success
      ? undefined
      : `Rate limit exceeded. Try again in ${result.retryAfter} seconds.`,
  }
}

/**
 * Audit logging for failed attempts
 */
export class AuditLogger {
  static async logFailedLogin(
    ip: string,
    email?: string,
    reason?: string
  ): Promise<void> {
    const timestamp = new Date().toISOString()
    console.warn(`[AUDIT] Failed login attempt`, {
      timestamp,
      ip,
      email: email || 'unknown',
      reason: reason || 'invalid_credentials',
      type: 'failed_login',
    })

    // In production, store this in database
    // await prisma.auditLog.create({
    //   data: {
    //     type: 'failed_login',
    //     ip,
    //     email,
    //     reason,
    //     timestamp: new Date()
    //   }
    // })
  }

  static async logPasswordChange(userId: string, ip: string): Promise<void> {
    const timestamp = new Date().toISOString()
    console.warn(`[AUDIT] Password changed`, {
      timestamp,
      userId,
      ip,
      type: 'password_change',
    })
  }

  static async logPasswordReset(email: string, ip: string): Promise<void> {
    const timestamp = new Date().toISOString()
    console.warn(`[AUDIT] Password reset requested`, {
      timestamp,
      email,
      ip,
      type: 'password_reset',
    })
  }
}
