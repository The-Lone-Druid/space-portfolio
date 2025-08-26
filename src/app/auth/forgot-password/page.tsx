import { ForgotPasswordForm } from '@/components/forms/forgot-password-form'
import { AuthBackground } from '@/components/auth/auth-background'
import { authOptions } from '@/lib/auth'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Forgot Password | Space Portfolio',
  description: 'Reset your Space Portfolio account password.',
}

export default async function ForgotPasswordPage() {
  // Check if user is already authenticated
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <AuthBackground>
      <ForgotPasswordForm />
    </AuthBackground>
  )
}
