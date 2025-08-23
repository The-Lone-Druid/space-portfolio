import {
  DashboardLayout,
  QuickActions,
  RecentActivity,
  StatsCard,
} from '@/components/dashboard'
import { requireAdmin } from '@/lib/auth-utils'
import { Briefcase, Eye, MessageSquare, Star } from 'lucide-react'

export default async function AdminDashboard() {
  // Require admin authentication
  await requireAdmin()
  const statsData = [
    {
      title: 'Total Projects',
      value: 12,
      description: 'Active projects',
      icon: <Briefcase className='h-4 w-4' />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Skills',
      value: 25,
      description: 'Technical skills',
      icon: <Star className='h-4 w-4' />,
      trend: { value: 4, isPositive: true },
    },
    {
      title: 'Contact Messages',
      value: 48,
      description: 'This month',
      icon: <MessageSquare className='h-4 w-4' />,
      trend: { value: 23, isPositive: true },
    },
    {
      title: 'Portfolio Views',
      value: '2.4k',
      description: 'Last 30 days',
      icon: <Eye className='h-4 w-4' />,
      trend: { value: 18, isPositive: true },
    },
  ]

  const recentActivities = [
    {
      id: '1',
      type: 'message' as const,
      title: 'New contact message',
      description: 'John Doe sent a message about collaboration',
      timestamp: '2 minutes ago',
      metadata: { status: 'success' as const },
    },
    {
      id: '2',
      type: 'project_view' as const,
      title: 'Project viewed',
      description: 'Cosmic Portfolio project was viewed',
      timestamp: '1 hour ago',
      metadata: { count: 15, url: '/projects/cosmic-portfolio' },
    },
    {
      id: '3',
      type: 'skill_update' as const,
      title: 'Skills updated',
      description: 'Added React Native to skills list',
      timestamp: '3 hours ago',
      metadata: { status: 'success' as const },
    },
    {
      id: '4',
      type: 'login' as const,
      title: 'Admin login',
      description: 'Successful login from new device',
      timestamp: '5 hours ago',
      metadata: { status: 'warning' as const },
    },
  ]

  return (
    <DashboardLayout title='Dashboard Overview'>
      <div className='space-y-6'>
        {/* Welcome Section */}
        <div className='space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight text-slate-100'>
            Welcome back!
          </h2>
          <p className='text-slate-400'>
            Here&apos;s what&apos;s happening with your space portfolio today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className='grid gap-6 md:grid-cols-7'>
          {/* Recent Activity */}
          <div className='md:col-span-4'>
            <RecentActivity activities={recentActivities} />
          </div>

          {/* Quick Actions */}
          <div className='md:col-span-3'>
            <QuickActions />
          </div>
        </div>

        {/* Additional Content */}
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Quick Stats</h3>
            <div className='grid gap-3'>
              <div className='flex items-center justify-between rounded-lg border p-3'>
                <span className='text-sm font-medium'>
                  Total Portfolio Views
                </span>
                <span className='text-muted-foreground text-sm'>24,847</span>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-3'>
                <span className='text-sm font-medium'>
                  Average Session Duration
                </span>
                <span className='text-muted-foreground text-sm'>3m 24s</span>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-3'>
                <span className='text-sm font-medium'>Bounce Rate</span>
                <span className='text-muted-foreground text-sm'>24.5%</span>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Popular Projects</h3>
            <div className='grid gap-3'>
              <div className='flex items-center justify-between rounded-lg border p-3'>
                <span className='text-sm font-medium'>Cosmic Portfolio</span>
                <span className='text-muted-foreground text-sm'>
                  1,247 views
                </span>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-3'>
                <span className='text-sm font-medium'>Spotfinder</span>
                <span className='text-muted-foreground text-sm'>892 views</span>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-3'>
                <span className='text-sm font-medium'>Neev Healthcare</span>
                <span className='text-muted-foreground text-sm'>634 views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
