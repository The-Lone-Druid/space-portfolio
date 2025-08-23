'use client'

import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface DashboardAuthProviderProps {
  children: React.ReactNode
}

export function DashboardAuthProvider({
  children,
}: DashboardAuthProviderProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth/signin?callbackUrl=/dashboard')
      return
    }

    // Check if user has required role
    if (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR') {
      router.push('/auth/unauthorized')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className='bg-gradient-cosmic flex min-h-screen items-center justify-center'>
        <div className='space-y-4 text-center'>
          <div className='flex items-center justify-center'>
            <LoadingSpinner className='text-space-gold h-8 w-8' />
          </div>
          <div>
            <h2 className='text-xl font-semibold text-white'>
              Loading Dashboard
            </h2>
            <p className='text-white/70'>Verifying authentication...</p>
          </div>
        </div>
      </div>
    )
  }

  if (
    !session ||
    (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')
  ) {
    return null // Redirect is handled in useEffect
  }

  return <>{children}</>
}
