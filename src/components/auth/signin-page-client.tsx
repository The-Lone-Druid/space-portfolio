'use client'

import { SigninForm } from '@/components/forms/signin-form'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SigninFormWrapper() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  return <SigninForm callbackUrl={callbackUrl} />
}

export function SigninPageClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SigninFormWrapper />
    </Suspense>
  )
}
