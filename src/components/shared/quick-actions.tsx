'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, ExternalLink, MoreHorizontal, Plus } from 'lucide-react'
import Link from 'next/link'

interface QuickAction {
  id: string
  title: string
  description: string
  href: string
  icon: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline'
}

interface QuickActionsProps {
  actions?: QuickAction[]
}

const defaultActions: QuickAction[] = [
  {
    id: 'new-project',
    title: 'Add New Project',
    description: 'Create a new project showcase',
    href: '/admin/projects/new',
    icon: <Plus className='h-4 w-4' />,
    variant: 'default',
  },
  {
    id: 'edit-profile',
    title: 'Edit Profile',
    description: 'Update personal information',
    href: '/admin/personal-info',
    icon: <Edit className='h-4 w-4' />,
    variant: 'outline',
  },
  {
    id: 'view-site',
    title: 'View Live Site',
    description: 'Preview your portfolio',
    href: '/',
    icon: <ExternalLink className='h-4 w-4' />,
    variant: 'secondary',
  },
  {
    id: 'manage-skills',
    title: 'Manage Skills',
    description: 'Update your skills and expertise',
    href: '/admin/skills',
    icon: <Edit className='h-4 w-4' />,
    variant: 'outline',
  },
]

export function QuickActions({ actions = defaultActions }: QuickActionsProps) {
  return (
    <Card className='glass-cosmic hover:glass-nebula border-white/20 transition-all duration-300'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-white'>Quick Actions</CardTitle>
        <Button
          variant='ghost'
          size='sm'
          className='text-white hover:bg-white/10'
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent>
        <div className='grid gap-3'>
          {actions.map(action => (
            <Button
              key={action.id}
              variant={action.variant || 'outline'}
              className={`h-auto justify-start p-4 transition-all duration-200 ${
                action.variant === 'default'
                  ? 'bg-space-accent hover:bg-space-stellar border-space-accent text-white'
                  : 'hover:border-space-accent border-white/20 text-white hover:bg-white/10'
              }`}
              asChild
            >
              <Link href={action.href}>
                <div className='flex w-full items-center gap-3'>
                  <div>{action.icon}</div>
                  <div className='flex flex-col items-start text-left'>
                    <span className='font-medium'>{action.title}</span>
                    <span className='text-space-silver text-xs opacity-80'>
                      {action.description}
                    </span>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
