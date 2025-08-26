'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinnerInline } from '@/components/ui/loading-spinner'
import {
  AlertCircle,
  Eye,
  EyeOff,
  Rocket,
  Shield,
  CheckCircle,
} from 'lucide-react'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface SigninFormProps {
  callbackUrl?: string
}

export function SigninForm({ callbackUrl = '/dashboard' }: SigninFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession()
      if (session) {
        router.push('/dashboard')
      }
    }
    checkAuth()
  }, [router])

  // Handle success messages from URL parameters
  useEffect(() => {
    const message = searchParams.get('message')
    if (message === 'password-reset-success') {
      setSuccessMessage(
        'Password reset successfully! You can now sign in with your new password.'
      )
      // Clear the URL parameter
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('message')
      window.history.replaceState({}, '', newUrl.pathname + newUrl.search)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password. Please try again.')
      } else {
        // Successful sign in
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='relative z-10 w-full max-w-md space-y-6'>
      {/* Header */}
      <div className='space-y-4 text-center'>
        <div className='flex justify-center'>
          <div className='bg-gradient-stellar animate-pulse-cosmic flex h-16 w-16 items-center justify-center rounded-full'>
            <Rocket className='text-space-gold h-8 w-8' />
          </div>
        </div>
        <div>
          <h1 className='mb-2 text-3xl font-bold text-white'>Welcome Back</h1>
          <p className='text-white/70'>
            Sign in to access your space dashboard
          </p>
        </div>
      </div>

      {/* Sign In Card */}
      <Card className='glass-nebula border-space-accent/30 shadow-2xl'>
        <CardHeader className='space-y-1'>
          <CardTitle className='flex items-center justify-center gap-2 text-center text-2xl text-white'>
            <Shield className='text-space-gold h-5 w-5' />
            Admin Access
          </CardTitle>
          <CardDescription className='text-center text-white/70'>
            Enter your credentials to access the control panel
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Email Field */}
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-white/90'>
                Email Address
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='admin@zahidshaikh.space'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className='bg-space-cosmic/50 border-space-accent/30 focus:border-space-accent focus:ring-space-accent/50 text-white placeholder:text-white/50'
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-white/90'>
                Password
              </Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className='bg-space-cosmic/50 border-space-accent/30 focus:border-space-accent focus:ring-space-accent/50 pr-10 text-white placeholder:text-white/50'
                  disabled={isLoading}
                />
                <Button
                  type='button'
                  variant='link'
                  size='sm'
                  className='absolute top-0 right-0 h-full px-3 py-2'
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                  <span className='sr-only'>
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className='flex justify-end'>
              <Link
                href='/auth/forgot-password'
                className='text-space-gold hover:text-space-gold/80 text-sm font-medium transition-colors'
              >
                Forgot your password?
              </Link>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className='flex items-center space-x-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400'>
                <CheckCircle className='h-4 w-4 flex-shrink-0' />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className='flex items-center space-x-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400'>
                <AlertCircle className='h-4 w-4 flex-shrink-0' />
                <span>{error}</span>
              </div>
            )}

            {/* Sign In Button */}
            <Button
              type='submit'
              variant='cosmic'
              className='w-full'
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <div className='flex items-center space-x-2'>
                  <LoadingSpinnerInline />
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className='flex items-center space-x-2'>
                  <Shield className='h-4 w-4' />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>

          {/* Additional Links */}
          <div className='space-y-2 border-t border-white/10 pt-4 text-center'>
            <p className='text-sm text-white/60'>
              Need access? Contact the administrator
            </p>
            <Link
              href='/'
              className='text-space-gold hover:text-space-gold/80 text-sm font-medium transition-colors'
            >
              ← Back to Portfolio
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className='glass-cosmic border-space-accent/20'>
        <CardContent className='pt-6'>
          <div className='flex items-start space-x-3'>
            <Shield className='text-space-gold mt-0.5 h-5 w-5 flex-shrink-0' />
            <div className='text-sm text-white/70'>
              <p className='mb-1 font-medium text-white/90'>Secure Access</p>
              <p>
                This area is protected and requires administrator credentials.
                All access attempts are logged and monitored.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
