import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { authOptions } from '@/lib/auth'
import {
  User,
  Mail,
  Clock,
  Shield,
  BarChart3,
  Settings,
  Calendar,
  Activity,
  Star,
  Briefcase,
  Code,
  Database,
  Globe,
  Github,
  Linkedin,
  Edit,
} from 'lucide-react'
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

  // Calculate additional statistics
  const featuredProjects = projects?.filter(p => p.featured) || []
  const activeServices = services?.filter(s => s.isActive) || []
  const totalTechnologies = skills?.length || 0

  return (
    <div className='space-y-8'>
      {/* Header */}
      <DashboardPageHeader
        title='Profile Overview'
        description='Your account information, dashboard statistics, and professional overview.'
      />

      {/* Profile Hero Section */}
      <Card className='glass-cosmic border-white/10'>
        <CardContent className='p-8'>
          <div className='flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left'>
            {/* Avatar */}
            <div className='relative'>
              <div className='from-space-accent/20 to-space-gold/20 relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 bg-gradient-to-br'>
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'Profile'}
                    width={128}
                    height={128}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20'>
                    <User className='h-16 w-16 text-white/60' />
                  </div>
                )}
              </div>
              <div className='border-space-cosmic absolute -right-2 -bottom-2 h-8 w-8 rounded-full border-4 bg-green-500'></div>
            </div>

            {/* Profile Info */}
            <div className='flex-1 space-y-4'>
              <div className='space-y-2'>
                <div className='flex flex-col items-center gap-3 lg:flex-row'>
                  <h1 className='text-3xl font-bold text-white'>
                    {user?.name || 'Space Developer'}
                  </h1>
                  <Badge
                    variant={getRoleBadgeVariant(user?.role)}
                    className='text-sm font-medium'
                  >
                    <Shield className='mr-1 h-3 w-3' />
                    {user?.role || 'USER'}
                  </Badge>
                </div>
                <div className='flex items-center justify-center gap-2 text-white/70 lg:justify-start'>
                  <Mail className='h-4 w-4' />
                  <span>{user?.email || 'No email provided'}</span>
                </div>
                <div className='flex items-center justify-center gap-2 text-white/60 lg:justify-start'>
                  <Activity className='h-4 w-4' />
                  <span className='text-sm'>
                    Active{' '}
                    {formatDistanceToNow(new Date(), { addSuffix: true })}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className='flex flex-wrap justify-center gap-3 lg:justify-start'>
                <Button variant='stellar' size='sm'>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Profile
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-white/20 bg-white/5 text-white hover:bg-white/10'
                >
                  <Settings className='mr-2 h-4 w-4' />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Dashboard Statistics */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Main Stats */}
        <Card className='glass-cosmic border-white/10 lg:col-span-2'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <BarChart3 className='text-space-accent h-5 w-5' />
              <CardTitle className='text-xl text-white'>
                Dashboard Statistics
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Overview of your portfolio content and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Projects Stats */}
              <div className='space-y-4 rounded-lg border border-white/10 bg-white/5 p-4'>
                <div className='flex items-center gap-3'>
                  <div className='rounded-full bg-blue-500/20 p-2'>
                    <Briefcase className='h-4 w-4 text-blue-400' />
                  </div>
                  <span className='text-sm font-medium text-white/70'>
                    Projects
                  </span>
                </div>
                <div className='space-y-1'>
                  <p className='text-2xl font-bold text-white'>
                    {projects?.length || 0}
                  </p>
                  <p className='text-xs text-white/60'>
                    {featuredProjects.length} featured
                  </p>
                </div>
              </div>

              {/* Skills Stats */}
              <div className='space-y-4 rounded-lg border border-white/10 bg-white/5 p-4'>
                <div className='flex items-center gap-3'>
                  <div className='rounded-full bg-green-500/20 p-2'>
                    <Code className='h-4 w-4 text-green-400' />
                  </div>
                  <span className='text-sm font-medium text-white/70'>
                    Technologies
                  </span>
                </div>
                <div className='space-y-1'>
                  <p className='text-2xl font-bold text-white'>
                    {totalTechnologies}
                  </p>
                  <p className='text-xs text-white/60'>
                    Across multiple domains
                  </p>
                </div>
              </div>

              {/* Services Stats */}
              <div className='space-y-4 rounded-lg border border-white/10 bg-white/5 p-4'>
                <div className='flex items-center gap-3'>
                  <div className='rounded-full bg-purple-500/20 p-2'>
                    <Database className='h-4 w-4 text-purple-400' />
                  </div>
                  <span className='text-sm font-medium text-white/70'>
                    Services
                  </span>
                </div>
                <div className='space-y-1'>
                  <p className='text-2xl font-bold text-white'>
                    {services?.length || 0}
                  </p>
                  <p className='text-xs text-white/60'>
                    {activeServices.length} active
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <Star className='h-4 w-4 text-yellow-400' />
                  <span className='text-sm text-white/70'>Featured Work</span>
                </div>
                <span className='font-semibold text-white'>
                  {featuredProjects.length}
                </span>
              </div>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <Activity className='h-4 w-4 text-green-400' />
                  <span className='text-sm text-white/70'>Active Services</span>
                </div>
                <span className='font-semibold text-white'>
                  {activeServices.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links & Actions */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Settings className='text-space-accent h-5 w-5' />
              <CardTitle className='text-lg text-white'>
                Quick Actions
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Manage your portfolio content
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Button
              variant='outline'
              className='w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              <User className='mr-3 h-4 w-4' />
              Edit Profile
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              <Briefcase className='mr-3 h-4 w-4' />
              Manage Projects
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              <Code className='mr-3 h-4 w-4' />
              Update Skills
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              <Database className='mr-3 h-4 w-4' />
              Manage Services
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Account & Session Information */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Account Information */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Shield className='text-space-accent h-5 w-5' />
              <CardTitle className='text-lg text-white'>
                Account Details
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Your account information and access level
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid gap-4'>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <Mail className='h-4 w-4 text-blue-400' />
                  <span className='text-sm text-white/70'>Email</span>
                </div>
                <span className='text-sm font-medium text-white'>
                  {user?.email}
                </span>
              </div>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <Shield className='h-4 w-4 text-green-400' />
                  <span className='text-sm text-white/70'>Role</span>
                </div>
                <Badge
                  variant={getRoleBadgeVariant(user?.role)}
                  className='text-xs'
                >
                  {user?.role || 'USER'}
                </Badge>
              </div>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <Calendar className='h-4 w-4 text-purple-400' />
                  <span className='text-sm text-white/70'>Account ID</span>
                </div>
                <span className='font-mono text-xs text-white/80'>
                  {user?.id || 'Unknown'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session & Activity */}
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Activity className='text-space-accent h-5 w-5' />
              <CardTitle className='text-lg text-white'>
                Session & Activity
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Current session status and recent activity
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid gap-4'>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                  <span className='text-sm text-white/70'>Status</span>
                </div>
                <span className='text-sm font-medium text-green-400'>
                  Active Session
                </span>
              </div>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <Clock className='h-4 w-4 text-blue-400' />
                  <span className='text-sm text-white/70'>Last Activity</span>
                </div>
                <span className='text-sm text-white'>
                  {formatDistanceToNow(new Date(), { addSuffix: true })}
                </span>
              </div>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='flex items-center gap-3'>
                  <Globe className='h-4 w-4 text-purple-400' />
                  <span className='text-sm text-white/70'>Access Level</span>
                </div>
                <span className='text-sm font-medium text-white'>
                  {user?.role || 'USER'} Access
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Links Section */}
      <Card className='glass-cosmic border-white/10'>
        <CardHeader className='pb-4'>
          <div className='flex items-center gap-3'>
            <Globe className='text-space-accent h-5 w-5' />
            <CardTitle className='text-lg text-white'>
              Professional Links
            </CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Connect your professional profiles and showcase your work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <Button
              variant='outline'
              className='h-auto flex-col gap-2 border-white/20 bg-white/5 p-4 text-white hover:bg-white/10'
            >
              <Github className='h-6 w-6' />
              <span className='text-sm'>Connect GitHub</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto flex-col gap-2 border-white/20 bg-white/5 p-4 text-white hover:bg-white/10'
            >
              <Linkedin className='h-6 w-6' />
              <span className='text-sm'>Connect LinkedIn</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto flex-col gap-2 border-white/20 bg-white/5 p-4 text-white hover:bg-white/10'
            >
              <Globe className='h-6 w-6' />
              <span className='text-sm'>Portfolio Website</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
