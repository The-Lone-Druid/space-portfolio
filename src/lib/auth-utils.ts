import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { AuthUser, AuthError, AuthOptions } from '../types/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function getSession() {
  return await getServerSession(authOptions)
}

/**
 * Validate authentication for API routes
 * Throws AuthError if not authenticated
 */
export async function validateAuth(): Promise<AuthUser> {
  const session = await getSession()

  if (!session || !session.user || !session.user.email) {
    throw new AuthError('Authentication required', 401, 'UNAUTHORIZED')
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
  }
}

/**
 * Validate admin role for API routes
 */
export async function validateAdmin(): Promise<AuthUser> {
  const user = await validateAuth()

  if (user.role !== 'ADMIN') {
    throw new AuthError('Admin access required', 403, 'FORBIDDEN')
  }

  return user
}

/**
 * Validate editor or admin role for API routes
 */
export async function validateEditor(): Promise<AuthUser> {
  const user = await validateAuth()

  if (user.role !== 'ADMIN' && user.role !== 'EDITOR') {
    throw new AuthError('Editor access required', 403, 'FORBIDDEN')
  }

  return user
}

/**
 * Higher-order function to wrap API route handlers with authentication
 * @param handler - The API route handler function
 * @param options - Authentication options
 */
export function withApiAuth<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  options: AuthOptions = { level: 'user' }
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      // Apply authentication based on level
      switch (options.level) {
        case 'admin':
          await validateAdmin()
          break
        case 'editor':
          await validateEditor()
          break
        case 'user':
          await validateAuth()
          break
        case 'none':
          // No authentication required
          break
        default:
          throw new AuthError(
            'Invalid authentication level',
            500,
            'INTERNAL_ERROR'
          )
      }

      // Call the original handler
      return await handler(request, ...args)
    } catch (error) {
      console.error('API Auth error:', error)

      if (error instanceof AuthError) {
        return NextResponse.json(
          { success: false, error: error.message, code: error.code },
          { status: error.status }
        )
      }

      if (
        error instanceof Error &&
        (error.message === 'Authentication required' ||
          error.message === 'Admin access required' ||
          error.message === 'Editor access required')
      ) {
        const status = error.message === 'Authentication required' ? 401 : 403
        return NextResponse.json(
          { success: false, error: error.message },
          { status }
        )
      }

      // Re-throw non-auth errors to be handled by the original handler
      throw error
    }
  }
}

/**
 * Wrapper for GET routes that don't require authentication
 */
export function publicApiRoute<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return withApiAuth(handler, { level: 'none' })
}

/**
 * Wrapper for routes that require any authenticated user
 */
export function protectedApiRoute<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return withApiAuth(handler, { level: 'user' })
}

/**
 * Wrapper for routes that require editor or admin role
 */
export function editorApiRoute<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return withApiAuth(handler, { level: 'editor' })
}

/**
 * Wrapper for routes that require admin role only
 */
export function adminApiRoute<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return withApiAuth(handler, { level: 'admin' })
}
