'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Key } from 'lucide-react'

export function AccountsManager() {
  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <CardTitle className='text-space-gold flex items-center gap-2'>
          <Key className='h-5 w-5' />
          Connected Accounts
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Alert className='border-blue-500/30 bg-blue-500/10'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            This portfolio uses a simplified authentication system with
            credentials only. OAuth providers (Google, GitHub, etc.) are not
            configured.
          </AlertDescription>
        </Alert>

        <div className='text-muted-foreground py-8 text-center'>
          <p>No external accounts connected</p>
          <p className='mt-2 text-sm'>
            Authentication is handled via email/password only
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
