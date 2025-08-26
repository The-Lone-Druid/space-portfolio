/**
 * Audit Service - Comprehensive security event logging
 * Tracks all authentication and security-related events
 */

import { prisma } from '@/lib/prisma'
import { AuditAction, AuditLogData, AuditLogWithUser } from '../types/auth'

/**
 * Main audit logging service
 */
export class AuditService {
  /**
   * Log a security event
   */
  static async log(data: AuditLogData): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId: data.userId || null,
          email: data.email || null,
          action: data.action,
          ipAddress: data.ipAddress || null,
          userAgent: data.userAgent || null,
          details: data.details
            ? JSON.parse(JSON.stringify(data.details))
            : null,
        },
      })

      // Also log to console for immediate visibility
      console.warn(`[AUDIT] ${data.action}`, {
        timestamp: new Date().toISOString(),
        userId: data.userId,
        email: data.email,
        ip: data.ipAddress,
        userAgent: data.userAgent,
        details: data.details,
      })
    } catch (error) {
      console.error('Failed to log audit event:', error)
      // Still log to console as fallback
      console.warn(`[AUDIT FALLBACK] ${data.action}`, data)
    }
  }

  /**
   * Log successful login
   */
  static async logLoginSuccess(
    userId: string,
    email: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      email,
      action: 'login_success',
      ipAddress,
      userAgent,
      details: {
        timestamp: new Date().toISOString(),
      },
    })
  }

  /**
   * Log failed login attempt
   */
  static async logLoginFailed(
    email: string,
    reason: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      email,
      action: 'login_failed',
      ipAddress,
      userAgent,
      details: {
        reason,
        timestamp: new Date().toISOString(),
      },
    })
  }

  /**
   * Log logout event
   */
  static async logLogout(
    userId: string,
    email: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      email,
      action: 'logout',
      ipAddress,
      userAgent,
    })
  }

  /**
   * Log password change
   */
  static async logPasswordChange(
    userId: string,
    email: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      email,
      action: 'password_change',
      ipAddress,
      userAgent,
      details: {
        timestamp: new Date().toISOString(),
      },
    })
  }

  /**
   * Log password reset request
   */
  static async logPasswordResetRequest(
    email: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      email,
      action: 'password_reset_request',
      ipAddress,
      userAgent,
      details: {
        timestamp: new Date().toISOString(),
      },
    })
  }

  /**
   * Log password reset completion
   */
  static async logPasswordResetComplete(
    email: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      email,
      action: 'password_reset_complete',
      ipAddress,
      userAgent,
      details: {
        timestamp: new Date().toISOString(),
      },
    })
  }

  /**
   * Log session revocation
   */
  static async logSessionRevoked(
    userId: string,
    email: string,
    sessionId: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      email,
      action: 'session_revoked',
      ipAddress,
      userAgent,
      details: {
        sessionId,
        timestamp: new Date().toISOString(),
      },
    })
  }

  /**
   * Log account lockout
   */
  static async logAccountLocked(
    email: string,
    failedAttempts: number,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      email,
      action: 'account_locked',
      ipAddress,
      userAgent,
      details: {
        failedAttempts,
        timestamp: new Date().toISOString(),
      },
    })
  }

  /**
   * Log account unlock
   */
  static async logAccountUnlocked(
    email: string,
    method: 'auto' | 'manual',
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      email,
      action: 'account_unlocked',
      ipAddress,
      userAgent,
      details: {
        method,
        timestamp: new Date().toISOString(),
      },
    })
  }

  /**
   * Log admin unlock action
   */
  static async logAdminUnlock({
    adminUserId,
    targetEmail,
    ipAddress,
    userAgent,
  }: {
    adminUserId: string
    targetEmail: string
    ipAddress?: string
    userAgent?: string
  }): Promise<void> {
    await this.log({
      userId: adminUserId,
      email: targetEmail,
      action: 'admin_unlock',
      ipAddress,
      userAgent,
      details: {
        targetEmail,
        adminAction: true,
        timestamp: new Date().toISOString(),
      },
    })
  }

  /**
   * Get recent audit logs for a user
   */
  static async getUserAuditLogs(
    email: string,
    limit = 50
  ): Promise<AuditLogWithUser[]> {
    try {
      return await prisma.auditLog.findMany({
        where: { email },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
      })
    } catch (error) {
      console.error('Failed to fetch user audit logs:', error)
      return []
    }
  }

  /**
   * Get all recent audit logs (admin view)
   */
  static async getAllAuditLogs(
    limit = 100,
    action?: AuditAction
  ): Promise<AuditLogWithUser[]> {
    try {
      return await prisma.auditLog.findMany({
        where: action ? { action } : undefined,
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
      })
    } catch (error) {
      console.error('Failed to fetch audit logs:', error)
      return []
    }
  }

  /**
   * Get audit log statistics
   */
  static async getAuditStats(days = 30): Promise<{
    totalEvents: number
    loginAttempts: number
    failedLogins: number
    passwordChanges: number
    accountLockouts: number
    recentEvents: AuditLogWithUser[]
  }> {
    try {
      const since = new Date()
      since.setDate(since.getDate() - days)

      const [
        totalEvents,
        loginAttempts,
        failedLogins,
        passwordChanges,
        accountLockouts,
        recentEvents,
      ] = await Promise.all([
        prisma.auditLog.count({
          where: { createdAt: { gte: since } },
        }),
        prisma.auditLog.count({
          where: {
            action: 'login_success',
            createdAt: { gte: since },
          },
        }),
        prisma.auditLog.count({
          where: {
            action: 'login_failed',
            createdAt: { gte: since },
          },
        }),
        prisma.auditLog.count({
          where: {
            action: 'password_change',
            createdAt: { gte: since },
          },
        }),
        prisma.auditLog.count({
          where: {
            action: 'account_locked',
            createdAt: { gte: since },
          },
        }),
        prisma.auditLog.findMany({
          include: { user: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        }),
      ])

      return {
        totalEvents,
        loginAttempts,
        failedLogins,
        passwordChanges,
        accountLockouts,
        recentEvents,
      }
    } catch (error) {
      console.error('Failed to fetch audit stats:', error)
      return {
        totalEvents: 0,
        loginAttempts: 0,
        failedLogins: 0,
        passwordChanges: 0,
        accountLockouts: 0,
        recentEvents: [],
      }
    }
  }

  /**
   * Clean up old audit logs (for data retention)
   */
  static async cleanupOldLogs(daysToKeep = 365): Promise<number> {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

      const { count } = await prisma.auditLog.deleteMany({
        where: {
          createdAt: { lt: cutoffDate },
        },
      })

      console.warn(`[AUDIT] Cleaned up ${count} old audit logs`)
      return count
    } catch (error) {
      console.error('Failed to cleanup old audit logs:', error)
      return 0
    }
  }
}
