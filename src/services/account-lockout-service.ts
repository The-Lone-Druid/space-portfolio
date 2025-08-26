/**
 * Account Lockout Service - Brute force protection
 * Manages account lockouts to prevent unauthorized access attempts
 */

import { prisma } from '@/lib/prisma'
import { AuditService } from './audit-service'
import { LockoutConfig, LockoutStatus } from '../types/auth'

export const DEFAULT_LOCKOUT_CONFIG: LockoutConfig = {
  maxAttempts: 5,
  lockoutDurationMinutes: 15,
  cleanupAfterDays: 30,
}

/**
 * Account lockout management service
 */
export class AccountLockoutService {
  private static config = DEFAULT_LOCKOUT_CONFIG

  /**
   * Configure lockout settings
   */
  static configure(config: Partial<LockoutConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Record a failed login attempt
   */
  static async recordFailedAttempt(
    email: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<LockoutStatus> {
    try {
      // Get or create lockout record
      const lockout = await prisma.accountLockout.upsert({
        where: { email },
        update: {
          failedAttempts: { increment: 1 },
          lastAttempt: new Date(),
        },
        create: {
          email,
          failedAttempts: 1,
          lastAttempt: new Date(),
        },
      })

      const status = this.calculateLockoutStatus(lockout)

      // Lock account if threshold reached
      if (
        lockout.failedAttempts >= this.config.maxAttempts &&
        !status.isLocked
      ) {
        const lockedUntil = new Date()
        lockedUntil.setMinutes(
          lockedUntil.getMinutes() + this.config.lockoutDurationMinutes
        )

        await prisma.accountLockout.update({
          where: { email },
          data: { lockedUntil },
        })

        // Log the account lockout
        await AuditService.logAccountLocked(
          email,
          lockout.failedAttempts,
          ipAddress,
          userAgent
        )

        return {
          isLocked: true,
          failedAttempts: lockout.failedAttempts,
          lockedUntil,
          remainingTime: this.config.lockoutDurationMinutes,
        }
      }

      return status
    } catch (error) {
      console.error('Failed to record failed attempt:', error)
      return {
        isLocked: false,
        failedAttempts: 0,
      }
    }
  }

  /**
   * Check if an account is currently locked
   */
  static async checkLockoutStatus(email: string): Promise<LockoutStatus> {
    try {
      const lockout = await prisma.accountLockout.findUnique({
        where: { email },
      })

      if (!lockout) {
        return {
          isLocked: false,
          failedAttempts: 0,
        }
      }

      return this.calculateLockoutStatus(lockout)
    } catch (error) {
      console.error('Failed to check lockout status:', error)
      return {
        isLocked: false,
        failedAttempts: 0,
      }
    }
  }

  /**
   * Reset failed attempts after successful login
   */
  static async resetFailedAttempts(email: string): Promise<void> {
    try {
      await prisma.accountLockout.update({
        where: { email },
        data: {
          failedAttempts: 0,
          lockedUntil: null,
        },
      })
    } catch (error) {
      console.error('Failed to reset failed attempts:', error)
    }
  }

  /**
   * Manually unlock an account (admin action)
   */
  static async unlockAccount(
    email: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<boolean> {
    try {
      const lockout = await prisma.accountLockout.findUnique({
        where: { email },
      })

      if (!lockout) {
        return false
      }

      await prisma.accountLockout.update({
        where: { email },
        data: {
          failedAttempts: 0,
          lockedUntil: null,
        },
      })

      // Log the manual unlock
      await AuditService.logAccountUnlocked(
        email,
        'manual',
        ipAddress,
        userAgent
      )

      return true
    } catch (error) {
      console.error('Failed to unlock account:', error)
      return false
    }
  }

  /**
   * Get all currently locked accounts
   */
  static async getLockedAccounts(): Promise<
    Array<{
      email: string
      failedAttempts: number
      lockedUntil: Date | null
      lastAttempt: Date
      remainingTime?: number
    }>
  > {
    try {
      const now = new Date()
      const lockouts = await prisma.accountLockout.findMany({
        where: {
          OR: [
            { lockedUntil: { gt: now } },
            { failedAttempts: { gte: this.config.maxAttempts } },
          ],
        },
        orderBy: { lastAttempt: 'desc' },
      })

      return lockouts.map(lockout => ({
        email: lockout.email,
        failedAttempts: lockout.failedAttempts,
        lockedUntil: lockout.lockedUntil,
        lastAttempt: lockout.lastAttempt,
        remainingTime: lockout.lockedUntil
          ? Math.max(
              0,
              Math.ceil((lockout.lockedUntil.getTime() - now.getTime()) / 60000)
            )
          : undefined,
      }))
    } catch (error) {
      console.error('Failed to get locked accounts:', error)
      return []
    }
  }

  /**
   * Clean up expired lockouts automatically
   */
  static async cleanupExpiredLockouts(): Promise<number> {
    try {
      const now = new Date()
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - this.config.cleanupAfterDays)

      // Reset lockouts that have naturally expired
      const expiredLockouts = await prisma.accountLockout.findMany({
        where: {
          lockedUntil: { lt: now },
          failedAttempts: { gte: this.config.maxAttempts },
        },
      })

      // Log auto-unlocks
      for (const lockout of expiredLockouts) {
        await AuditService.logAccountUnlocked(lockout.email, 'auto')
      }

      // Update expired lockouts
      await prisma.accountLockout.updateMany({
        where: {
          lockedUntil: { lt: now },
        },
        data: {
          failedAttempts: 0,
          lockedUntil: null,
        },
      })

      // Delete old records
      const { count } = await prisma.accountLockout.deleteMany({
        where: {
          lastAttempt: { lt: cutoffDate },
          failedAttempts: 0,
        },
      })

      console.warn(
        `[LOCKOUT] Auto-unlocked ${expiredLockouts.length} accounts, cleaned ${count} old records`
      )
      return count + expiredLockouts.length
    } catch (error) {
      console.error('Failed to cleanup expired lockouts:', error)
      return 0
    }
  }

  /**
   * Get lockout status for a specific email
   */
  static async getLockoutStatus(email: string): Promise<{
    isLocked: boolean
    failedAttempts: number
    lockedUntil: Date | null
    remainingTime?: number
  }> {
    try {
      const lockout = await prisma.accountLockout.findUnique({
        where: { email },
      })

      if (!lockout) {
        return {
          isLocked: false,
          failedAttempts: 0,
          lockedUntil: null,
        }
      }

      const now = new Date()
      const isLocked = lockout.lockedUntil && lockout.lockedUntil > now

      if (isLocked && lockout.lockedUntil) {
        const remainingMs = lockout.lockedUntil.getTime() - now.getTime()
        const remainingMinutes = Math.ceil(remainingMs / (1000 * 60))

        return {
          isLocked: true,
          failedAttempts: lockout.failedAttempts,
          lockedUntil: lockout.lockedUntil,
          remainingTime: remainingMinutes,
        }
      }

      return {
        isLocked: false,
        failedAttempts: lockout.failedAttempts,
        lockedUntil: lockout.lockedUntil,
      }
    } catch (error) {
      console.error('Failed to get lockout status:', error)
      return {
        isLocked: false,
        failedAttempts: 0,
        lockedUntil: null,
      }
    }
  }

  /**
   * Get lockout statistics for dashboard
   */
  static async getLockoutStats(): Promise<{
    totalLocked: number
    totalAttempts: number
    recentLockouts: number
  }> {
    try {
      const now = new Date()
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

      const [totalLocked, recentLockouts, totalAttempts] = await Promise.all([
        // Count currently locked accounts
        prisma.accountLockout.count({
          where: {
            lockedUntil: {
              gt: now,
            },
          },
        }),
        // Count lockouts in the last 24 hours
        prisma.accountLockout.count({
          where: {
            lastAttempt: {
              gte: oneDayAgo,
            },
          },
        }),
        // Sum total failed attempts
        prisma.accountLockout.aggregate({
          _sum: {
            failedAttempts: true,
          },
        }),
      ])

      return {
        totalLocked,
        totalAttempts: totalAttempts._sum.failedAttempts || 0,
        recentLockouts,
      }
    } catch (error) {
      console.error('Failed to get lockout stats:', error)
      return {
        totalLocked: 0,
        totalAttempts: 0,
        recentLockouts: 0,
      }
    }
  }

  /**
   * Calculate lockout status from database record
   */
  private static calculateLockoutStatus(lockout: {
    failedAttempts: number
    lockedUntil: Date | null
  }): LockoutStatus {
    const now = new Date()

    // Check if explicitly locked and still within lockout period
    if (lockout.lockedUntil && lockout.lockedUntil > now) {
      const remainingTime = Math.ceil(
        (lockout.lockedUntil.getTime() - now.getTime()) / 60000
      )
      return {
        isLocked: true,
        failedAttempts: lockout.failedAttempts,
        lockedUntil: lockout.lockedUntil,
        remainingTime,
      }
    }

    // Check if threshold reached (auto-lock)
    if (lockout.failedAttempts >= this.config.maxAttempts) {
      return {
        isLocked: true,
        failedAttempts: lockout.failedAttempts,
        lockedUntil: lockout.lockedUntil,
      }
    }

    return {
      isLocked: false,
      failedAttempts: lockout.failedAttempts,
    }
  }
}
