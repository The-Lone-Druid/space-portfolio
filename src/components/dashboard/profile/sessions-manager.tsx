'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Session } from '@prisma/client'
import { AlertCircle, CheckCircle2, Clock, Monitor, Trash2 } from 'lucide-react'

interface SessionsManagerProps {
  sessions: Session[]
}

export function SessionsManager({ sessions }: SessionsManagerProps) {
  const handleRevokeSession = async (session: Session) => {
    if (!confirm('Are you sure you want to revoke this session?')) {
      return
    }

    try {
      // TODO: Implement session revocation API
      void session // Use session parameter to avoid unused warning
      console.warn('Session revocation not implemented yet')
    } catch (error) {
      console.error('Error revoking session:', error)
    }
  }

  const isSessionActive = (session: Session) => {
    return new Date(session.expires) > new Date()
  }

  const getSessionStatus = (session: Session) => {
    const active = isSessionActive(session)
    return {
      active,
      label: active ? 'Active' : 'Expired',
      color: active
        ? 'border-green-400/30 bg-green-400/20 text-green-400'
        : 'border-red-400/30 bg-red-400/20 text-red-400',
      icon: active ? CheckCircle2 : AlertCircle,
    }
  }

  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffMs < 0) {
      const absDays = Math.abs(diffDays)
      const absHours = Math.abs(diffHours)
      const absMinutes = Math.abs(diffMinutes)

      if (absDays > 0) return `${absDays} day${absDays > 1 ? 's' : ''} ago`
      if (absHours > 0) return `${absHours} hour${absHours > 1 ? 's' : ''} ago`
      if (absMinutes > 0)
        return `${absMinutes} minute${absMinutes > 1 ? 's' : ''} ago`
      return 'Just now'
    }

    if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`
    if (diffHours > 0) return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`
    if (diffMinutes > 0)
      return `in ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
    return 'Soon'
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-white'>
              <Clock className='h-5 w-5 text-cyan-400' />
              Active Sessions
            </CardTitle>
            <CardDescription className='text-gray-400'>
              Manage your active login sessions and device access
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className='flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-6 text-center'>
            <Monitor className='mb-2 h-8 w-8 text-white/40' />
            <p className='text-sm text-white/70'>No active sessions found</p>
            <p className='mt-1 text-xs text-white/50'>
              Your login sessions will appear here when you sign in
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {/* Desktop Table View */}
            <div className='hidden md:block'>
              <Table>
                <TableHeader>
                  <TableRow className='border-white/10 hover:bg-white/5'>
                    <TableHead className='text-white/80'>Session ID</TableHead>
                    <TableHead className='text-white/80'>Status</TableHead>
                    <TableHead className='text-white/80'>Expires</TableHead>
                    <TableHead className='text-white/80'>Expires In</TableHead>
                    <TableHead className='text-right text-white/80'>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map(session => {
                    const status = getSessionStatus(session)
                    const StatusIcon = status.icon

                    return (
                      <TableRow
                        key={session.id}
                        className='border-white/10 hover:bg-white/5'
                      >
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <Monitor className='text-space-accent h-4 w-4' />
                            <div>
                              <p className='font-mono text-sm text-white'>
                                {session.id.slice(0, 8)}...
                              </p>
                              <p className='text-xs text-white/60'>
                                Token: {session.sessionToken.slice(0, 12)}...
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline' className={status.color}>
                            <StatusIcon className='mr-1 h-3 w-3' />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className='text-sm text-white/70'>
                            {new Date(session.expires).toLocaleDateString()}
                          </p>
                          <p className='text-xs text-white/50'>
                            {new Date(session.expires).toLocaleTimeString()}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className='text-sm text-white/70'>
                            {formatRelativeTime(new Date(session.expires))}
                          </p>
                        </TableCell>
                        <TableCell className='text-right'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-8 w-8 p-0 text-white/60 hover:text-red-400'
                            onClick={() => handleRevokeSession(session)}
                            disabled={!status.active}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className='grid gap-3 md:hidden'>
              {sessions.map(session => {
                const status = getSessionStatus(session)
                const StatusIcon = status.icon

                return (
                  <div
                    key={session.id}
                    className='group hover:border-space-accent/50 relative rounded-lg border border-white/10 bg-white/5 p-4 transition-all'
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex flex-1 items-center gap-3'>
                        <Monitor className='text-space-accent h-5 w-5 flex-shrink-0' />
                        <div className='min-w-0 flex-1'>
                          <div className='mb-1 flex items-center gap-2'>
                            <p className='font-mono text-sm text-white'>
                              {session.id.slice(0, 12)}...
                            </p>
                            <Badge
                              variant='outline'
                              className={`${status.color} text-xs`}
                            >
                              <StatusIcon className='mr-1 h-3 w-3' />
                              {status.label}
                            </Badge>
                          </div>
                          <p className='mb-2 text-xs text-white/60'>
                            Token: {session.sessionToken.slice(0, 16)}...
                          </p>
                          <div className='space-y-1'>
                            <p className='text-xs text-white/70'>
                              Expires:{' '}
                              {new Date(session.expires).toLocaleDateString()}
                            </p>
                            <p className='text-xs text-white/60'>
                              {formatRelativeTime(new Date(session.expires))}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 p-0 text-white/60 hover:text-red-400'
                        onClick={() => handleRevokeSession(session)}
                        disabled={!status.active}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Info Note */}
            <div className='mt-6 flex items-start gap-3 rounded-lg border border-blue-400/30 bg-blue-400/10 p-4'>
              <Clock className='mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400' />
              <div className='text-sm'>
                <p className='mb-1 font-medium text-blue-400'>
                  Session Management
                </p>
                <p className='text-blue-300/80'>
                  Sessions automatically expire after the specified time.
                  Revoking a session will immediately sign you out from that
                  device.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
