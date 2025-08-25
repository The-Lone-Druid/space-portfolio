'use client'

import type { DashboardStats } from '@/app/api/dashboard/route'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Briefcase, FolderOpen, Target, TrendingUp } from 'lucide-react'

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
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index} className='glass-nebula border-space-accent/30'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm text-white/70'>{stat.title}</p>
                  <div className='flex items-baseline gap-2'>
                    <p className='text-2xl font-bold text-white'>
                      {stat.value}
                    </p>
                    {stat.value > 0 && (
                      <TrendingUp className='h-4 w-4 text-green-400' />
                    )}
                  </div>
                  <p className='text-xs text-white/50'>{stat.subtext}</p>
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
