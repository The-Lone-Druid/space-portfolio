'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Lock, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '@/lib/validations'
import { useAuthActions } from '@/hooks/use-auth-actions'

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { resetPassword, isLoading } = useAuthActions()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || '',
    },
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError('Reset token is missing. Please use the link from your email.')
      return
    }

    setError('')

    const result = await resetPassword({
      token,
      password: data.password,
    })

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/signin?message=password-reset-success')
      }, 2000)
    } else {
      setError(result.error || 'Failed to reset password. Please try again.')
    }
  }

  if (!token) {
    return (
      <Alert className='border-destructive/50 text-destructive'>
        <AlertDescription>
          Invalid or missing reset token. Please check your email and click the
          reset link again.
        </AlertDescription>
      </Alert>
    )
  }

  if (success) {
    return (
      <Alert className='border-green-500/50 text-green-600'>
        <AlertDescription>
          Password reset successfully! Redirecting to sign in page...
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {error && (
        <Alert className='border-destructive/50 text-destructive'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className='space-y-2'>
        <Label htmlFor='password'>New Password</Label>
        <div className='relative'>
          <Lock className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your new password'
            className='pr-10 pl-10'
            {...register('password')}
          />
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className='h-4 w-4' />
            ) : (
              <Eye className='h-4 w-4' />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className='text-destructive text-sm'>{errors.password.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='confirmPassword'>Confirm New Password</Label>
        <div className='relative'>
          <Lock className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
          <Input
            id='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm your new password'
            className='pr-10 pl-10'
            {...register('confirmPassword')}
          />
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className='h-4 w-4' />
            ) : (
              <Eye className='h-4 w-4' />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className='text-destructive text-sm'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Resetting Password...
          </>
        ) : (
          'Reset Password'
        )}
      </Button>
    </form>
  )
}
