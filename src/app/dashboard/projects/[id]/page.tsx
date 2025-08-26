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
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title={project.projectName}
        description={`Project details and management for ${project.projectName}`}
      />

      {/* Back Button */}
      <Button variant='link' asChild>
        <Link href='/dashboard/projects'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Projects
        </Link>
      </Button>

      {/* Project Details */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='space-y-2'>
              <div className='flex items-center gap-3'>
                <CardTitle className='text-white'>
                  {project.projectName}
                </CardTitle>
                {project.featured && (
                  <Badge className='border-yellow-500/30 bg-yellow-500/20 text-yellow-400'>
                    <Star className='mr-1 h-3 w-3' />
                    Featured
                  </Badge>
                )}
              </div>
              <CardDescription className='text-white/70'>
                Created:{' '}
                {formatProjectDateRange({
                  startDate: project.startDate,
                  endDate: project.endDate || undefined,
                  isOngoing: project.isOngoing,
                })}
              </CardDescription>
              <CardDescription className='text-white/60'>
                Last updated:{' '}
                {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
              </CardDescription>
            </div>
            <Button size='sm' variant='stellar'>
              <Edit className='mr-2 h-4 w-4' />
              Edit Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Description */}
          <div>
            <h3 className='mb-2 text-lg font-semibold text-white'>
              Description
            </h3>
            <p className='text-white/80'>{project.projectDescription}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className='mb-3 text-lg font-semibold text-white'>Links</h3>
            <div className='flex gap-3'>
              {project.projectLink && (
                <Button variant='nebula' asChild>
                  <a
                    href={project.projectLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <ExternalLink className='mr-2 h-4 w-4' />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubLink && (
                <Button variant='cosmic' asChild>
                  <a
                    href={project.githubLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Github className='mr-2 h-4 w-4' />
                    Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Skills */}
          {project.skillsUtilized.length > 0 && (
            <div>
              <h3 className='mb-3 text-lg font-semibold text-white'>
                Skills & Technologies
              </h3>
              <div className='flex flex-wrap gap-2'>
                {project.skillsUtilized.map(skill => (
                  <Badge
                    key={skill.id}
                    variant='secondary'
                    className='border-space-accent/30 bg-space-accent/20 text-space-accent'
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {project.projectTasks.length > 0 && (
            <div>
              <h3 className='mb-3 text-lg font-semibold text-white'>
                Project Tasks
              </h3>
              <div className='space-y-2'>
                {project.projectTasks.map(task => (
                  <div
                    key={task.id}
                    className='flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3'
                  >
                    <CheckCircle className='h-4 w-4 text-green-400' />
                    <span className='text-white/80'>{task.task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
