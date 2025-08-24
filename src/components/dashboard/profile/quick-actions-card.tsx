'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RefreshCw, Settings, Shield, User } from 'lucide-react'

export function QuickActionsCard() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-white'>
          <Settings className='h-5 w-5 text-cyan-400' />
          Account Actions
        </CardTitle>
        <CardDescription className='text-gray-400'>
          Common account management tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          <Button variant='space' className='h-auto justify-start gap-2 p-4'>
            <User className='h-4 w-4' />
            <div className='text-left'>
              <p className='font-medium'>Update Profile</p>
              <p className='text-xs text-white/60'>
                Modify your account information
              </p>
            </div>
          </Button>

          <Button variant='space' className='h-auto justify-start gap-2 p-4'>
            <Shield className='h-4 w-4' />
            <div className='text-left'>
              <p className='font-medium'>Security Settings</p>
              <p className='text-xs text-white/60'>Manage passwords and 2FA</p>
            </div>
          </Button>

          <Button
            variant='space'
            className='h-auto justify-start gap-2 p-4'
            onClick={handleRefresh}
          >
            <RefreshCw className='h-4 w-4' />
            <div className='text-left'>
              <p className='font-medium'>Refresh Data</p>
              <p className='text-xs text-white/60'>
                Reload account information
              </p>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
