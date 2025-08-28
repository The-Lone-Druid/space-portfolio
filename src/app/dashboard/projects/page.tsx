import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { CreateProjectDialog } from '@/components/dashboard/project/create-project-dialog'
import { ProjectListClient } from '@/components/dashboard/project/project-list-client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  getProjectsServer,
  getProjectsStats,
} from '@/services/projects-service'
import { formatDistanceToNow } from 'date-fns'
import { Calendar, FolderOpen, Plus, Star } from 'lucide-react'

export default async function ProjectsPage() {
  // Server-side data fetching
  const [projects, stats] = await Promise.all([
    getProjectsServer(),
    getProjectsStats(),
  ])

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Projects'
        description='Manage your projects and collaborations across the digital cosmos.'
      />

      {/* Stats Overview */}
      <div className='grid gap-6 md:grid-cols-3'>
        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Total Projects
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.totalProjects}
                </p>
                <p className='text-xs text-white/60'>In your portfolio</p>
              </div>
              <div className='bg-space-accent/20 rounded-full p-3'>
                <FolderOpen className='text-space-accent h-6 w-6' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Featured Projects
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.featuredProjects}
                </p>
                <p className='text-xs text-white/60'>Highlighted works</p>
              </div>
              <div className='rounded-full bg-yellow-500/20 p-3'>
                <Star className='h-6 w-6 text-yellow-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Last Updated
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.lastUpdated
                    ? formatDistanceToNow(stats.lastUpdated, {
                        addSuffix: true,
                      }).split(' ')[0]
                    : 'Never'}
                </p>
                <p className='text-xs text-white/60'>
                  {stats.lastUpdated ? 'ago' : 'No updates yet'}
                </p>
              </div>
              <div className='rounded-full bg-blue-500/20 p-3'>
                <Calendar className='h-6 w-6 text-blue-400' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <Card className='glass-cosmic border-white/10'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <CardTitle className='text-xl text-white'>
                Project Portfolio
              </CardTitle>
              <CardDescription className='text-white/70'>
                Your digital creations and contributions to the cosmos
              </CardDescription>
            </div>
            <CreateProjectDialog>
              <Button variant='stellar' size='lg'>
                <Plus className='mr-2 h-4 w-4' />
                Add Project
              </Button>
            </CreateProjectDialog>
          </div>
          {stats.lastUpdated && (
            <div className='flex items-center gap-2 border-t border-white/10 pt-2 text-xs text-white/60'>
              <Calendar className='h-3 w-3' />
              <span>
                Last updated:{' '}
                {formatDistanceToNow(stats.lastUpdated, { addSuffix: true })}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent className='pt-2'>
          {projects.length === 0 ? (
            <div className='flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
              <div className='mb-4 rounded-full bg-white/10 p-4'>
                <FolderOpen className='h-12 w-12 text-white/40' />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-white'>
                No projects yet
              </h3>
              <p className='mb-6 max-w-md text-sm text-white/70'>
                Start building your portfolio by adding your first project.
                Showcase your digital creations and technical achievements.
              </p>
              <CreateProjectDialog>
                <Button variant='stellar' size='lg'>
                  <Plus className='mr-2 h-4 w-4' />
                  Add Your First Project
                </Button>
              </CreateProjectDialog>
            </div>
          ) : (
            <ProjectListClient projects={projects} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
