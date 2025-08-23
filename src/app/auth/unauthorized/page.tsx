import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4'>
      <Card className='w-full max-w-md border-red-500/20 bg-slate-900/80 backdrop-blur-sm'>
        <CardHeader className='space-y-4 text-center'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600'>
            <AlertTriangle className='h-8 w-8 text-white' />
          </div>
          <CardTitle className='text-2xl font-bold text-white'>
            Access Denied
          </CardTitle>
          <p className='text-red-200'>
            You don&apos;t have permission to access this area.
          </p>
        </CardHeader>

        <CardContent className='space-y-4 text-center'>
          <p className='text-slate-300'>
            Please contact an administrator if you believe this is an error.
          </p>

          <div className='space-y-2'>
            <Button
              asChild
              className='w-full bg-purple-600 hover:bg-purple-700'
            >
              <Link href='/'>Go Home</Link>
            </Button>

            <Button
              asChild
              variant='outline'
              className='w-full border-purple-500/30 text-purple-200'
            >
              <Link href='/auth/signin'>Sign In</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
