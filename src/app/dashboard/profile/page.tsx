import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { authOptions } from '@/lib/auth'
import { User, Mail, Clock, Shield, BarChart3, Settings } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { getProjectsServer } from '../../../services/projects-service'
import { getServicesServer } from '../../../services/services-service'
import { getSkillsServer } from '../../../services/skills-service'

export default async function ProfilePage() {
  // Server-side data fetching
  const session = await getServerSession(authOptions)
  const user = session?.user

  // Fetch dashboard data to show real statistics
  const [projects, skills, services] = await Promise.all([
    getProjectsServer(),
    getSkillsServer(),
    getServicesServer(),
  ])

  if (!user) {
    return null
  }

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
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Profile Overview'
        description='Your account information and dashboard statistics.'
      />

      {/* Main Profile Card */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <User className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Account Information</CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Your basic account details and role information
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

          {/* Account Details */}
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4 text-white/60' />
                <span className='text-sm text-white/60'>Last Activity</span>
              </div>
              <p className='text-sm font-medium text-white'>
                {formatDistanceToNow(new Date(), { addSuffix: true })}
              </p>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Shield className='h-4 w-4 text-white/60' />
                <span className='text-sm text-white/60'>Account Role</span>
              </div>
              <p className='text-sm font-medium text-white'>
                {user?.role || 'USER'} Access Level
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Statistics */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <BarChart3 className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Dashboard Statistics</CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Overview of your content and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-lg bg-white/5 p-4'>
            <div className='grid grid-cols-3 gap-4 text-center'>
              <div>
                <p className='text-space-gold text-2xl font-semibold'>
                  {projects?.length || 0}
                </p>
                <p className='text-sm text-white/60'>Projects</p>
              </div>
              <div>
                <p className='text-space-gold text-2xl font-semibold'>
                  {skills?.length || 0}
                </p>
                <p className='text-sm text-white/60'>Skills</p>
              </div>
              <div>
                <p className='text-space-gold text-2xl font-semibold'>
                  {services?.length || 0}
                </p>
                <p className='text-sm text-white/60'>Services</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Information */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <Settings className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Session Information</CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Current session and authentication status
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <span className='text-sm text-white/60'>
                Authentication Status
              </span>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-green-500' />
                <span className='text-sm font-medium text-white'>
                  Active Session
                </span>
              </div>
            </div>
            <div className='space-y-2'>
              <span className='text-sm text-white/60'>Account ID</span>
              <span className='font-mono text-sm font-medium text-white'>
                {user?.id || 'Unknown'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
