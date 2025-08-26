import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import {
  Activity,
  ArrowUpRight,
  Calendar,
  Edit,
  Eye,
  Settings,
  Shield,
} from 'lucide-react'

interface ActivityItem {
  action: string
  timestamp: Date
  type?: 'info' | 'warning' | 'success'
}

interface ProfileActivityCardProps {
  activities?: ActivityItem[]
}

export function ProfileActivityCard({
  activities = [],
}: ProfileActivityCardProps) {
  // Mock activities if none provided
  const defaultActivities: ActivityItem[] = [
    { action: 'Profile updated', timestamp: new Date(), type: 'success' },
    {
      action: 'Password changed',
      timestamp: new Date(Date.now() - 86400000),
      type: 'info',
    },
    {
      action: 'New device login detected',
      timestamp: new Date(Date.now() - 172800000),
      type: 'warning',
    },
    {
      action: 'Profile picture updated',
      timestamp: new Date(Date.now() - 259200000),
      type: 'info',
    },
    {
      action: 'Email verified',
      timestamp: new Date(Date.now() - 345600000),
      type: 'success',
    },
    {
      action: 'Account created',
      timestamp: new Date(Date.now() - 432000000),
      type: 'success',
    },
  ]

  const activityList = activities.length > 0 ? activities : defaultActivities

  const getActivityIcon = (action: string) => {
    if (
      action.toLowerCase().includes('password') ||
      action.toLowerCase().includes('security')
    ) {
      return <Shield className='h-4 w-4 text-blue-400' />
    }
    if (
      action.toLowerCase().includes('profile') ||
      action.toLowerCase().includes('picture')
    ) {
      return <Edit className='h-4 w-4 text-green-400' />
    }
    if (
      action.toLowerCase().includes('login') ||
      action.toLowerCase().includes('device')
    ) {
      return <Eye className='h-4 w-4 text-yellow-400' />
    }
    if (action.toLowerCase().includes('settings')) {
      return <Settings className='h-4 w-4 text-purple-400' />
    }
    return <Activity className='text-space-gold h-4 w-4' />
  }

  const getTypeBadge = (type?: string) => {
    switch (type) {
      case 'success':
        return (
          <Badge
            variant='secondary'
            className='border-green-500/30 bg-green-500/20 text-xs text-green-400'
          >
            Success
          </Badge>
        )
      case 'warning':
        return (
          <Badge
            variant='secondary'
            className='border-yellow-500/30 bg-yellow-500/20 text-xs text-yellow-400'
          >
            Warning
          </Badge>
        )
      case 'info':
      default:
        return (
          <Badge
            variant='secondary'
            className='border-blue-500/30 bg-blue-500/20 text-xs text-blue-400'
          >
            Info
          </Badge>
        )
    }
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Activity className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Recent Activity</CardTitle>
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='gap-2 text-white/70 hover:text-white'
          >
            View All
            <ArrowUpRight className='h-4 w-4' />
          </Button>
        </div>
        <CardDescription className='text-white/70'>
          Your recent account activity and changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[300px] pr-4'>
          <div className='space-y-3'>
            {activityList.map((activity, index) => (
              <div
                key={index}
                className='flex items-start gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10'
              >
                <div className='mt-0.5'>{getActivityIcon(activity.action)}</div>
                <div className='flex-1 space-y-1'>
                  <div className='flex items-start justify-between gap-2'>
                    <p className='text-sm leading-relaxed text-white/80'>
                      {activity.action}
                    </p>
                    {getTypeBadge(activity.type)}
                  </div>
                  <div className='flex items-center gap-2 text-xs text-white/60'>
                    <Calendar className='h-3 w-3' />
                    <span>
                      {formatDistanceToNow(activity.timestamp, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Empty State */}
        {activityList.length === 0 && (
          <div className='flex min-h-[200px] flex-col items-center justify-center text-center'>
            <Activity className='mb-4 h-12 w-12 text-white/20' />
            <p className='text-sm text-white/60'>No recent activity</p>
            <p className='mt-1 text-xs text-white/40'>
              Your account activity will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
