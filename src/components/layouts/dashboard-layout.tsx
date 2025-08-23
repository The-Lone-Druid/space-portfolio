'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { DashboardHeader } from '../shared/dashboard-header'
import { MobileSidebar } from '../shared/mobile-sidebar'
import { Sidebar } from '../shared/sidebar'

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  className?: string
}

export function DashboardLayout({
  children,
  title,
  className,
}: DashboardLayoutProps) {
  return (
    <div className='min-h-screen bg-slate-950'>
      {/* Subtle background gradient */}
      <div className='pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900'></div>

      {/* Mobile sidebar */}
      <MobileSidebar />

      <div className='flex min-h-screen'>
        {/* Desktop sidebar */}
        <aside className='hidden w-72 flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-sm md:flex'>
          <ScrollArea className='flex-1'>
            <Sidebar />
          </ScrollArea>
        </aside>

        {/* Main content */}
        <div className='flex flex-1 flex-col'>
          <DashboardHeader title={title} />

          <main className='flex-1 overflow-hidden'>
            <ScrollArea className='h-full'>
              <div className={cn('p-6', className)}>{children}</div>
            </ScrollArea>
          </main>
        </div>
      </div>
    </div>
  )
}
