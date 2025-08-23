'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Settings,
  Star,
  User,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Content Management',
    items: [
      {
        title: 'Personal Info',
        href: '/admin/personal-info',
        icon: User,
      },
      {
        title: 'Projects',
        href: '/admin/projects',
        icon: Briefcase,
      },
      {
        title: 'Skills',
        href: '/admin/skills',
        icon: Star,
      },
      {
        title: 'Services',
        href: '/admin/services',
        icon: Wrench,
      },
      {
        title: 'Experience',
        href: '/admin/experience',
        icon: FileText,
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
      },
    ],
  },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('min-h-screen pb-12', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='space-y-1'>
            <h2 className='mb-2 px-4 text-xl font-semibold tracking-tight text-slate-100'>
              🚀 Space Portfolio
            </h2>
            <div className='space-y-1'>
              {navigation.map((section, sectionIndex) => (
                <div key={section.title} className='space-y-1'>
                  {sectionIndex > 0 && (
                    <Separator className='my-4 bg-white/20' />
                  )}
                  <h3 className='text-space-silver mb-2 px-4 text-sm font-medium tracking-tight opacity-80'>
                    {section.title}
                  </h3>
                  {section.items.map(item => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                      <Button
                        key={item.href}
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={cn(
                          'h-10 w-full justify-start gap-2 text-white transition-all duration-200',
                          isActive
                            ? 'bg-space-accent/50 ring-space-accent font-medium text-white ring-1'
                            : 'hover:text-space-gold hover:bg-white/10'
                        )}
                        asChild
                      >
                        <Link href={item.href}>
                          <Icon className={cn('h-4 w-4')} />
                          {item.title}
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
