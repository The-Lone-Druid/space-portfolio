import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatProjectDateRange } from '@/lib/project-date-utils'
import { getProjectByIdServer } from '@/services/projects-service'
import { formatDistanceToNow } from 'date-fns'
import {
  ArrowLeft,
  CheckCircle,
  Edit,
  ExternalLink,
  Github,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditProjectDialog } from '../../../../components/dashboard/project/edit-project-dialog'

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params
  const projectId = parseInt(id)

  if (isNaN(projectId)) {
    notFound()
  }

  const project = await getProjectByIdServer(projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <DashboardPageHeader
        title={project.projectName}
        description={`Project details and management for ${project.projectName}`}
      />

      {/* Navigation */}
      <div className='flex items-center justify-between'>
        <Button variant='outline' asChild>
          <Link href='/dashboard/projects'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Projects
          </Link>
        </Button>

        <div className='flex gap-2'>
          <EditProjectDialog project={project}>
            <Button variant='stellar'>
              <Edit className='mr-2 h-4 w-4' />
              Edit Project
            </Button>
          </EditProjectDialog>
        </div>
      </div>

      {/* Project Overview Card */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader className='pb-4'>
          <div className='flex items-start justify-between'>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <CardTitle className='text-2xl text-white'>
                  {project.projectName}
                </CardTitle>
                {project.featured && (
                  <Badge className='border-yellow-500/30 bg-yellow-500/20 text-yellow-400'>
                    <Star className='mr-1 h-3 w-3' />
                    Featured
                  </Badge>
                )}
              </div>

              <div className='flex flex-wrap gap-4 text-sm'>
                <div className='flex items-center gap-2 text-white/70'>
                  <span className='font-medium'>Duration:</span>
                  <span>
                    {formatProjectDateRange({
                      startDate: project.startDate,
                      endDate: project.endDate || undefined,
                      isOngoing: project.isOngoing,
                    })}
                  </span>
                </div>

                <div className='flex items-center gap-2 text-white/60'>
                  <span className='font-medium'>Last updated:</span>
                  <span>
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Grid */}
      <div className='grid gap-8 lg:grid-cols-3'>
        {/* Left Column - Main Content */}
        <div className='space-y-8 lg:col-span-2'>
          {/* Description */}
          <Card className='glass-cosmic border-white/10'>
            <CardHeader>
              <CardTitle className='text-white'>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='leading-relaxed text-white/80'>
                {project.projectDescription}
              </p>
            </CardContent>
          </Card>

          {/* Project Tasks */}
          {project.projectTasks.length > 0 && (
            <Card className='glass-cosmic border-white/10'>
              <CardHeader>
                <CardTitle className='text-white'>
                  Project Tasks ({project.projectTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {project.projectTasks.map(task => (
                  <div
                    key={task.id}
                    className='flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10'
                  >
                    <CheckCircle className='h-5 w-5 flex-shrink-0 text-green-400' />
                    <span className='text-white/80'>{task.task}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className='space-y-6'>
          {/* Quick Actions */}
          <Card className='glass-cosmic border-white/10'>
            <CardHeader>
              <CardTitle className='text-white'>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {project.projectLink && (
                <Button
                  variant='nebula'
                  className='w-full justify-start'
                  asChild
                >
                  <a
                    href={project.projectLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <ExternalLink className='mr-2 h-4 w-4' />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.githubLink && (
                <Button
                  variant='cosmic'
                  className='w-full justify-start'
                  asChild
                >
                  <a
                    href={project.githubLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Github className='mr-2 h-4 w-4' />
                    View Source Code
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Skills & Technologies */}
          {project.skillsUtilized.length > 0 && (
            <Card className='glass-cosmic border-white/10'>
              <CardHeader>
                <CardTitle className='text-white'>
                  Skills & Technologies ({project.skillsUtilized.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {project.skillsUtilized.map(skill => (
                    <Badge
                      key={skill.id}
                      variant='secondary'
                      className='border-space-accent/30 bg-space-accent/20 text-space-accent hover:bg-space-accent/30 cursor-default transition-colors'
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Project Stats */}
          <Card className='glass-cosmic border-white/10'>
            <CardHeader>
              <CardTitle className='text-white'>Project Stats</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-white/70'>Status</span>
                <Badge
                  variant='outline'
                  className={
                    project.isOngoing
                      ? 'border-green-500/30 bg-green-500/10 text-green-400'
                      : 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                  }
                >
                  {project.isOngoing ? 'Ongoing' : 'Completed'}
                </Badge>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-white/70'>Tasks</span>
                <span className='font-medium text-white'>
                  {project.projectTasks.length}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-white/70'>Technologies</span>
                <span className='font-medium text-white'>
                  {project.skillsUtilized.length}
                </span>
              </div>

              {project.featured && (
                <div className='flex items-center justify-between'>
                  <span className='text-white/70'>Featured</span>
                  <Star className='h-4 w-4 text-yellow-400' />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
