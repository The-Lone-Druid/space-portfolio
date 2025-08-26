'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Monitor } from 'lucide-react'

export function SessionsManager() {
  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <CardTitle className='text-space-gold flex items-center gap-2'>
          <Monitor className='h-5 w-5' />
          Active Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Alert className='border-blue-500/30 bg-blue-500/10'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            This portfolio uses JWT-based sessions. Session data is not stored
            in the database. Sessions are managed client-side with HTTP-only
            cookies.
          </AlertDescription>
        </Alert>

        <div className='text-muted-foreground py-8 text-center'>
          <p>Session management is handled via JWT tokens</p>
          <p className='mt-2 text-sm'>No database sessions to display</p>
        </div>
      </CardContent>
    </Card>
  )
}
