'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertTriangle, ArrowLeft, Home, Shield } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const errorMessages = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'You do not have permission to access this resource.',
  Verification: 'The verification token is invalid or has expired.',
  Default: 'An authentication error occurred.',
} as const

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') as keyof typeof errorMessages
  const errorMessage = errorMessages[error] || errorMessages.Default

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
            <div className='flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-500/20'>
              <AlertTriangle className='h-8 w-8 text-red-400' />
            </div>
          </div>
          <div>
            <h1 className='mb-2 text-3xl font-bold text-white'>
              Access Denied
            </h1>
            <p className='text-white/70'>Authentication failed</p>
          </div>
        </div>

        {/* Error Card */}
        <Card className='glass-nebula border-red-500/30 shadow-2xl'>
          <CardHeader className='space-y-1'>
            <CardTitle className='flex items-center justify-center gap-2 text-center text-xl text-white'>
              <Shield className='h-5 w-5 text-red-400' />
              Authentication Error
            </CardTitle>
            <CardDescription className='text-center text-white/70'>
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* Error Details */}
            <div className='rounded-lg border border-red-500/20 bg-red-500/10 p-4'>
              <div className='flex items-start space-x-3'>
                <AlertTriangle className='mt-0.5 h-5 w-5 flex-shrink-0 text-red-400' />
                <div className='text-sm text-white/90'>
                  <p className='mb-1 font-medium'>What happened?</p>
                  <p className='text-white/70'>
                    {error === 'AccessDenied' &&
                      'Your account does not have the required permissions to access the dashboard.'}
                    {error === 'Configuration' &&
                      'There is an issue with the authentication service configuration.'}
                    {error === 'Verification' &&
                      'The verification link is invalid or has expired.'}
                    {!error && 'An unexpected authentication error occurred.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-3'>
              <Button
                asChild
                className='bg-gradient-stellar hover:bg-gradient-cosmic-gold w-full text-white'
              >
                <Link href='/auth/signin'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Try Again
                </Link>
              </Button>

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
              <p className='mb-2 text-sm text-white/60'>
                Still having trouble?
              </p>
              <p className='text-xs text-white/50'>
                Contact the administrator if you believe this is an error.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
