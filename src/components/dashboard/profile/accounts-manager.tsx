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
import type { Account } from '@prisma/client'
import { AlertCircle, Key, Trash2 } from 'lucide-react'

interface AccountsManagerProps {
  accounts: Account[]
}

// Provider icon mapping
const getProviderIcon = (provider: string) => {
  switch (provider.toLowerCase()) {
    case 'google':
      return '🔍'
    case 'github':
      return '🐙'
    case 'discord':
      return '🎮'
    case 'credentials':
      return '🔑'
    default:
      return '🔗'
  }
}

// Provider color mapping
const getProviderColor = (provider: string) => {
  switch (provider.toLowerCase()) {
    case 'google':
      return 'border-red-400/30 bg-red-400/20 text-red-400'
    case 'github':
      return 'border-gray-400/30 bg-gray-400/20 text-gray-400'
    case 'discord':
      return 'border-indigo-400/30 bg-indigo-400/20 text-indigo-400'
    case 'credentials':
      return 'border-green-400/30 bg-green-400/20 text-green-400'
    default:
      return 'border-blue-400/30 bg-blue-400/20 text-blue-400'
  }
}

export function AccountsManager({ accounts }: AccountsManagerProps) {
  const handleDisconnectAccount = async (account: Account) => {
    if (
      !confirm(
        `Are you sure you want to disconnect your ${account.provider} account?`
      )
    ) {
      return
    }

    try {
      // TODO: Implement account disconnection API
      console.warn('Account disconnection not implemented yet')
    } catch (error) {
      console.error('Error disconnecting account:', error)
    }
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-white'>
              <Key className='h-5 w-5 text-cyan-400' />
              Account Management
            </CardTitle>
            <CardDescription className='text-gray-400'>
              Manage your connected authentication providers and accounts
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <div className='flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-6 text-center'>
            <Key className='mb-2 h-8 w-8 text-white/40' />
            <p className='text-sm text-white/70'>No connected accounts found</p>
            <p className='mt-1 text-xs text-white/50'>
              Connect external providers to manage your authentication methods
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {/* Desktop Table View */}
            <div className='hidden md:block'>
              <Table>
                <TableHeader>
                  <TableRow className='border-white/10 hover:bg-white/5'>
                    <TableHead className='text-white/80'>Provider</TableHead>
                    <TableHead className='text-white/80'>Type</TableHead>
                    <TableHead className='text-white/80'>Account ID</TableHead>
                    <TableHead className='text-white/80'>Status</TableHead>
                    <TableHead className='text-right text-white/80'>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map(account => (
                    <TableRow
                      key={account.id}
                      className='border-white/10 hover:bg-white/5'
                    >
                      <TableCell>
                        <div className='flex items-center gap-3'>
                          <div className='bg-space-accent/20 flex items-center justify-center rounded-full p-2 text-lg'>
                            {getProviderIcon(account.provider)}
                          </div>
                          <div>
                            <p className='font-medium text-white capitalize'>
                              {account.provider}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant='outline'
                          className={getProviderColor(account.provider)}
                        >
                          {account.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className='font-mono text-sm text-white/70'>
                          {account.providerAccountId}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <span className='text-sm text-green-400'>
                            Connected
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button
                            variant='link'
                            size='sm'
                            className='h-8 w-8 p-0 text-white/60 hover:text-red-400'
                            onClick={() => handleDisconnectAccount(account)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className='grid gap-3 md:hidden'>
              {accounts.map(account => (
                <div
                  key={account.id}
                  className='group hover:border-space-accent/50 relative rounded-lg border border-white/10 bg-white/5 p-4 transition-all'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex flex-1 items-center gap-3'>
                      <div className='bg-space-accent/20 flex items-center justify-center rounded-full p-2 text-lg'>
                        {getProviderIcon(account.provider)}
                      </div>
                      <div className='min-w-0 flex-1'>
                        <div className='mb-1 flex items-center gap-2'>
                          <p className='font-medium text-white capitalize'>
                            {account.provider}
                          </p>
                          <Badge
                            variant='outline'
                            className={`${getProviderColor(account.provider)} text-xs`}
                          >
                            {account.type}
                          </Badge>
                        </div>
                        <p className='font-mono text-xs text-white/60'>
                          ID: {account.providerAccountId}
                        </p>
                        <div className='mt-2 flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-green-400'></div>
                          <span className='text-xs text-green-400'>
                            Connected
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant='link'
                      size='sm'
                      className='h-8 w-8 p-0 text-white/60 hover:text-red-400'
                      onClick={() => handleDisconnectAccount(account)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Warning Note */}
            <div className='mt-6 flex items-start gap-3 rounded-lg border border-orange-400/30 bg-orange-400/10 p-4'>
              <AlertCircle className='mt-0.5 h-5 w-5 flex-shrink-0 text-orange-400' />
              <div className='text-sm'>
                <p className='mb-1 font-medium text-orange-400'>
                  Account Management
                </p>
                <p className='text-orange-300/80'>
                  Disconnecting accounts may affect your ability to sign in.
                  Ensure you have at least one authentication method available.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
