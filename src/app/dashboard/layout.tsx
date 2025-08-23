import { DashboardAuthProvider } from '@/components/auth/dashboard-auth-provider'
import { DashboardHeader } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Space Portfolio',
  description: 'Admin dashboard for managing portfolio content and settings.',
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardAuthProvider>
      <div className='bg-gradient-cosmic flex h-screen overflow-hidden'>
        {/* Sidebar */}
        <Sidebar className='w-64' />

        {/* Main Content */}
        <div className='flex flex-1 flex-col overflow-hidden'>
          {/* Header */}
          <DashboardHeader />

          {/* Page Content */}
          <main className='flex-1 overflow-y-auto p-4 lg:p-6'>
            <div className='mx-auto max-w-7xl'>{children}</div>
          </main>
        </div>
      </div>
    </DashboardAuthProvider>
  )
}
