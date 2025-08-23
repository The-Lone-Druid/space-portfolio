'use client'

import { useBreakpoint } from '@/hooks/use-breakpoint'
import { useSidebar } from '@/hooks/use-sidebar'
import { createContext, ReactNode, useContext } from 'react'

interface DashboardContextType {
  sidebar: ReturnType<typeof useSidebar>
  breakpoint: ReturnType<typeof useBreakpoint>
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
)

interface DashboardProviderProps {
  children: ReactNode
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const sidebar = useSidebar()
  const breakpoint = useBreakpoint()

  return (
    <DashboardContext.Provider
      value={{
        sidebar,
        breakpoint,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}
