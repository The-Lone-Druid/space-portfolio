'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
  FolderOpen,
  Home,
  Menu,
  Rocket,
  Settings,
  ToolCase,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Personal Info',
    href: '/dashboard/personal-info',
    icon: User,
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: FolderOpen,
  },
  {
    title: 'Skills',
    href: '/dashboard/skills',
    icon: Rocket,
  },
  {
    title: 'Services',
    href: '/dashboard/services',
    icon: ToolCase,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

interface SidebarContentProps {
  items: SidebarItem[]
  pathname: string
  onItemClick?: () => void
}

function SidebarContent({ items, pathname, onItemClick }: SidebarContentProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href) ? prev.filter(item => item !== href) : [...prev, href]
    )
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const isExpanded = (href: string) => expandedItems.includes(href)

  return (
    <div className='bg-gradient-cosmic flex h-full flex-col'>
      {/* Logo */}
      <div className='flex h-16 items-center border-b border-white/10 px-6'>
        <Link href='/dashboard' className='group flex items-center space-x-2'>
          <Rocket className='text-space-gold group-hover:animate-pulse-cosmic h-6 w-6 transition-all duration-300' />
          <span className='text-lg font-semibold text-white'>
            Space Dashboard
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className='flex-1 px-3 py-4'>
        <nav className='space-y-2'>
          {items.map(item => (
            <div key={item.href}>
              {item.children ? (
                <div>
                  <Button
                    variant='ghost'
                    className={cn(
                      'h-auto w-full justify-start space-x-2 px-3 py-2 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white',
                      isActive(item.href) &&
                        'bg-space-accent/20 text-space-gold hover:bg-space-accent/30 border-space-accent/30 border shadow-lg'
                    )}
                    onClick={() => toggleExpanded(item.href)}
                  >
                    <item.icon className='h-4 w-4' />
                    <span className='flex-1 text-left'>{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant='secondary'
                        className='bg-space-gold/20 text-space-gold border-space-gold/30 ml-auto text-xs'
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                  {isExpanded(item.href) && (
                    <div className='mt-2 ml-6 space-y-1'>
                      {item.children.map(child => (
                        <Link key={child.href} href={child.href}>
                          <Button
                            variant='ghost'
                            className={cn(
                              'h-auto w-full justify-start space-x-2 px-3 py-2 text-sm text-white/80 transition-all duration-200 hover:bg-white/5 hover:text-white',
                              isActive(child.href) &&
                                'bg-space-stellar/30 text-space-gold hover:bg-space-stellar/40 border-space-accent/20 border'
                            )}
                            onClick={onItemClick}
                          >
                            <child.icon className='h-3 w-3' />
                            <span>{child.title}</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href}>
                  <Button
                    variant='ghost'
                    className={cn(
                      'h-auto w-full justify-start space-x-2 px-3 py-2 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white',
                      isActive(item.href) &&
                        'bg-space-accent/20 text-space-gold hover:bg-space-accent/30 border-space-accent/30 border shadow-lg'
                    )}
                    onClick={onItemClick}
                  >
                    <item.icon className='h-4 w-4' />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant='secondary'
                        className='bg-space-gold/20 text-space-gold border-space-gold/30 ml-auto text-xs'
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className='bg-space-deep/50 border-t border-white/10 p-4'>
        <div className='text-xs text-white/60'>
          <p className='text-space-gold font-medium'>Space Portfolio v1.0</p>
          <p className='mt-1'>Dashboard Admin Panel</p>
        </div>
      </div>
    </div>
  )
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'glass-cosmic hidden border-r border-white/10 lg:block',
        className
      )}
    >
      <SidebarContent items={sidebarItems} pathname={pathname} />
    </div>
  )
}

export function MobileSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='lg:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-64 p-0'>
        <SidebarContent
          items={sidebarItems}
          pathname={pathname}
          onItemClick={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
