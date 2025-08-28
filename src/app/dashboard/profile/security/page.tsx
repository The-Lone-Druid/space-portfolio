import { Suspense } from 'react'
import { ChangePasswordForm } from '@/components/forms/change-password-form'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { DashboardPageHeader } from '@/components/dashboard/page-header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Shield,
  AlertTriangle,
  Settings,
  Lock,
  Key,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Smartphone,
  Mail,
  AlertCircle,
  Activity,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

async function SecurityContent() {
  return (
    <div className='space-y-8'>
      {/* Header Section */}
      <DashboardPageHeader
        title='Security & Authentication'
        description='Manage your account security, authentication settings, and monitor account activity across the digital cosmos.'
      />

      {/* Security Status Overview */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Main Security Status */}
        <Card className='glass-cosmic border-white/10 lg:col-span-2'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Shield className='text-space-accent h-5 w-5' />
              <CardTitle className='text-xl text-white'>
                Security Overview
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Current security status and account protection level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {/* Security Score */}
              <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <h3 className='font-semibold text-white'>Security Score</h3>
                    <p className='text-sm text-white/70'>
                      Your overall account security rating
                    </p>
                  </div>
                  <div className='text-right'>
                    <div className='text-2xl font-bold text-green-400'>85%</div>
                    <div className='text-xs text-green-400'>Good</div>
                  </div>
                </div>
                <div className='mt-3 h-2 w-full rounded-full bg-white/10'>
                  <div className='h-2 w-[85%] rounded-full bg-gradient-to-r from-green-500 to-green-400'></div>
                </div>
              </div>

              {/* Security Checks */}
              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-3'>
                  <CheckCircle className='h-4 w-4 flex-shrink-0 text-green-400' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-white'>
                      Strong Password
                    </p>
                    <p className='text-xs text-green-400'>
                      Password meets security requirements
                    </p>
                  </div>
                  <Badge
                    variant='default'
                    className='bg-green-500/20 text-green-400'
                  >
                    Active
                  </Badge>
                </div>

                <div className='flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3'>
                  <AlertTriangle className='h-4 w-4 flex-shrink-0 text-yellow-400' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-white'>
                      Email Verification
                    </p>
                    <p className='text-xs text-yellow-400'>
                      Enhance account security
                    </p>
                  </div>
                  <Badge
                    variant='secondary'
                    className='bg-yellow-500/20 text-yellow-400'
                  >
                    Pending
                  </Badge>
                </div>

                <div className='flex items-center gap-3 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3'>
                  <Activity className='h-4 w-4 flex-shrink-0 text-blue-400' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-white'>
                      Recent Activity
                    </p>
                    <p className='text-xs text-blue-400'>
                      Last login{' '}
                      {formatDistanceToNow(new Date(), { addSuffix: true })}
                    </p>
                  </div>
                  <Badge
                    variant='default'
                    className='bg-blue-500/20 text-blue-400'
                  >
                    Monitored
                  </Badge>
                </div>

                <div className='flex items-center gap-3 rounded-lg border border-purple-500/20 bg-purple-500/10 p-3'>
                  <Settings className='h-4 w-4 flex-shrink-0 text-purple-400' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-white'>
                      Account Type
                    </p>
                    <p className='text-xs text-purple-400'>
                      Administrator access level
                    </p>
                  </div>
                  <Badge
                    variant='default'
                    className='bg-purple-500/20 text-purple-400'
                  >
                    Admin
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Security Actions */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Lock className='text-space-accent h-5 w-5' />
              <CardTitle className='text-lg text-white'>
                Quick Actions
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Essential security management
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Button
              variant='outline'
              className='w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              <Key className='mr-3 h-4 w-4' />
              Change Password
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              <Mail className='mr-3 h-4 w-4' />
              Verify Email
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              <Eye className='mr-3 h-4 w-4' />
              View Sessions
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              <Activity className='mr-3 h-4 w-4' />
              Security Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Password Management */}
      <ChangePasswordForm />

      {/* Security Activity & Sessions */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Recent Security Activity */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Activity className='text-space-accent h-5 w-5' />
              <CardTitle className='text-lg text-white'>
                Recent Activity
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Monitor your account access and security events
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <div className='flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20'>
                  <CheckCircle className='h-4 w-4 text-green-400' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-white'>
                    Successful Login
                  </p>
                  <p className='text-xs text-white/60'>
                    {formatDistanceToNow(new Date(), { addSuffix: true })} •
                    Desktop
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20'>
                  <Key className='h-4 w-4 text-blue-400' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-white'>
                    Password Updated
                  </p>
                  <p className='text-xs text-white/60'>
                    2 days ago • Security enhancement
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20'>
                  <Settings className='h-4 w-4 text-purple-400' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-white'>
                    Settings Modified
                  </p>
                  <p className='text-xs text-white/60'>
                    1 week ago • Profile updated
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Smartphone className='text-space-accent h-5 w-5' />
              <CardTitle className='text-lg text-white'>
                Active Sessions
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Manage your active login sessions and devices
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20'>
                    <CheckCircle className='h-4 w-4 text-green-400' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Desktop - Chrome
                    </p>
                    <p className='text-xs text-white/60'>
                      Current session • Windows
                    </p>
                  </div>
                </div>
                <Badge
                  variant='default'
                  className='bg-green-500/20 text-green-400'
                >
                  Current
                </Badge>
              </div>

              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20'>
                    <Smartphone className='h-4 w-4 text-blue-400' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Mobile - Safari
                    </p>
                    <p className='text-xs text-white/60'>2 hours ago • iOS</p>
                  </div>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                >
                  Revoke
                </Button>
              </div>
            </div>

            <Button
              variant='outline'
              className='w-full border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              <XCircle className='mr-2 h-4 w-4' />
              Revoke All Other Sessions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Security Best Practices & Advanced Settings */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Security Best Practices */}
        <Card className='glass-cosmic border-white/10 lg:col-span-2'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Shield className='text-space-accent h-5 w-5' />
              <CardTitle className='text-lg text-white'>
                Security Best Practices
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Essential tips to keep your account secure across the digital
              cosmos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <div className='bg-space-accent mt-2 h-2 w-2 flex-shrink-0 rounded-full' />
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Strong Password Policy
                    </p>
                    <p className='text-xs text-white/70'>
                      Use at least 12 characters with uppercase, lowercase,
                      numbers, and special symbols.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='bg-space-accent mt-2 h-2 w-2 flex-shrink-0 rounded-full' />
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Unique Email Security
                    </p>
                    <p className='text-xs text-white/70'>
                      Secure your email account with 2FA as it&apos;s used for
                      critical account recovery.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='bg-space-accent mt-2 h-2 w-2 flex-shrink-0 rounded-full' />
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Regular Security Audits
                    </p>
                    <p className='text-xs text-white/70'>
                      Review active sessions monthly and update passwords
                      quarterly.
                    </p>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <div className='bg-space-accent mt-2 h-2 w-2 flex-shrink-0 rounded-full' />
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Secure Network Usage
                    </p>
                    <p className='text-xs text-white/70'>
                      Avoid public Wi-Fi for sensitive operations. Use VPN when
                      necessary.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='bg-space-accent mt-2 h-2 w-2 flex-shrink-0 rounded-full' />
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Device Security
                    </p>
                    <p className='text-xs text-white/70'>
                      Keep your devices updated and log out from shared
                      computers.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='bg-space-accent mt-2 h-2 w-2 flex-shrink-0 rounded-full' />
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Suspicious Activity
                    </p>
                    <p className='text-xs text-white/70'>
                      Report any unauthorized access immediately and change
                      passwords.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Security Settings */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <AlertCircle className='text-space-accent h-5 w-5' />
              <CardTitle className='text-lg text-white'>
                Advanced Security
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Additional protection options
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* Email Notifications */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-white'>Login Alerts</p>
                  <p className='text-xs text-white/60'>
                    Get notified of new logins
                  </p>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-green-500/20 bg-green-500/10 text-green-400'
                >
                  Enabled
                </Button>
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-white'>
                    Security Alerts
                  </p>
                  <p className='text-xs text-white/60'>
                    Suspicious activity warnings
                  </p>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-green-500/20 bg-green-500/10 text-green-400'
                >
                  Enabled
                </Button>
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-white'>
                    Password Changes
                  </p>
                  <p className='text-xs text-white/60'>
                    Notify when password is updated
                  </p>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                >
                  Configure
                </Button>
              </div>
            </div>

            <Separator className='bg-white/10' />

            {/* Security Actions */}
            <div className='space-y-2'>
              <Button
                variant='outline'
                className='w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10'
              >
                <Clock className='mr-3 h-4 w-4' />
                Download Security Log
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20'
              >
                <AlertTriangle className='mr-3 h-4 w-4' />
                Report Security Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default async function SecurityPage() {
  return (
    <div className='space-y-6'>
      <Suspense
        fallback={
          <div className='flex min-h-[400px] items-center justify-center'>
            <LoadingSpinner className='text-space-accent h-8 w-8' />
          </div>
        }
      >
        <SecurityContent />
      </Suspense>
    </div>
  )
}
