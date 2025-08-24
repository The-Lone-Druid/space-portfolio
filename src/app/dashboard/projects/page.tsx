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
import { getProjectsServer, getProjectsStats } from '@/services/projects-server'
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
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Total Projects</p>
                <p className='font-semibold text-white'>
                  {stats.totalProjects}
                </p>
              </div>
              <FolderOpen className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Featured Projects</p>
                <p className='font-semibold text-white'>
                  {stats.featuredProjects}
                </p>
              </div>
              <Star className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Last Updated</p>
                <p className='font-semibold text-white'>
                  {stats.lastUpdated
                    ? formatDistanceToNow(stats.lastUpdated, {
                        addSuffix: true,
                      })
                    : 'Never'}
                </p>
              </div>
              <Calendar className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-white'>Project Portfolio</CardTitle>
              <CardDescription className='text-white/70'>
                Your digital creations and contributions to the cosmos
              </CardDescription>
            </div>
            <CreateProjectDialog>
              <Button className='bg-space-accent hover:bg-space-accent/80 text-black'>
                <Plus className='mr-2 h-4 w-4' />
                Add Project
              </Button>
            </CreateProjectDialog>
          </div>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className='flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
              <FolderOpen className='mb-4 h-12 w-12 text-white/40' />
              <h3 className='mb-2 text-lg font-semibold text-white'>
                No projects yet
              </h3>
              <p className='mb-4 text-sm text-white/70'>
                Start building your portfolio by adding your first project.
              </p>
              <CreateProjectDialog>
                <Button className='bg-space-accent hover:bg-space-accent/80 text-black'>
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
