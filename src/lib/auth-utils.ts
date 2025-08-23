import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export interface AuthUser {
  id: string
  email: string
  name?: string | null
  role: string
}

export class AuthError extends Error {
  constructor(
    message: string,
    public status: number = 401,
    public code: string = 'UNAUTHORIZED'
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function requireAuth() {
  const session = await getSession()

  if (!session?.user) {
    redirect('/auth/signin')
  }

  return session.user
}

export async function requireAdmin() {
  const user = await requireAuth()

  if (user.role !== 'ADMIN' && user.role !== 'EDITOR') {
    redirect('/auth/unauthorized')
  }

  return user
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
 * Helper to handle auth errors in API routes
 */
export function handleAuthError(error: unknown) {
  if (error instanceof AuthError) {
    return Response.json(
      { error: error.message, code: error.code },
      { status: error.status }
    )
  }

  console.error('Auth validation error:', error)
  return Response.json(
    { error: 'Internal server error', code: 'INTERNAL_ERROR' },
    { status: 500 }
  )
}

/**
 * Wrapper for API routes that require authentication
 */
export function withAuth<T extends unknown[]>(
  handler: (user: AuthUser, ...args: T) => Promise<Response>,
  options: { requireAdmin?: boolean; requireEditor?: boolean } = {}
) {
  return async (...args: T): Promise<Response> => {
    try {
      let user: AuthUser

      if (options.requireAdmin) {
        user = await validateAdmin()
      } else if (options.requireEditor) {
        user = await validateEditor()
      } else {
        user = await validateAuth()
      }

      return await handler(user, ...args)
    } catch (error) {
      return handleAuthError(error)
    }
  }
}
