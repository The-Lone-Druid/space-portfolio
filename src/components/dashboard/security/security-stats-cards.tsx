'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Shield,
  AlertTriangle,
  Lock,
  Activity,
  Eye,
  KeyRound,
} from 'lucide-react'

interface SecurityStatsCardsProps {
  auditStats: {
    totalEvents: number
    loginAttempts: number
    failedLogins: number
    passwordChanges: number
    accountLockouts: number
  }
  lockoutStats: {
    totalLockouts: number
    activeLockouts: number
    recentAttempts: number
  }
}

export function SecurityStatsCards({
  auditStats,
  lockoutStats,
}: SecurityStatsCardsProps) {
  const securityLevel =
    auditStats.failedLogins < 5
      ? 'high'
      : auditStats.failedLogins < 20
        ? 'medium'
        : 'low'

  const securityColor =
    securityLevel === 'high'
      ? 'green'
      : securityLevel === 'medium'
        ? 'yellow'
        : 'red'

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {/* Security Level */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white/80'>
            Security Level
          </CardTitle>
          <Shield className={`h-5 w-5 text-${securityColor}-400`} />
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-2'>
            <div className='text-2xl font-bold text-white capitalize'>
              {securityLevel}
            </div>
            <div className={`text-xs text-${securityColor}-400`}>
              {auditStats.failedLogins} failed attempts
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Login Activity */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white/80'>
            Login Activity (30d)
          </CardTitle>
          <Activity className='h-5 w-5 text-blue-400' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-white'>
            {auditStats.loginAttempts}
          </div>
          <p className='text-xs text-white/60'>Total login attempts</p>
        </CardContent>
      </Card>

      {/* Failed Logins */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white/80'>
            Failed Logins
          </CardTitle>
          <AlertTriangle className='h-5 w-5 text-orange-400' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-white'>
            {auditStats.failedLogins}
          </div>
          <p className='text-xs text-white/60'>Blocked attempts</p>
        </CardContent>
      </Card>

      {/* Active Lockouts */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white/80'>
            Active Lockouts
          </CardTitle>
          <Lock className='h-5 w-5 text-red-400' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-white'>
            {lockoutStats.activeLockouts}
          </div>
          <p className='text-xs text-white/60'>Currently locked accounts</p>
        </CardContent>
      </Card>

      {/* Password Changes */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white/80'>
            Password Changes
          </CardTitle>
          <KeyRound className='h-5 w-5 text-green-400' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-white'>
            {auditStats.passwordChanges}
          </div>
          <p className='text-xs text-white/60'>Recent password updates</p>
        </CardContent>
      </Card>

      {/* Total Events */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white/80'>
            Security Events
          </CardTitle>
          <Eye className='h-5 w-5 text-cyan-400' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-white'>
            {auditStats.totalEvents}
          </div>
          <p className='text-xs text-white/60'>Total audit events</p>
        </CardContent>
      </Card>
    </div>
  )
}
