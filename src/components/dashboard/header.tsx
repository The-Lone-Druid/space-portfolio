'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebar } from '@/hooks/use-sidebar'
import { Bell, LogOut, Menu, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

interface HeaderProps {
  title?: string
}

export function Header({ title = 'Dashboard' }: HeaderProps) {
  const { toggle } = useSidebar()
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <header className='sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur-md'>
      <div className='flex h-16 items-center gap-4 px-4'>
        {/* Mobile menu button */}
        <Button
          variant='ghost'
          size='icon'
          className='text-slate-100 hover:bg-slate-800 md:hidden'
          onClick={toggle}
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle sidebar</span>
        </Button>

        {/* Page title */}
        <div className='flex-1'>
          <h1 className='text-lg font-semibold tracking-tight text-slate-100'>
            {title}
          </h1>
        </div>

        {/* Header actions */}
        <div className='flex items-center gap-2'>
          {/* Notifications */}
          <Button
            variant='ghost'
            size='icon'
            className='relative text-slate-100 hover:bg-slate-800'
          >
            <Bell className='h-4 w-4' />
            <Badge
              variant='destructive'
              className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs'
            >
              3
            </Badge>
            <span className='sr-only'>Notifications</span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='relative h-8 w-8 rounded-full text-slate-100 hover:bg-slate-800'
              >
                <Avatar className='h-8 w-8 ring-2 ring-slate-700'>
                  <AvatarImage
                    src={session?.user?.image || ''}
                    alt={session?.user?.name || 'User'}
                  />
                  <AvatarFallback className='bg-slate-800 text-slate-100'>
                    {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-56 border-slate-700 bg-slate-800 text-slate-100'
              align='end'
              forceMount
            >
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm leading-none font-medium text-slate-100'>
                    {session?.user?.name || 'User'}
                  </p>
                  <p className='text-xs leading-none text-slate-400'>
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-slate-700' />
              <DropdownMenuItem className='text-slate-100 hover:bg-slate-700'>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='text-slate-100 hover:bg-slate-700'>
                <User className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className='bg-slate-700' />
              <DropdownMenuItem
                onClick={handleSignOut}
                className='text-slate-100 hover:bg-red-600/20'
              >
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
