'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import {
  Shield,
  LogIn,
  LogOut,
  Key,
  Lock,
  Unlock,
  Settings,
  AlertTriangle,
} from 'lucide-react'
import { AuditLogWithUser } from '../../../types/auth'

interface AuditLogsCardProps {
  auditLogs: AuditLogWithUser[]
}

const actionIcons = {
  login_success: LogIn,
  login_failed: AlertTriangle,
  logout: LogOut,
  password_change: Key,
  password_reset_request: Key,
  password_reset_complete: Key,
  session_revoked: LogOut,
  account_locked: Lock,
  account_unlocked: Unlock,
  profile_updated: Settings,
  settings_changed: Settings,
}

const actionColors = {
  login_success: 'green',
  login_failed: 'red',
  logout: 'blue',
  password_change: 'yellow',
  password_reset_request: 'orange',
  password_reset_complete: 'green',
  session_revoked: 'red',
  account_locked: 'red',
  account_unlocked: 'green',
  profile_updated: 'blue',
  settings_changed: 'blue',
}

const actionLabels = {
  login_success: 'Login Success',
  login_failed: 'Login Failed',
  logout: 'Logout',
  password_change: 'Password Changed',
  password_reset_request: 'Reset Requested',
  password_reset_complete: 'Reset Completed',
  session_revoked: 'Session Revoked',
  account_locked: 'Account Locked',
  account_unlocked: 'Account Unlocked',
  profile_updated: 'Profile Updated',
  settings_changed: 'Settings Changed',
}

export function AuditLogsCard({ auditLogs }: AuditLogsCardProps) {
  const getActionIcon = (action: string) => {
    const IconComponent =
      actionIcons[action as keyof typeof actionIcons] || Shield
    return <IconComponent className='h-4 w-4' />
  }

  const getActionColor = (action: string) => {
    return actionColors[action as keyof typeof actionColors] || 'gray'
  }

  const getActionLabel = (action: string) => {
    return actionLabels[action as keyof typeof actionLabels] || action
  }

  const maskEmail = (email: string) => {
    if (!email) return 'Unknown'
    const [local, domain] = email.split('@')
    if (local.length <= 2) return email
    return `${local.slice(0, 2)}***@${domain}`
  }

  const formatIP = (ip: string | null) => {
    if (!ip) return 'Unknown'
    if (ip === '127.0.0.1' || ip === '::1') return 'localhost'
    return ip
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-white'>
          <Shield className='h-5 w-5 text-cyan-400' />
          Recent Security Events
        </CardTitle>
        <p className='text-sm text-white/60'>
          Latest authentication and security activities
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[400px] w-full'>
          <div className='space-y-3'>
            {auditLogs.length === 0 ? (
              <div className='flex items-center justify-center py-8'>
                <p className='text-sm text-white/50'>
                  No security events found
                </p>
              </div>
            ) : (
              auditLogs.map(log => (
                <div
                  key={log.id}
                  className='flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3'
                >
                  <div
                    className={`mt-0.5 text-${getActionColor(log.action)}-400`}
                  >
                    {getActionIcon(log.action)}
                  </div>

                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='outline'
                        className={`border-${getActionColor(log.action)}-400/50 bg-${getActionColor(log.action)}-400/10 text-${getActionColor(log.action)}-400`}
                      >
                        {getActionLabel(log.action)}
                      </Badge>

                      {log.email && (
                        <span className='text-xs text-white/60'>
                          {maskEmail(log.email)}
                        </span>
                      )}
                    </div>

                    <div className='flex items-center gap-4 text-xs text-white/50'>
                      <span>
                        {formatDistanceToNow(new Date(log.createdAt), {
                          addSuffix: true,
                        })}
                      </span>

                      {log.ipAddress && (
                        <span>IP: {formatIP(log.ipAddress)}</span>
                      )}

                      {log.details &&
                        typeof log.details === 'object' &&
                        'reason' in log.details && (
                          <span className='text-red-400'>
                            {String(log.details.reason)}
                          </span>
                        )}
                    </div>

                    {log.userAgent && (
                      <div className='truncate text-xs text-white/40'>
                        {log.userAgent}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
