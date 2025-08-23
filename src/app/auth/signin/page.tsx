import { AuthBackground } from '@/components/auth/auth-background'
import { SigninPageClient } from '@/components/auth/signin-page-client'
import { authOptions } from '@/lib/auth'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign In | Space Portfolio',
  description: 'Sign in to access the Space Portfolio admin dashboard.',
}

export default async function SigninPage() {
  // Check if user is already authenticated on server side
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <AuthBackground>
      <SigninPageClient />
    </AuthBackground>
  )
}
