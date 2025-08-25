'use client'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { SessionProvider } from 'next-auth/react'

interface AuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
      storageKey='space-portfolio-theme'
    >
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}
