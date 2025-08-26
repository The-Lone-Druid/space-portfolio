'use client'

import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface DashboardGuardProps {
  children: React.ReactNode
}

/**
 * Dashboard Guard Component
 * Protects dashboard routes by checking authentication and role permissions
 * Redirects unauthenticated users to signin page
 * Redirects users without proper roles to unauthorized page
 */
export function DashboardGuard({ children }: DashboardGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth/signin?callbackUrl=/dashboard')
      return
    }

    // Check if user has required role (ADMIN or EDITOR)
    if (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR') {
      router.push('/auth/unauthorized')
      return
    }
  }, [session, status, router])

  // Show loading screen while checking authentication
  if (status === 'loading') {
    return (
      <div className='bg-gradient-cosmic flex min-h-screen items-center justify-center'>
        <div className='space-y-4 text-center'>
          <LoadingSpinner
            variant='orbit'
            size='xl'
            message='Verifying authentication...'
          />
          <div>
            <h2 className='mb-2 text-2xl font-semibold text-white'>
              Loading Dashboard
            </h2>
            <p className='text-lg text-white/70'>
              Preparing your space control center
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Return null if redirecting (handled in useEffect)
  if (
    !session ||
    (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')
  ) {
    return null
  }

  // Render children if authenticated and authorized
  return <>{children}</>
}
