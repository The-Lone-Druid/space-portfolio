'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Eye, EyeOff, Rocket } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (error) {
      console.error(error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4'>
      <div className='absolute inset-0 bg-[url("/stars.png")] opacity-20'></div>

      <Card className='relative w-full max-w-md border-purple-500/20 bg-slate-900/80 backdrop-blur-sm'>
        <CardHeader className='space-y-4 text-center'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-600'>
            <Rocket className='h-8 w-8 text-white' />
          </div>
          <CardTitle className='text-2xl font-bold text-white'>
            Space Portfolio Admin
          </CardTitle>
          <p className='text-purple-200'>
            Sign in to access the admin dashboard
          </p>
        </CardHeader>

        <CardContent className='space-y-4'>
          {error && (
            <div className='flex items-center gap-2 rounded-md bg-red-500/10 p-3 text-red-400'>
              <AlertCircle className='h-4 w-4' />
              <span className='text-sm'>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-purple-200'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='admin@spaceportfolio.com'
                className='border-purple-500/30 bg-slate-800 text-white placeholder-purple-300'
                {...register('email')}
              />
              {errors.email && (
                <p className='text-sm text-red-400'>{errors.email.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password' className='text-purple-200'>
                Password
              </Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='border-purple-500/30 bg-slate-800 pr-10 text-white placeholder-purple-300'
                  {...register('password')}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-purple-300 hover:text-purple-200'
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className='text-sm text-red-400'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type='submit'
              className='w-full bg-purple-600 hover:bg-purple-700'
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
