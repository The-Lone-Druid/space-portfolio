'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

interface UseAuthOptions {
  required?: boolean
  requiredRole?: 'ADMIN' | 'EDITOR' | string[]
  redirectTo?: string
}

/**
 * Hook for authentication state management and role-based access control
 * Handles session state, role checks, and automatic route protection
 */
export function useAuth(options: UseAuthOptions = {}) {
  const {
    required = false,
    requiredRole,
    redirectTo = '/auth/signin',
  } = options
  const { data: session, status } = useSession()
  const router = useRouter()

  const isAuthenticated = !!session
  const isLoading = status === 'loading'

  const hasRequiredRole = useCallback(() => {
    if (!session?.user?.role) return false

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(session.user.role)
    }

    if (requiredRole) {
      return session.user.role === requiredRole
    }

    return true
  }, [session?.user?.role, requiredRole])

  const isAdmin = session?.user?.role === 'ADMIN'
  const isEditor = session?.user?.role === 'EDITOR'
  const canAccessDashboard = isAdmin || isEditor

  useEffect(() => {
    if (isLoading) return

    if (required && !isAuthenticated) {
      router.push(
        `${redirectTo}?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      )
      return
    }

    if (requiredRole && !hasRequiredRole()) {
      router.push('/auth/unauthorized')
      return
    }
  }, [
    isAuthenticated,
    isLoading,
    required,
    requiredRole,
    router,
    redirectTo,
    hasRequiredRole,
  ])

  return {
    user: session?.user,
    session,
    isAuthenticated,
    isLoading,
    isAdmin,
    isEditor,
    canAccessDashboard,
    hasRequiredRole: hasRequiredRole(),
  }
}

export function useRequireAuth(options: Omit<UseAuthOptions, 'required'> = {}) {
  return useAuth({ ...options, required: true })
}

export function useAdminAuth() {
  return useAuth({ required: true, requiredRole: 'ADMIN' })
}

export function useDashboardAuth() {
  return useAuth({ required: true, requiredRole: ['ADMIN', 'EDITOR'] })
}
