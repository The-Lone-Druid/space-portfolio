'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Briefcase,
  FolderOpen,
  Settings,
  Target,
  User,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '../../lib/utils'
import { DashboardStats } from '../../types'

interface QuickActionsProps {
  data: DashboardStats
}

export function QuickActions({ data }: QuickActionsProps) {
  const { projects, skills, services, personalInfo } = data

  const actions = [
    {
      title: 'Add Project',
      description: 'Showcase your latest work',
      href: '/dashboard/projects',
      icon: FolderOpen,
      variant: 'stellar' as const,
      priority: projects.total === 0 ? 'high' : 'normal',
    },
    {
      title: 'Add Skill',
      description: 'Update your expertise',
      href: '/dashboard/skills',
      icon: Target,
      variant: 'cosmic' as const,
      priority: skills.total < 5 ? 'high' : 'normal',
    },
    {
      title: 'Add Service',
      description: 'Define what you offer',
      href: '/dashboard/services',
      icon: Briefcase,
      variant: 'space' as const,
      priority: services.total === 0 ? 'high' : 'normal',
    },
    {
      title: 'Update Profile',
      description: 'Complete your information',
      href: '/dashboard/personal-info',
      icon: User,
      variant: 'nebula' as const,
      priority: !personalInfo.isComplete ? 'high' : 'normal',
    },
    {
      title: 'Portfolio Settings',
      description: 'Configure your site',
      href: '/dashboard/settings',
      icon: Settings,
      variant: 'outline' as const,
      priority: 'normal',
    },
  ]

  // Sort actions by priority
  const sortedActions = actions.sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1
    if (b.priority === 'high' && a.priority !== 'high') return 1
    return 0
  })

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <CardTitle className='text-foreground flex items-center'>
          <Zap className='text-space-gold mr-2 h-5 w-5' />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex flex-row flex-wrap gap-4'>
          {sortedActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Button
                key={index}
                variant={action.variant}
                className={cn(
                  'h-auto flex-1',
                  action.priority === 'high' &&
                    'border-yellow-400/50 ring-2 ring-yellow-400/30'
                )}
                asChild
              >
                <Link href={action.href}>
                  <div className='flex items-center gap-3'>
                    <div className='rounded-lg bg-white/10 p-2'>
                      <IconComponent className='h-4 w-4' />
                    </div>
                    <div className='flex-1 text-left'>
                      <div className='font-medium'>{action.title}</div>
                      <div className='text-xs opacity-70'>
                        {action.description}
                      </div>
                    </div>
                    {action.priority === 'high' && (
                      <div className='flex items-center gap-1'>
                        <div className='h-2 w-2 animate-pulse rounded-full bg-yellow-400' />
                        <span className='text-xs text-yellow-400'>
                          Priority
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </Button>
            )
          })}
        </div>

        {/* Quick Tip */}
        <div className='rounded-lg border border-blue-500/30 bg-blue-500/10 p-3'>
          <div className='flex items-start gap-2'>
            <div className='mt-0.5 rounded-full bg-blue-500/20 p-1'>
              <Zap className='h-3 w-3 text-blue-400' />
            </div>
            <div className='text-xs text-blue-200'>
              <p className='font-medium'>Pro Tip</p>
              <p className='mt-1 text-blue-200/80'>
                Complete high-priority actions first to improve your portfolio
                strength rating.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
