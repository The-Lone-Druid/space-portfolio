'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Award, Briefcase, FolderOpen, Target, TrendingUp } from 'lucide-react'
import { DashboardStats } from '../../types'

interface QuickStatsOverviewProps {
  data: DashboardStats
}

export function QuickStatsOverview({ data }: QuickStatsOverviewProps) {
  const { projects, skills, services, heroStats } = data

  const stats = [
    {
      title: 'Projects',
      value: projects.total,
      icon: FolderOpen,
      subtext: `${projects.featured} featured`,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'Skills',
      value: skills.total,
      icon: Target,
      subtext: `${skills.avgProficiency}% avg level`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      title: 'Services',
      value: services.total,
      icon: Briefcase,
      subtext: 'offerings',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
    {
      title: 'Experience',
      value: heroStats.yearsOfExperience,
      icon: Award,
      subtext: 'years',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
  ]

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card
            key={index}
            className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'
          >
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-white/70'>
                    {stat.title}
                  </p>
                  <div className='flex items-baseline gap-2'>
                    <p className='text-2xl font-bold text-white'>
                      {stat.value}
                    </p>
                    {stat.value > 0 && (
                      <TrendingUp className='h-4 w-4 text-green-400' />
                    )}
                  </div>
                  <p className='text-xs text-white/60'>{stat.subtext}</p>
                </div>
                <div className={`rounded-full p-3 ${stat.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
