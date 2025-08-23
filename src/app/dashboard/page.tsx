import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  BarChart3,
  Eye,
  FolderOpen,
  MessageSquare,
  Plus,
  Rocket,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react'

const stats = [
  {
    title: 'Total Projects',
    value: '12',
    change: '+2 this month',
    icon: FolderOpen,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  {
    title: 'Page Views',
    value: '2,847',
    change: '+18% from last month',
    icon: Eye,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
  {
    title: 'Visitors',
    value: '1,234',
    change: '+12% from last month',
    icon: Users,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
  },
  {
    title: 'Messages',
    value: '23',
    change: '5 unread',
    icon: MessageSquare,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
  },
]

const recentProjects = [
  {
    name: 'Space Explorer Dashboard',
    status: 'In Progress',
    progress: 75,
    dueDate: '2025-09-15',
  },
  {
    name: 'Portfolio Redesign',
    status: 'Completed',
    progress: 100,
    dueDate: '2025-08-20',
  },
  {
    name: 'E-commerce Platform',
    status: 'Planning',
    progress: 20,
    dueDate: '2025-10-01',
  },
]

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Dashboard Overview'
        description="Welcome back! Here's what's happening with your portfolio."
        actions={
          <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
            <Plus className='mr-2 h-4 w-4' />
            Quick Action
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map(stat => (
          <Card
            key={stat.title}
            className='glass-nebula border-space-accent/30 hover:border-space-accent/50 transition-all duration-300'
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-white'>
                {stat.title}
              </CardTitle>
              <div
                className={`h-8 w-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className='mb-1 text-2xl font-bold text-white'>
                {stat.value}
              </div>
              <p className='text-xs text-white/60'>{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Recent Projects */}
        <Card className='glass-nebula border-space-accent/30 lg:col-span-2'>
          <CardHeader>
            <CardTitle className='text-white'>Recent Projects</CardTitle>
            <CardDescription className='text-white/70'>
              Your latest projects and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentProjects.map(project => (
                <div
                  key={project.name}
                  className='bg-space-cosmic/30 hover:border-space-accent/30 flex items-center justify-between space-x-4 rounded-lg border border-white/10 p-4 transition-all duration-300'
                >
                  <div className='flex-1 space-y-2'>
                    <p className='leading-none font-medium text-white'>
                      {project.name}
                    </p>
                    <div className='flex items-center space-x-2'>
                      <Badge
                        variant={
                          project.status === 'Completed'
                            ? 'default'
                            : project.status === 'In Progress'
                              ? 'secondary'
                              : 'outline'
                        }
                        className={
                          project.status === 'Completed'
                            ? 'border-green-500/30 bg-green-500/20 text-green-400'
                            : project.status === 'In Progress'
                              ? 'border-blue-500/30 bg-blue-500/20 text-blue-400'
                              : 'border-orange-500/30 bg-orange-500/20 text-orange-400'
                        }
                      >
                        {project.status}
                      </Badge>
                      <span className='text-sm text-white/60'>
                        Due: {project.dueDate}
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Progress
                        value={project.progress}
                        className='bg-space-deep h-2 flex-1'
                      />
                      <span className='min-w-[3rem] text-sm text-white/70'>
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-6'>
              <Button
                variant='outline'
                className='border-space-accent/30 hover:bg-space-accent/20 hover:border-space-accent/50 w-full bg-transparent text-white'
              >
                <FolderOpen className='mr-2 h-4 w-4' />
                View All Projects
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Analytics */}
        <div className='space-y-6'>
          {/* Quick Actions */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='text-white'>Quick Actions</CardTitle>
              <CardDescription className='text-white/70'>
                Common dashboard tasks
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button className='bg-space-accent hover:bg-space-accent/80 w-full justify-start text-white'>
                <FolderOpen className='mr-2 h-4 w-4' />
                Create New Project
              </Button>
              <Button
                variant='outline'
                className='border-space-accent/30 hover:bg-space-accent/20 hover:border-space-accent/50 w-full justify-start bg-transparent text-white'
              >
                <MessageSquare className='mr-2 h-4 w-4' />
                View Messages
              </Button>
              <Button
                variant='outline'
                className='border-space-accent/30 hover:bg-space-accent/20 hover:border-space-accent/50 w-full justify-start bg-transparent text-white'
              >
                <BarChart3 className='mr-2 h-4 w-4' />
                View Analytics
              </Button>
              <Button
                variant='outline'
                className='border-space-accent/30 hover:bg-space-accent/20 hover:border-space-accent/50 w-full justify-start bg-transparent text-white'
              >
                <Settings className='mr-2 h-4 w-4' />
                Settings
              </Button>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='text-white'>Performance</CardTitle>
              <CardDescription className='text-white/70'>
                This month&apos;s overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <div className='mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20'>
                    <TrendingUp className='h-4 w-4 text-green-400' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-white'>
                      Site Performance
                    </p>
                    <Progress value={87} className='bg-space-deep mt-2 h-2' />
                  </div>
                  <span className='ml-2 text-sm text-white/70'>87%</span>
                </div>
                <div className='flex items-center'>
                  <div className='mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20'>
                    <Eye className='h-4 w-4 text-blue-400' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-white'>SEO Score</p>
                    <Progress value={94} className='bg-space-deep mt-2 h-2' />
                  </div>
                  <span className='ml-2 text-sm text-white/70'>94%</span>
                </div>
                <div className='flex items-center'>
                  <div className='mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20'>
                    <Users className='h-4 w-4 text-purple-400' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-white'>
                      User Engagement
                    </p>
                    <Progress value={72} className='bg-space-deep mt-2 h-2' />
                  </div>
                  <span className='ml-2 text-sm text-white/70'>72%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Space Stats */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='flex items-center text-white'>
                <Rocket className='text-space-gold mr-2 h-5 w-5' />
                Space Metrics
              </CardTitle>
              <CardDescription className='text-white/70'>
                Portfolio reach across the cosmos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-white/80'>Global Reach</span>
                  <span className='text-space-gold text-sm font-medium'>
                    42 Countries
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-white/80'>Tech Stack</span>
                  <span className='text-space-gold text-sm font-medium'>
                    15+ Technologies
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-white/80'>Experience</span>
                  <span className='text-space-gold text-sm font-medium'>
                    5+ Years
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-white/80'>
                    Projects Launched
                  </span>
                  <span className='text-space-gold text-sm font-medium'>
                    50+ Projects
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
