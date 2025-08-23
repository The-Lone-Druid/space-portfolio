import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface ErrorPageProps {
  searchParams: {
    error?: string
  }
}

export default function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const error = searchParams.error

  const getErrorMessage = (error?: string) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password.'
      case 'OAuthSignin':
        return 'Error occurred during OAuth sign in.'
      case 'OAuthCallback':
        return 'Error occurred during OAuth callback.'
      case 'OAuthCreateAccount':
        return 'Could not create OAuth account.'
      case 'EmailCreateAccount':
        return 'Could not create email account.'
      case 'Callback':
        return 'Error occurred during callback.'
      case 'OAuthAccountNotLinked':
        return 'OAuth account is not linked to any existing account.'
      case 'EmailSignin':
        return 'Could not send email.'
      case 'CredentialsSignup':
        return 'Error occurred during sign up.'
      case 'SessionRequired':
        return 'You must be signed in to access this page.'
      default:
        return 'An unknown error occurred.'
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4'>
      <Card className='w-full max-w-md border-red-500/20 bg-slate-900/80 backdrop-blur-sm'>
        <CardHeader className='space-y-4 text-center'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600'>
            <AlertCircle className='h-8 w-8 text-white' />
          </div>
          <CardTitle className='text-2xl font-bold text-white'>
            Authentication Error
          </CardTitle>
          <p className='text-red-200'>{getErrorMessage(error)}</p>
        </CardHeader>

        <CardContent className='space-y-4 text-center'>
          <p className='text-slate-300'>
            Please try again or contact support if the problem persists.
          </p>

          <div className='space-y-2'>
            <Button
              asChild
              className='w-full bg-purple-600 hover:bg-purple-700'
            >
              <Link href='/auth/signin'>Try Again</Link>
            </Button>

            <Button
              asChild
              variant='outline'
              className='w-full border-purple-500/30 text-purple-200'
            >
              <Link href='/'>Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
