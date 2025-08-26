import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { Calendar, Clock, Edit, Mail, User } from 'lucide-react'
import Image from 'next/image'

interface ProfileUser {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
}

interface ProfileOverviewCardProps {
  user?: ProfileUser
}

export function ProfileOverviewCard({ user }: ProfileOverviewCardProps) {
  const getRoleBadgeVariant = (role?: string) => {
    switch (role?.toUpperCase()) {
      case 'ADMIN':
        return 'destructive'
      case 'EDITOR':
        return 'default'
      default:
        return 'secondary'
    }
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <User className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Profile Overview</CardTitle>
          </div>
          <Button variant='outline' size='sm' className='gap-2'>
            <Edit className='h-4 w-4' />
            Edit
          </Button>
        </div>
        <CardDescription className='text-white/70'>
          Your account information and settings
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Avatar and Basic Info */}
        <div className='flex items-start gap-6'>
          <div className='relative'>
            <div className='from-space-accent/20 to-space-gold/20 border-space-accent/30 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border bg-gradient-to-br'>
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'Profile'}
                  width={80}
                  height={80}
                  className='h-full w-full object-cover'
                />
              ) : (
                <User className='text-space-gold h-8 w-8' />
              )}
            </div>
            <div className='border-space-cosmic absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-2 bg-green-500' />
          </div>
          <div className='flex-1 space-y-3'>
            <div className='space-y-2'>
              <div className='flex items-center gap-3'>
                <h3 className='text-lg font-semibold text-white'>
                  {user?.name || 'Unknown User'}
                </h3>
                <Badge
                  variant={getRoleBadgeVariant(user?.role)}
                  className='text-xs'
                >
                  {user?.role || 'USER'}
                </Badge>
              </div>
              <div className='flex items-center gap-2 text-white/70'>
                <Mail className='h-4 w-4' />
                <span className='text-sm'>
                  {user?.email || 'No email provided'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details Grid */}
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-white/60' />
              <span className='text-sm text-white/60'>Account Created</span>
            </div>
            <p className='text-sm font-medium text-white'>Recently</p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-white/60' />
              <span className='text-sm text-white/60'>Last Activity</span>
            </div>
            <p className='text-sm font-medium text-white'>
              {formatDistanceToNow(new Date(), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Bio Section */}
        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-white/80'>Bio</h4>
          <p className='text-sm leading-relaxed text-white/60'>
            Space explorer and digital architect navigating the cosmos of
            technology. Building stellar experiences across the digital
            frontier.
          </p>
        </div>

        {/* Quick Stats */}
        <div className='rounded-lg bg-white/5 p-4'>
          <div className='grid grid-cols-3 gap-4 text-center'>
            <div>
              <p className='text-space-gold text-lg font-semibold'>0</p>
              <p className='text-xs text-white/60'>Projects</p>
            </div>
            <div>
              <p className='text-space-gold text-lg font-semibold'>0</p>
              <p className='text-xs text-white/60'>Skills</p>
            </div>
            <div>
              <p className='text-space-gold text-lg font-semibold'>0</p>
              <p className='text-xs text-white/60'>Services</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
