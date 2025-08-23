'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useSidebar } from '@/hooks/use-sidebar'
import { Sidebar } from './sidebar'

export function MobileSidebar() {
  const { isOpen, close, isMobile } = useSidebar()

  if (!isMobile) return null

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && close()}>
      <SheetContent
        side='left'
        className='w-72 border-slate-800 bg-slate-900 p-0'
      >
        <SheetHeader className='sr-only'>
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
