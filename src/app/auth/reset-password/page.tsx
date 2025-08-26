import { Suspense } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthBackground } from '@/components/auth/auth-background'
import { ResetPasswordForm } from '@/components/forms/reset-password-form'

export default function ResetPasswordPage() {
  return (
    <AuthBackground>
      <div className='relative flex min-h-screen items-center justify-center p-4'>
        <Card className='bg-background/80 border-border/50 relative z-10 w-full max-w-md backdrop-blur-sm'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-2xl font-bold'>Reset Password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={<div className='bg-muted h-32 animate-pulse rounded' />}
            >
              <ResetPasswordForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </AuthBackground>
  )
}
