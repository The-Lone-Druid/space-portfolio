import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { AuditLogsCard } from '@/components/dashboard/security/audit-logs-card'
import { LockoutStatusCard } from '@/components/dashboard/security/lockout-status-card'
import { AuditService } from '@/services/audit-service'
import { AccountLockoutService } from '@/services/account-lockout-service'
import { prisma } from '@/lib/prisma'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Shield,
  AlertTriangle,
  Activity,
  Users,
  Lock,
  Eye,
  Download,
  Settings,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Metadata } from 'next'
import { LockedAccount } from '../../../../types/auth'

export const metadata: Metadata = {
  title: 'Security Dashboard - Space Portfolio',
  description:
    'Monitor security events and account protection across the digital cosmos.',
}

async function getLockedAccounts(): Promise<LockedAccount[]> {
  try {
    const now = new Date()

    // Get all locked accounts
    const lockedAccounts = await prisma.accountLockout.findMany({
      where: {
        lockedUntil: {
          gt: now,
        },
      },
      orderBy: {
        lastAttempt: 'desc',
      },
    })

    // Transform to include remaining time
    return lockedAccounts.map(lockout => {
      const remainingMs = lockout.lockedUntil
        ? lockout.lockedUntil.getTime() - now.getTime()
        : 0
      const remainingMinutes = Math.ceil(remainingMs / (1000 * 60))

      return {
        email: lockout.email,
        failedAttempts: lockout.failedAttempts,
        lockedUntil: lockout.lockedUntil,
        lastAttempt: lockout.lastAttempt,
        remainingTime: remainingMinutes > 0 ? remainingMinutes : 0,
      }
    })
  } catch (error) {
    console.error('Error fetching locked accounts:', error)
    return []
  }
}

export default async function SecurityDashboardPage() {
  // Fetch security data in parallel
  const [auditStats, lockoutStats, lockedAccounts] = await Promise.all([
    AuditService.getAuditStats(30),
    AccountLockoutService.getLockoutStats(),
    getLockedAccounts(),
  ])

  // Calculate security metrics
  const securityLevel =
    auditStats.failedLogins < 5
      ? 'high'
      : auditStats.failedLogins < 20
        ? 'medium'
        : 'low'
  const threatLevel =
    lockoutStats.totalLocked > 5
      ? 'high'
      : lockoutStats.totalLocked > 2
        ? 'medium'
        : 'low'

  return (
    <div className='space-y-8'>
      <DashboardPageHeader
        title='Security Dashboard'
        description='Monitor security events, threat detection, and account protection across the digital cosmos.'
      />

      {/* Security Alert Banner */}
      {(securityLevel === 'low' || threatLevel === 'high') && (
        <Card className='glass-cosmic border-red-500/20 bg-red-500/10'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <AlertTriangle className='h-5 w-5 text-red-400' />
              <div className='flex-1'>
                <h3 className='font-semibold text-red-400'>Security Alert</h3>
                <p className='text-sm text-red-300'>
                  {securityLevel === 'low' &&
                    'High number of failed login attempts detected. '}
                  {threatLevel === 'high' &&
                    'Multiple accounts are currently locked. '}
                  Review security logs immediately.
                </p>
              </div>
              <Button
                variant='outline'
                size='sm'
                className='border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20'
              >
                <Eye className='mr-2 h-4 w-4' />
                Investigate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Security Overview */}
      <div className='grid gap-6 lg:grid-cols-4'>
        {/* System Security Status */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-3'>
              <div
                className={`rounded-full p-2 ${
                  securityLevel === 'high'
                    ? 'bg-green-500/20'
                    : securityLevel === 'medium'
                      ? 'bg-yellow-500/20'
                      : 'bg-red-500/20'
                }`}
              >
                <Shield
                  className={`h-4 w-4 ${
                    securityLevel === 'high'
                      ? 'text-green-400'
                      : securityLevel === 'medium'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                  }`}
                />
              </div>
              <CardTitle className='text-sm text-white'>
                System Security
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='text-2xl font-bold text-white capitalize'>
              {securityLevel}
            </div>
            <Badge
              variant={securityLevel === 'high' ? 'default' : 'secondary'}
              className={`${
                securityLevel === 'high'
                  ? 'bg-green-500/20 text-green-400'
                  : securityLevel === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
              }`}
            >
              {securityLevel === 'high'
                ? 'Secure'
                : securityLevel === 'medium'
                  ? 'Caution'
                  : 'Alert'}
            </Badge>
            <p className='text-xs text-white/60'>
              Based on {auditStats.totalEvents} events
            </p>
          </CardContent>
        </Card>

        {/* Threat Detection */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-3'>
              <div className='rounded-full bg-orange-500/20 p-2'>
                <AlertCircle className='h-4 w-4 text-orange-400' />
              </div>
              <CardTitle className='text-sm text-white'>
                Threat Detection
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='text-2xl font-bold text-white'>
              {auditStats.failedLogins}
            </div>
            <Badge
              variant='secondary'
              className='bg-orange-500/20 text-orange-400'
            >
              Failed Attempts
            </Badge>
            <p className='text-xs text-white/60'>Last 30 days</p>
          </CardContent>
        </Card>

        {/* Active Lockouts */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-3'>
              <div className='rounded-full bg-red-500/20 p-2'>
                <Lock className='h-4 w-4 text-red-400' />
              </div>
              <CardTitle className='text-sm text-white'>
                Active Lockouts
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='text-2xl font-bold text-white'>
              {lockoutStats.totalLocked}
            </div>
            <Badge variant='secondary' className='bg-red-500/20 text-red-400'>
              Accounts Locked
            </Badge>
            <p className='text-xs text-white/60'>
              {lockedAccounts.length > 0
                ? `${lockedAccounts[0]?.remainingTime || 0}min remaining`
                : 'No active locks'}
            </p>
          </CardContent>
        </Card>

        {/* Security Activity */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-3'>
              <div className='rounded-full bg-blue-500/20 p-2'>
                <Activity className='h-4 w-4 text-blue-400' />
              </div>
              <CardTitle className='text-sm text-white'>
                Activity Monitor
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='text-2xl font-bold text-white'>
              {auditStats.loginAttempts}
            </div>
            <Badge variant='secondary' className='bg-blue-500/20 text-blue-400'>
              Login Attempts
            </Badge>
            <p className='text-xs text-white/60'>
              {auditStats.passwordChanges} password changes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Security Management Actions */}
      <Card className='glass-cosmic border-white/10'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Settings className='text-space-accent h-5 w-5' />
              <div>
                <CardTitle className='text-lg text-white'>
                  Security Management
                </CardTitle>
                <CardDescription className='text-white/70'>
                  Administrative tools for security monitoring and management
                </CardDescription>
              </div>
            </div>
            <Badge
              variant='default'
              className='bg-space-accent/20 text-space-accent'
            >
              Admin Only
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Button
              variant='outline'
              className='h-auto flex-col gap-2 border-white/20 bg-white/5 p-4 text-white hover:bg-white/10'
            >
              <Download className='h-5 w-5' />
              <span className='text-sm'>Export Logs</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto flex-col gap-2 border-white/20 bg-white/5 p-4 text-white hover:bg-white/10'
            >
              <Users className='h-5 w-5' />
              <span className='text-sm'>User Management</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto flex-col gap-2 border-white/20 bg-white/5 p-4 text-white hover:bg-white/10'
            >
              <Settings className='h-5 w-5' />
              <span className='text-sm'>Security Settings</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto flex-col gap-2 border-white/20 bg-white/5 p-4 text-white hover:bg-white/10'
            >
              <TrendingUp className='h-5 w-5' />
              <span className='text-sm'>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Security Content Grid */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Recent Security Events */}
        <AuditLogsCard auditLogs={auditStats.recentEvents} />

        {/* Account Lockout Status */}
        <LockoutStatusCard lockedAccounts={lockedAccounts} />
      </div>

      {/* Real-time Security Monitoring */}
      <Card className='glass-cosmic border-white/10'>
        <CardHeader className='pb-4'>
          <div className='flex items-center gap-3'>
            <Activity className='text-space-accent h-5 w-5' />
            <CardTitle className='text-lg text-white'>
              Real-time Security Monitoring
            </CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Live security status and system health indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 sm:grid-cols-3'>
            <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
              <div className='flex items-center gap-3'>
                <CheckCircle className='h-4 w-4 text-green-400' />
                <span className='text-sm text-white/70'>System Status</span>
              </div>
              <Badge
                variant='default'
                className='bg-green-500/20 text-green-400'
              >
                Online
              </Badge>
            </div>
            <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
              <div className='flex items-center gap-3'>
                <Clock className='h-4 w-4 text-blue-400' />
                <span className='text-sm text-white/70'>Last Scan</span>
              </div>
              <span className='text-sm text-white'>
                {formatDistanceToNow(new Date(), { addSuffix: true })}
              </span>
            </div>
            <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
              <div className='flex items-center gap-3'>
                <Shield className='h-4 w-4 text-purple-400' />
                <span className='text-sm text-white/70'>Protection Level</span>
              </div>
              <Badge
                variant='default'
                className='bg-purple-500/20 text-purple-400'
              >
                Maximum
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
