import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  Activity,
  Users,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { AuditService } from '@/services/audit-service'
import { AccountLockoutService } from '@/services/account-lockout-service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Space Portfolio',
  description:
    'Administrative controls and system monitoring for the digital cosmos.',
}

export default async function AdminDashboardPage() {
  // Get quick stats for the admin overview
  const [auditStats, lockoutStats] = await Promise.all([
    AuditService.getAuditStats(7), // Last 7 days
    AccountLockoutService.getLockoutStats(),
  ])

  const securityLevel =
    auditStats.failedLogins < 5
      ? 'high'
      : auditStats.failedLogins < 20
        ? 'medium'
        : 'low'

  const securityLevelColors = {
    high: 'text-green-400 border-green-400/50 bg-green-400/10',
    medium: 'text-orange-400 border-orange-400/50 bg-orange-400/10',
    low: 'text-red-400 border-red-400/50 bg-red-400/10',
  }

  return (
    <div className='space-y-6'>
      <DashboardPageHeader
        title='Admin Dashboard'
        description='Administrative controls and system monitoring for the digital cosmos.'
      />

      {/* Security Status Overview */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Security Level */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Security Level</p>
                <Badge
                  variant='outline'
                  className={`mt-1 ${securityLevelColors[securityLevel]}`}
                >
                  {securityLevel.toUpperCase()}
                </Badge>
              </div>
              <Shield className='h-8 w-8 text-blue-400' />
            </div>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Security Events (7d)</p>
                <p className='font-semibold text-white'>
                  {auditStats.totalEvents}
                </p>
              </div>
              <Activity className='h-8 w-8 text-purple-400' />
            </div>
          </CardContent>
        </Card>

        {/* Failed Logins */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Failed Logins (7d)</p>
                <p className='font-semibold text-white'>
                  {auditStats.failedLogins}
                </p>
              </div>
              <AlertTriangle className='h-8 w-8 text-orange-400' />
            </div>
          </CardContent>
        </Card>

        {/* Locked Accounts */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Locked Accounts</p>
                <p className='font-semibold text-white'>
                  {lockoutStats.totalLocked}
                </p>
              </div>
              <Users className='h-8 w-8 text-red-400' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tools Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Security Monitoring */}
        <Card className='glass-nebula border-space-accent/30 bg-gradient-to-br from-blue-500/10 to-purple-600/10'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-white'>
              <Shield className='h-5 w-5 text-blue-400' />
              Security Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <p className='text-white/80'>
                Monitor authentication events, account security, and access
                patterns across the system.
              </p>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-white/60'>Recent audit events:</span>
                  <span className='text-white'>
                    {auditStats.recentEvents.length}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-white/60'>Password changes (7d):</span>
                  <span className='text-white'>
                    {auditStats.passwordChanges}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-white/60'>Account lockouts (7d):</span>
                  <span className='text-white'>
                    {auditStats.accountLockouts}
                  </span>
                </div>
              </div>

              <Link href='/dashboard/admin/security'>
                <Button
                  className='w-full border-blue-400/50 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                  variant='outline'
                >
                  Open Security Dashboard
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className='glass-nebula border-space-accent/30 bg-gradient-to-br from-green-500/10 to-teal-600/10'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-white'>
              <Activity className='h-5 w-5 text-green-400' />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <p className='text-white/80'>
                System status and health monitoring for the portfolio platform.
              </p>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-white/60'>Authentication:</span>
                  <Badge
                    variant='outline'
                    className='border-green-400/50 bg-green-400/10 text-green-400'
                  >
                    Operational
                  </Badge>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-white/60'>Database:</span>
                  <Badge
                    variant='outline'
                    className='border-green-400/50 bg-green-400/10 text-green-400'
                  >
                    Connected
                  </Badge>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-white/60'>Security Level:</span>
                  <Badge
                    variant='outline'
                    className={securityLevelColors[securityLevel]}
                  >
                    {securityLevel.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <Button
                className='w-full border-green-400/50 bg-green-500/20 text-green-300 hover:bg-green-500/30'
                variant='outline'
                disabled
              >
                System Logs (Coming Soon)
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
