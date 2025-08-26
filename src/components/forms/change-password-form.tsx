'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Lock, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from '@/lib/validations'
import { useAuthActions } from '@/hooks/use-auth-actions'

export function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { changePassword, isLoading } = useAuthActions()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = async (data: ChangePasswordFormData) => {
    const result = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    })

    if (result.success) {
      reset() // Clear form
    }
  }

  return (
    <Card className='glass-cosmic border-white/10'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-white'>
          <Lock className='h-5 w-5 text-cyan-400' />
          Change Password
        </CardTitle>
        <CardDescription className='text-gray-400'>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Current Password */}
          <div className='space-y-2'>
            <Label htmlFor='currentPassword' className='text-white/90'>
              Current Password
            </Label>
            <div className='relative'>
              <Lock className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
              <Input
                id='currentPassword'
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder='Enter your current password'
                className='bg-space-cosmic/50 border-white/10 pr-10 pl-10 text-white'
                {...register('currentPassword')}
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className='h-4 w-4 text-white/60' />
                ) : (
                  <Eye className='h-4 w-4 text-white/60' />
                )}
              </Button>
            </div>
            {errors.currentPassword && (
              <p className='text-destructive text-sm'>
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className='space-y-2'>
            <Label htmlFor='newPassword' className='text-white/90'>
              New Password
            </Label>
            <div className='relative'>
              <Lock className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
              <Input
                id='newPassword'
                type={showNewPassword ? 'text' : 'password'}
                placeholder='Enter your new password'
                className='bg-space-cosmic/50 border-white/10 pr-10 pl-10 text-white'
                {...register('newPassword')}
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className='h-4 w-4 text-white/60' />
                ) : (
                  <Eye className='h-4 w-4 text-white/60' />
                )}
              </Button>
            </div>
            {errors.newPassword && (
              <p className='text-destructive text-sm'>
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword' className='text-white/90'>
              Confirm New Password
            </Label>
            <div className='relative'>
              <Lock className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm your new password'
                className='bg-space-cosmic/50 border-white/10 pr-10 pl-10 text-white'
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
                  <EyeOff className='h-4 w-4 text-white/60' />
                ) : (
                  <Eye className='h-4 w-4 text-white/60' />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className='text-destructive text-sm'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div className='rounded-lg border border-white/10 bg-white/5 p-3'>
            <p className='mb-2 text-sm font-medium text-white/90'>
              Password Requirements:
            </p>
            <ul className='space-y-1 text-xs text-white/70'>
              <li>• At least 8 characters long</li>
              <li>• Contains at least one lowercase letter</li>
              <li>• Contains at least one uppercase letter</li>
              <li>• Contains at least one number</li>
            </ul>
          </div>

          <Button
            type='submit'
            className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Changing Password...
              </>
            ) : (
              'Change Password'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
