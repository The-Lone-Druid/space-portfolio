import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { SecurityStatsCards } from '@/components/dashboard/security/security-stats-cards'
import { AuditLogsCard } from '@/components/dashboard/security/audit-logs-card'
import { LockoutStatusCard } from '@/components/dashboard/security/lockout-status-card'
import { AuditService } from '@/services/audit-service'
import { AccountLockoutService } from '@/services/account-lockout-service'
import { prisma } from '@/lib/prisma'
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

  return (
    <div className='space-y-6'>
      <DashboardPageHeader
        title='Security Dashboard'
        description='Monitor security events and account protection across the digital cosmos.'
      />

      {/* Security Statistics Overview */}
      <SecurityStatsCards
        auditStats={{
          totalEvents: auditStats.totalEvents,
          loginAttempts: auditStats.loginAttempts,
          failedLogins: auditStats.failedLogins,
          passwordChanges: auditStats.passwordChanges,
          accountLockouts: auditStats.accountLockouts,
        }}
        lockoutStats={{
          totalLockouts: lockoutStats.totalAttempts,
          activeLockouts: lockoutStats.totalLocked,
          recentAttempts: lockoutStats.recentLockouts,
        }}
      />

      {/* Main Security Content Grid */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Recent Security Events */}
        <AuditLogsCard auditLogs={auditStats.recentEvents} />

        {/* Account Lockout Status */}
        <LockoutStatusCard lockedAccounts={lockedAccounts} />
      </div>
    </div>
  )
}
