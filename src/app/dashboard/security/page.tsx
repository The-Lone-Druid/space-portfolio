import { Suspense } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Separator } from '@/components/ui/separator'
import { ChangePasswordForm } from '@/components/forms/change-password-form'
import { Shield, Settings, AlertTriangle } from 'lucide-react'

// Force dynamic rendering since we use authentication
export const dynamic = 'force-dynamic'

async function SecurityContent() {
  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Security Settings</h1>
          <p className='text-gray-400'>
            Manage your account security and authentication preferences
          </p>
        </div>
      </div>

      <Separator className='bg-white/10' />

      {/* Security Overview */}
      <Card className='glass-cosmic border-white/10'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-white'>
            <Shield className='h-5 w-5 text-green-400' />
            Security Status
          </CardTitle>
          <CardDescription className='text-gray-400'>
            Your account security overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-3'>
              <Shield className='h-4 w-4 flex-shrink-0 text-green-400' />
              <div>
                <p className='text-sm font-medium text-white'>
                  Strong Password
                </p>
                <p className='text-xs text-green-400'>
                  Password meets requirements
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3'>
              <AlertTriangle className='h-4 w-4 flex-shrink-0 text-yellow-400' />
              <div>
                <p className='text-sm font-medium text-white'>
                  Email Verification
                </p>
                <p className='text-xs text-yellow-400'>
                  Recommended for security
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3'>
              <Settings className='h-4 w-4 flex-shrink-0 text-blue-400' />
              <div>
                <p className='text-sm font-medium text-white'>Account Type</p>
                <p className='text-xs text-blue-400'>Administrator</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Section */}
      <ChangePasswordForm />

      {/* Security Tips */}
      <Card className='glass-cosmic border-white/10'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-white'>
            <Shield className='h-5 w-5 text-cyan-400' />
            Security Best Practices
          </CardTitle>
          <CardDescription className='text-gray-400'>
            Tips to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div className='flex items-start gap-3'>
              <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400' />
              <div>
                <p className='text-sm font-medium text-white'>
                  Use a Strong, Unique Password
                </p>
                <p className='text-xs text-white/70'>
                  Your password should be at least 8 characters with a mix of
                  letters, numbers, and symbols.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400' />
              <div>
                <p className='text-sm font-medium text-white'>
                  Keep Your Email Secure
                </p>
                <p className='text-xs text-white/70'>
                  Ensure your email account is secure as it&apos;s used for
                  password resets.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400' />
              <div>
                <p className='text-sm font-medium text-white'>
                  Regular Security Reviews
                </p>
                <p className='text-xs text-white/70'>
                  Periodically review your active sessions and change your
                  password.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default async function SecurityPage() {
  return (
    <div className='container mx-auto py-6'>
      <Suspense
        fallback={
          <div className='flex min-h-[400px] items-center justify-center'>
            <LoadingSpinner className='h-8 w-8 text-cyan-400' />
          </div>
        }
      >
        <SecurityContent />
      </Suspense>
    </div>
  )
}
