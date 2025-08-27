'use client'

import { MobileSidebar } from '@/components/dashboard/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

interface DashboardHeaderProps {
  title?: string
  description?: string
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <header className='glass-cosmic-clear sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl'>
      <div className='flex h-16 items-center gap-4 px-4 lg:px-6'>
        {/* Mobile Sidebar Toggle */}
        <MobileSidebar />

        {/* Title and Description */}
        <div className='flex-1'>
          {title && (
            <div>
              <h1 className='text-lg font-semibold text-white md:text-xl'>
                {title}
              </h1>
              {description && (
                <p className='text-sm text-white/70'>{description}</p>
              )}
            </div>
          )}
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='link'
              className='relative h-8 w-8 rounded-full transition-colors hover:bg-white/10'
            >
              <Avatar className='ring-space-gold/50 h-8 w-8 ring-2'>
                <AvatarImage
                  src='/placeholder-avatar.jpg'
                  alt='Zahid Shaikh profile picture'
                />
                <AvatarFallback className='bg-space-accent font-semibold text-white'>
                  ZS
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='bg-space-cosmic/95 border-space-accent/30 w-56 backdrop-blur-xl'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm leading-none font-medium text-white'>
                  {session?.user?.name || 'Admin User'}
                </p>
                <p className='text-xs leading-none text-white/70'>
                  {session?.user?.email || 'admin@zahidshaikh.space'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-white/20' />
            <DropdownMenuItem
              asChild
              className='text-white hover:bg-white/10 focus:bg-white/10'
            >
              <Link href='/dashboard/profile' className='cursor-pointer'>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className='text-white hover:bg-white/10 focus:bg-white/10'
            >
              <Link href='/dashboard/settings' className='cursor-pointer'>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-white/20' />
            <DropdownMenuItem
              className='cursor-pointer text-red-400 hover:bg-red-500/20 focus:bg-red-500/20'
              onClick={handleSignOut}
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
