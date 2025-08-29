import { Star, Rocket, Calendar, ExternalLink, Github, Eye } from 'lucide-react'
import { ProjectWithDetails } from '../../../types'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Dialog, DialogTrigger } from '../../ui/dialog'
import ProjectDetailsDialog from './projects-dialog'

interface ProjectCardProps {
  project: ProjectWithDetails
  index: number
  isVisible: boolean
}

const ProjectCard = ({ project, index, isVisible }: ProjectCardProps) => {
  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Present'
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div
      className={`group relative transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className='glass-cosmic hover:shadow-space-accent/20 flex h-full flex-col rounded-2xl p-6 transition-all duration-500 group-hover:scale-102 group-hover:transform hover:shadow-lg'>
        {/* Project Header */}
        <div className='mb-4 flex items-start justify-between'>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-2'>
              {project.featured && (
                <div className='text-space-gold flex items-center gap-1 rounded-full bg-[#ffd700]/30 px-2 py-1 text-xs font-medium shadow-md shadow-yellow-500/20'>
                  <Star className='inline h-3 w-3' />
                  Featured
                </div>
              )}
              {project.isOngoing && (
                <div className='rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400 shadow-md shadow-green-500/20'>
                  <Rocket className='mr-1 inline h-3 w-3' />
                  Active
                </div>
              )}
            </div>
            <h3 className='group-hover:text-space-gold text-space-gold text-2xl font-bold text-white transition-colors duration-300'>
              {project.projectName}
            </h3>
            <p className='mt-1 flex items-center gap-1 text-sm text-gray-400'>
              <Calendar className='h-3 w-3' />
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </p>
          </div>
        </div>

        {/* Project Description */}
        <p className='mb-4 flex-1 leading-relaxed text-gray-300'>
          {project.projectDescription}
        </p>

        {/* Skills */}
        <div className='mb-6'>
          <div className='flex flex-wrap gap-2'>
            {project.skillsUtilized.slice(0, 4).map((skillItem, skillIndex) => (
              <Badge
                key={skillIndex}
                variant='outline'
                className='hover:text-space-accent bg-white/5 text-xs text-gray-300 transition-colors duration-300 hover:bg-white/10 hover:shadow-md'
              >
                {skillItem.name}
              </Badge>
            ))}
            {project.skillsUtilized.length > 4 && (
              <Badge
                variant='outline'
                className='bg-white/5 text-xs text-gray-400 shadow-sm'
              >
                +{project.skillsUtilized.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons - Always visible on mobile, hover on desktop */}
        <div className='flex flex-wrap gap-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-0 md:opacity-100'>
          {project.projectLink && (
            <Button
              variant='cosmic'
              className='flex-1'
              onClick={() => window.open(project.projectLink!, '_blank')}
            >
              <ExternalLink className='mr-2 h-4 w-4' />
              Live Demo
            </Button>
          )}
          {project.githubLink && (
            <Button
              variant='stellar'
              className='flex-1'
              onClick={() => window.open(project.githubLink!, '_blank')}
            >
              <Github className='mr-2 h-4 w-4' />
              Code
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='nebula' className='w-full'>
                <Eye className='mr-2 h-4 w-4' />
                Details
              </Button>
            </DialogTrigger>
            <ProjectDetailsDialog project={project} />
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
