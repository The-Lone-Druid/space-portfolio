'use client'

import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useProjects } from '@/hooks/use-projects'
import { Eye, EyeOff, FolderOpen, Star, TrendingUp } from 'lucide-react'

export function ProjectStats() {
  const { projects, isLoading, error } = useProjects()

  if (isLoading) {
    return (
      <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
        <CardContent className='p-6'>
          <div className='flex justify-center'>
            <LoadingSpinner variant='orbit' />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className='border-red-500/30 bg-red-900/20'>
        <CardContent className='p-6'>
          <div className='text-center text-red-400'>
            <p className='text-sm'>Failed to load project statistics</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.isActive).length
  const featuredProjects = projects.filter(p => p.featured).length
  const inactiveProjects = projects.filter(p => !p.isActive).length

  // Recent projects (created in last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const recentProjects = projects.filter(
    p => new Date(p.createdAt) > thirtyDaysAgo
  ).length

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: FolderOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: Eye,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      title: 'Featured Projects',
      value: featuredProjects,
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
    {
      title: 'Inactive Projects',
      value: inactiveProjects,
      icon: EyeOff,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/20',
    },
    {
      title: 'Recent Projects',
      value: recentProjects,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      subtitle: 'Last 30 days',
    },
  ]

  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
      {stats.map(stat => (
        <Card
          key={stat.title}
          className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'
        >
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs font-medium text-gray-400'>
                  {stat.title}
                </p>
                <p className='mt-1 text-2xl font-bold text-white'>
                  {stat.value}
                </p>
                {stat.subtitle && (
                  <p className='mt-1 text-xs text-gray-500'>{stat.subtitle}</p>
                )}
              </div>
              <div
                className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
