'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import { Lock, Unlock, AlertTriangle, Clock } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface LockedAccount {
  email: string
  failedAttempts: number
  lockedUntil: Date | null
  lastAttempt: Date
  remainingTime?: number
}

interface LockoutStatusCardProps {
  lockedAccounts: LockedAccount[]
}

export function LockoutStatusCard({ lockedAccounts }: LockoutStatusCardProps) {
  const [unlockingAccounts, setUnlockingAccounts] = useState<Set<string>>(
    new Set()
  )

  const handleUnlockAccount = async (email: string) => {
    setUnlockingAccounts(prev => new Set(prev).add(email))

    try {
      const response = await fetch('/api/admin/unlock-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`Account ${email} unlocked successfully`)
        // Refresh the page to update the data
        window.location.reload()
      } else {
        toast.error(`Failed to unlock account: ${result.error}`)
      }
    } catch (error) {
      console.error('Failed to unlock account:', error)
      toast.error('Failed to unlock account. Please try again.')
    } finally {
      setUnlockingAccounts(prev => {
        const newSet = new Set(prev)
        newSet.delete(email)
        return newSet
      })
    }
  }

  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@')
    if (local.length <= 2) return email
    return `${local.slice(0, 2)}***@${domain}`
  }

  const formatRemainingTime = (minutes?: number) => {
    if (!minutes || minutes <= 0) return 'Expired'

    if (minutes < 60) {
      return `${minutes}m remaining`
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m remaining`
  }

  const isExpired = (lockedUntil: Date | null) => {
    if (!lockedUntil) return false
    return new Date() > lockedUntil
  }

  return (
    <Card className='glass-nebula border-red-400/30 bg-red-400/5'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-white'>
          <Lock className='h-5 w-5 text-red-400' />
          Account Lockouts
          <Badge variant='destructive' className='ml-2'>
            {lockedAccounts.length} Active
          </Badge>
        </CardTitle>
        <p className='text-sm text-red-300/80'>
          Accounts currently locked due to failed login attempts
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[300px] w-full'>
          <div className='space-y-3'>
            {lockedAccounts.length === 0 ? (
              <div className='flex items-center justify-center py-8'>
                <p className='text-sm text-white/50'>No locked accounts</p>
              </div>
            ) : (
              lockedAccounts.map(account => (
                <div
                  key={account.email}
                  className='flex items-center justify-between rounded-lg border border-red-400/20 bg-red-400/10 p-3'
                >
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-medium text-white'>
                        {maskEmail(account.email)}
                      </span>

                      <Badge
                        variant={
                          isExpired(account.lockedUntil)
                            ? 'secondary'
                            : 'destructive'
                        }
                        className='text-xs'
                      >
                        {account.failedAttempts} attempts
                      </Badge>
                    </div>

                    <div className='flex items-center gap-4 text-xs text-white/60'>
                      <span className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        Last attempt:{' '}
                        {formatDistanceToNow(new Date(account.lastAttempt), {
                          addSuffix: true,
                        })}
                      </span>

                      {account.lockedUntil && (
                        <span
                          className={
                            isExpired(account.lockedUntil)
                              ? 'text-green-400'
                              : 'text-orange-400'
                          }
                        >
                          {isExpired(account.lockedUntil)
                            ? 'Lockout expired'
                            : formatRemainingTime(account.remainingTime)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleUnlockAccount(account.email)}
                    disabled={unlockingAccounts.has(account.email)}
                    className='ml-3 border-green-400/50 bg-green-400/10 text-green-400 hover:bg-green-400/20'
                  >
                    {unlockingAccounts.has(account.email) ? (
                      <div className='flex items-center gap-1'>
                        <div className='h-3 w-3 animate-spin rounded-full border border-green-400 border-t-transparent' />
                        Unlocking...
                      </div>
                    ) : (
                      <div className='flex items-center gap-1'>
                        <Unlock className='h-3 w-3' />
                        Unlock
                      </div>
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {lockedAccounts.length > 0 && (
          <div className='mt-4 flex items-start gap-2 rounded-lg border border-orange-400/20 bg-orange-400/10 p-3'>
            <AlertTriangle className='mt-0.5 h-4 w-4 flex-shrink-0 text-orange-400' />
            <div className='text-xs text-orange-300'>
              <p className='font-medium'>Automatic Unlock Policy</p>
              <p className='text-orange-200/80'>
                Accounts are automatically unlocked after 15 minutes of lockout
                period. Manual unlock is available for immediate access
                restoration.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
