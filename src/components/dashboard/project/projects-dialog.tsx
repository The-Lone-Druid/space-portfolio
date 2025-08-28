import {
  Eye,
  Star,
  Rocket,
  Calendar,
  Clock,
  Code2,
  Zap,
  CheckCircle,
  ExternalLink,
  Github,
  X,
} from 'lucide-react'
import { ProjectWithDetails } from '../../../types'
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'
import { Button } from '../../ui/button'

const ProjectDetailsDialog = ({ project }: { project: ProjectWithDetails }) => {
  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Present'
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  }

  const getDuration = () => {
    if (!project.startDate) return 'Unknown duration'

    // If project is ongoing, show "Currently Active"
    if (project.isOngoing) {
      return 'Currently Active'
    }

    const start = new Date(project.startDate)
    const end = project.endDate ? new Date(project.endDate) : new Date()
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // Don't show very short durations (less than 7 days) as they're likely incorrect
    if (diffDays < 7) {
      return 'Short term project'
    }

    const months = Math.floor(diffDays / 30)
    const days = diffDays % 30

    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''}${days > 0 ? ` ${days} day${days > 1 ? 's' : ''}` : ''}`
    }
    return `${days} day${days > 1 ? 's' : ''}`
  }

  return (
    <DialogContent className='from-space-cosmic/70 shadow-space-accent/20 flex h-screen max-h-screen w-screen min-w-screen flex-col bg-gradient-to-br to-gray-900/80 p-0 shadow-2xl backdrop-blur-xl'>
      <DialogHeader className='shadow-space-accent/10 flex-shrink-0 p-3 shadow-sm sm:p-4 lg:p-6'>
        <DialogTitle className='flex flex-col gap-2 text-lg font-bold text-white sm:flex-row sm:items-center sm:gap-3 sm:text-xl'>
          <div className='flex items-center gap-2 sm:gap-3'>
            <div className='from-space-accent flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br to-purple-500 sm:h-8 sm:w-8'>
              <Eye className='h-3 w-3 text-white sm:h-4 sm:w-4' />
            </div>
            <span className='whitespace-nowrap'>Project Details</span>
          </div>
        </DialogTitle>
      </DialogHeader>

      {/* Scrollable Content Area */}
      <div className='min-h-0 flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6'>
        <div className='space-y-6'>
          {/* Project Header Section */}
          <div className='glass-cosmic rounded-2xl p-4 sm:p-6'>
            <div className='mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap'>
              <div className='w-full flex-1 sm:w-auto'>
                <div className='mb-3 flex flex-wrap items-center gap-2'>
                  {project.featured && (
                    <div className='text-space-gold flex items-center gap-1 rounded-full bg-[#ffd700]/30 px-2 py-1 text-xs font-medium shadow-md shadow-yellow-500/20 sm:px-3 sm:text-sm'>
                      <Star className='h-3 w-3 sm:h-4 sm:w-4' />
                      Featured Project
                    </div>
                  )}
                  {project.isOngoing && (
                    <div className='rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400 shadow-md shadow-green-500/20 sm:px-3 sm:text-sm'>
                      <Rocket className='mr-1 inline h-3 w-3 sm:h-4 sm:w-4' />
                      Currently Active
                    </div>
                  )}
                </div>
                <h2 className='text-space-gold mb-2 text-2xl font-bold break-words sm:text-3xl'>
                  {project.projectName}
                </h2>
                <p className='text-base leading-relaxed text-gray-300 sm:text-lg'>
                  {project.projectDescription}
                </p>
              </div>
            </div>

            {/* Project Meta Information */}
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
              <div className='glass-nebula rounded-xl p-3 sm:p-4'>
                <div className='flex items-center gap-2 sm:gap-3'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 sm:h-10 sm:w-10'>
                    <Calendar className='h-4 w-4 text-white sm:h-5 sm:w-5' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h4 className='text-xs font-medium text-gray-400 sm:text-sm'>
                      Timeline
                    </h4>
                    <p className='text-sm break-words text-white sm:text-base'>
                      {formatDate(project.startDate)} -{' '}
                      {formatDate(project.endDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className='glass-nebula rounded-xl p-3 sm:p-4'>
                <div className='flex items-center gap-2 sm:gap-3'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 sm:h-10 sm:w-10'>
                    <Clock className='h-4 w-4 text-white sm:h-5 sm:w-5' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h4 className='text-xs font-medium text-gray-400 sm:text-sm'>
                      Duration
                    </h4>
                    <p className='text-sm text-white sm:text-base'>
                      {getDuration()}
                    </p>
                  </div>
                </div>
              </div>

              <div className='glass-nebula rounded-xl p-3 sm:col-span-2 sm:p-4 lg:col-span-1'>
                <div className='flex items-center gap-2 sm:gap-3'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 sm:h-10 sm:w-10'>
                    <Code2 className='h-4 w-4 text-white sm:h-5 sm:w-5' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h4 className='text-xs font-medium text-gray-400 sm:text-sm'>
                      Technologies
                    </h4>
                    <p className='text-sm text-white sm:text-base'>
                      {project.skillsUtilized.length} Technologies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Section */}
          <div className='glass-cosmic rounded-2xl p-4 sm:p-6'>
            <h3 className='mb-3 flex items-center gap-2 text-lg font-bold text-white sm:mb-4 sm:text-xl'>
              <Zap className='text-space-accent h-4 w-4 sm:h-5 sm:w-5' />
              Technologies Used
            </h3>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {project.skillsUtilized.map((skill, index) => (
                <div
                  key={index}
                  className='glass-nebula group hover:shadow-space-accent/20 flex items-center justify-center rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg sm:p-3'
                >
                  <div className='text-space-gold text-xs font-semibold group-hover:text-white sm:text-sm'>
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Tasks Section */}
          {project.projectTasks && project.projectTasks.length > 0 && (
            <div className='glass-cosmic rounded-2xl p-4 sm:p-6'>
              <h3 className='mb-3 flex items-center gap-2 text-lg font-bold text-white sm:mb-4 sm:text-xl'>
                <CheckCircle className='text-space-accent h-4 w-4 sm:h-5 sm:w-5' />
                Project Tasks
              </h3>
              <div className='space-y-2 sm:space-y-3'>
                {project.projectTasks.map(task => (
                  <div
                    key={task.id}
                    className='glass-nebula flex items-center gap-2 rounded-lg p-3 transition-all duration-300 hover:bg-white/10 sm:gap-3 sm:p-4'
                  >
                    <CheckCircle className='h-3 w-3 flex-shrink-0 text-green-400 sm:h-4 sm:w-4' />
                    <span className='text-xs leading-relaxed text-white/80 sm:text-sm'>
                      {task.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links Section */}
          <div className='glass-cosmic rounded-2xl p-4 sm:p-6'>
            <h3 className='mb-3 flex items-center gap-2 text-lg font-bold text-white sm:mb-4 sm:text-xl'>
              <ExternalLink className='text-space-accent h-4 w-4 sm:h-5 sm:w-5' />
              Project Links
            </h3>
            <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
              {project.projectLink && (
                <Button
                  size='lg'
                  variant='cosmic'
                  className='w-full sm:min-w-[200px] sm:flex-1'
                  onClick={() => window.open(project.projectLink!, '_blank')}
                >
                  <ExternalLink className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                  View Live Demo
                </Button>
              )}
              {project.githubLink && (
                <Button
                  size='lg'
                  variant='stellar'
                  className='w-full sm:min-w-[200px] sm:flex-1'
                  onClick={() => window.open(project.githubLink!, '_blank')}
                >
                  <Github className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                  View Source Code
                </Button>
              )}
              {!project.projectLink && !project.githubLink && (
                <div className='glass-nebula rounded-lg p-4 text-center'>
                  <p className='text-sm text-gray-400 sm:text-base'>
                    No external links available for this project
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer with Close Button */}
      <div className='shadow-space-accent/10 flex flex-shrink-0 justify-center p-3 shadow-sm sm:p-4 lg:p-6'>
        <DialogClose asChild>
          <Button
            variant='outline'
            size='sm'
            className='group hover:bg-space-accent/20 hover:shadow-space-accent/20 relative w-full overflow-hidden text-white hover:shadow-lg sm:w-auto'
          >
            <div className='from-space-accent/10 absolute inset-0 bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
            <div className='relative z-10 flex items-center gap-2'>
              <X className='h-4 w-4' />
              Close Details
            </div>
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}

export default ProjectDetailsDialog
