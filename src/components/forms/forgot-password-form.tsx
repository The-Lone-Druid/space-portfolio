'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        toast.success('Password reset email sent!', {
          description: result.message,
        })
      } else {
        toast.error('Failed to send reset email', {
          description: result.error || 'Please try again',
        })
        setError(result.error || 'An error occurred')
      }
    } catch {
      const errorMessage = 'Failed to send reset email. Please try again.'
      toast.error('An error occurred', {
        description: errorMessage,
      })
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='space-y-2 text-center'>
          <div className='flex justify-center'>
            <CheckCircle className='h-16 w-16 text-green-500' />
          </div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Check Your Email
          </h1>
          <p className='text-muted-foreground'>
            We&apos;ve sent a password reset link to{' '}
            <span className='font-medium'>{getValues('email')}</span>
          </p>
        </div>

        <div className='space-y-4'>
          <div className='rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950'>
            <div className='space-y-2'>
              <h3 className='font-medium text-green-800 dark:text-green-200'>
                What&apos;s next?
              </h3>
              <ul className='space-y-1 text-sm text-green-700 dark:text-green-300'>
                <li>• Check your email inbox and spam folder</li>
                <li>• Click the reset link within 1 hour</li>
                <li>• Create a new secure password</li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <Button asChild variant='outline'>
              <Link href='/auth/signin'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Forgot Password</h1>
        <p className='text-muted-foreground'>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email Address</Label>
          <div className='relative'>
            <Mail className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              className='pl-10'
              {...register('email')}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className='text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>

        {error && (
          <div className='rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950'>
            <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
          </div>
        )}

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? (
            <>
              <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
              Sending Reset Link...
            </>
          ) : (
            <>
              <Mail className='mr-2 h-4 w-4' />
              Send Reset Link
            </>
          )}
        </Button>

        <div className='text-center'>
          <Link
            href='/auth/signin'
            className='text-muted-foreground hover:text-foreground text-sm underline'
          >
            <ArrowLeft className='mr-1 inline h-3 w-3' />
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  )
}
