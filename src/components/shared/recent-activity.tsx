'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  ExternalLink,
  Eye,
  MessageSquare,
  MoreHorizontal,
} from 'lucide-react'

interface RecentActivityItem {
  id: string
  type: 'message' | 'project_view' | 'skill_update' | 'login'
  title: string
  description: string
  timestamp: string
  metadata?: {
    status?: 'success' | 'warning' | 'error'
    count?: number
    url?: string
  }
}

interface RecentActivityProps {
  activities: RecentActivityItem[]
}

const activityIcons = {
  message: MessageSquare,
  project_view: Eye,
  skill_update: Calendar,
  login: Calendar,
}

const activityColors = {
  message: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  project_view: 'bg-green-500/20 text-green-300 border-green-400/30',
  skill_update: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
  login: 'bg-space-accent/20 text-space-accent border-space-accent/30',
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className='glass-cosmic hover:glass-nebula col-span-4 border-white/20 transition-all duration-300'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-white'>Recent Activity</CardTitle>
        <Button
          variant='ghost'
          size='sm'
          className='text-white hover:bg-white/10'
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {activities.map(activity => {
            const Icon = activityIcons[activity.type]
            const colorClass = activityColors[activity.type]

            return (
              <div key={activity.id} className='flex items-start space-x-4'>
                <div className={`rounded-full border p-2 ${colorClass}`}>
                  <Icon className='h-3 w-3' />
                </div>
                <div className='flex-1 space-y-1'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium text-white'>
                      {activity.title}
                    </p>
                    <span className='text-space-silver text-xs opacity-80'>
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className='text-space-silver text-xs opacity-70'>
                    {activity.description}
                  </p>
                  {activity.metadata && (
                    <div className='flex items-center gap-2'>
                      {activity.metadata.status && (
                        <Badge
                          variant={
                            activity.metadata.status === 'success'
                              ? 'default'
                              : activity.metadata.status === 'warning'
                                ? 'secondary'
                                : 'destructive'
                          }
                          className='text-xs'
                        >
                          {activity.metadata.status}
                        </Badge>
                      )}
                      {activity.metadata.count && (
                        <span className='text-space-silver text-xs opacity-80'>
                          {activity.metadata.count} views
                        </span>
                      )}
                      {activity.metadata.url && (
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-space-gold h-auto p-0 hover:text-white'
                        >
                          <ExternalLink className='h-3 w-3' />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
