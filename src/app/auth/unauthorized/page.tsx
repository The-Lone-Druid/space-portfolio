'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Ban, Home, LogOut, Shield, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function UnauthorizedPage() {
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <div className='bg-gradient-cosmic flex min-h-screen items-center justify-center p-4'>
      {/* Background Stars Animation */}
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        <div className='animate-twinkle absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-white' />
        <div
          className='bg-space-gold animate-twinkle absolute top-1/3 right-1/4 h-1 w-1 rounded-full'
          style={{ animationDelay: '1s' }}
        />
        <div
          className='animate-twinkle absolute bottom-1/4 left-1/3 h-1.5 w-1.5 rounded-full bg-white'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='bg-space-gold animate-twinkle absolute top-1/2 right-1/3 h-1 w-1 rounded-full'
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className='animate-twinkle absolute right-1/5 bottom-1/3 h-2 w-2 rounded-full bg-white'
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      <div className='relative z-10 w-full max-w-md space-y-6'>
        {/* Header */}
        <div className='space-y-4 text-center'>
          <div className='flex justify-center'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/20'>
              <Ban className='h-8 w-8 text-orange-400' />
            </div>
          </div>
          <div>
            <h1 className='mb-2 text-3xl font-bold text-white'>
              Access Restricted
            </h1>
            <p className='text-white/70'>Insufficient permissions</p>
          </div>
        </div>

        {/* Unauthorized Card */}
        <Card className='glass-nebula border-orange-500/30 shadow-2xl'>
          <CardHeader className='space-y-1'>
            <CardTitle className='flex items-center justify-center gap-2 text-center text-xl text-white'>
              <Shield className='h-5 w-5 text-orange-400' />
              Unauthorized Access
            </CardTitle>
            <CardDescription className='text-center text-white/70'>
              You don&apos;t have permission to access this area
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* User Info */}
            {session?.user && (
              <div className='bg-space-cosmic/30 rounded-lg border border-white/10 p-4'>
                <div className='flex items-center space-x-3'>
                  <div className='bg-space-accent flex h-10 w-10 items-center justify-center rounded-full'>
                    <User className='h-5 w-5 text-white' />
                  </div>
                  <div>
                    <p className='font-medium text-white'>
                      {session.user.name || session.user.email}
                    </p>
                    <p className='text-sm text-white/60'>
                      Role: {session.user.role || 'USER'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className='rounded-lg border border-orange-500/20 bg-orange-500/10 p-4'>
              <div className='flex items-start space-x-3'>
                <Ban className='mt-0.5 h-5 w-5 flex-shrink-0 text-orange-400' />
                <div className='text-sm text-white/90'>
                  <p className='mb-1 font-medium'>Admin Access Required</p>
                  <p className='text-white/70'>
                    The dashboard requires administrator privileges. Your
                    current role does not have sufficient permissions to access
                    this area.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-3'>
              {session ? (
                <Button
                  onClick={handleSignOut}
                  className='bg-gradient-stellar hover:bg-gradient-cosmic-gold w-full text-white'
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  Sign Out
                </Button>
              ) : (
                <Button
                  asChild
                  className='bg-gradient-stellar hover:bg-gradient-cosmic-gold w-full text-white'
                >
                  <Link href='/auth/signin'>
                    <Shield className='mr-2 h-4 w-4' />
                    Sign In
                  </Link>
                </Button>
              )}

              <Button
                asChild
                variant='outline'
                className='border-space-accent/30 hover:bg-space-accent/20 hover:border-space-accent/50 w-full bg-transparent text-white'
              >
                <Link href='/'>
                  <Home className='mr-2 h-4 w-4' />
                  Back to Portfolio
                </Link>
              </Button>
            </div>

            {/* Help Text */}
            <div className='border-t border-white/10 pt-4 text-center'>
              <p className='mb-2 text-sm text-white/60'>Need admin access?</p>
              <p className='text-xs text-white/50'>
                Contact the site administrator to request elevated permissions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
