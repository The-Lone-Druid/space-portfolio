'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  ExternalLink,
  Github,
  Calendar,
  Rocket,
  Grid3X3,
  Eye,
  Star,
  Filter,
  X,
  Clock,
  Users,
  Code2,
  Zap,
  CheckCircle,
} from 'lucide-react'
import { ProjectWithDetails } from '../../types'
import { SectionHeader } from '../shared/section-header'

interface ProjectsProps {
  projects: ProjectWithDetails[]
}

const Projects = ({ projects }: ProjectsProps) => {
  const [searchQuery] = useState('')
  const [selectedSkill] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Show first 3 projects on main page
  const featuredProjects = projects.slice(0, 3)
  const hasMoreProjects = projects.length > 3

  // Filter projects for dialog
  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    const matchesSkill =
      selectedSkill === '' ||
      project.skillsUtilized.some(skill => skill.name === selectedSkill)
    return matchesSearch && matchesSkill
  })

  // Project Details Dialog Component
  const ProjectDetailsDialog = ({
    project,
  }: {
    project: ProjectWithDetails
  }) => {
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

  const ProjectCardEnhanced = ({
    project,
    index,
  }: {
    project: ProjectWithDetails
    index: number
  }) => {
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
              <h3 className='group-hover:text-space-gold text-xl font-bold text-white transition-colors duration-300'>
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
              {project.skillsUtilized
                .slice(0, 4)
                .map((skillItem, skillIndex) => (
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
                size='sm'
                variant='cosmic'
                className='h-9 flex-1'
                onClick={() => window.open(project.projectLink!, '_blank')}
              >
                <ExternalLink className='mr-2 h-4 w-4' />
                Live Demo
              </Button>
            )}
            {project.githubLink && (
              <Button
                size='sm'
                variant='stellar'
                className='h-9 flex-1'
                onClick={() => window.open(project.githubLink!, '_blank')}
              >
                <Github className='mr-2 h-4 w-4' />
                Code
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button size='sm' variant='nebula' className='w-full'>
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
  return (
    <>
      {/* Background Effects */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='bg-space-gold/20 animate-float absolute top-20 right-10 h-4 w-4 rounded-full'></div>
        <div
          className='bg-space-accent/30 animate-float absolute bottom-32 left-20 h-2 w-2 rounded-full'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='animate-float absolute top-1/2 right-1/4 h-3 w-3 rounded-full bg-blue-400/20'
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      <SectionHeader
        title='My'
        highlight='Featured Projects'
        subtitle="Explore a collection of applications I've built, each one solving real-world problems with innovative technology solutions"
      />

      {/* Featured Projects Grid (First 3) */}
      <div
        className={`mb-12 grid transform grid-cols-1 gap-8 transition-all duration-1000 md:grid-cols-2 lg:grid-cols-3 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {featuredProjects.map((project, index) => (
          <ProjectCardEnhanced
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Enhanced Show More Projects Button */}
      {hasMoreProjects && (
        <div
          className={`mb-12 transform text-center transition-all delay-300 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className='relative inline-block'>
            <Dialog>
              <DialogTrigger asChild>
                <Button size='lg' variant='cosmic'>
                  Explore All Projects
                  <span className='text-space-gold'>({projects.length})</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='from-space-cosmic/70 shadow-space-accent/20 h-[95vh] max-h-[95vh] w-[98vw] max-w-[98vw] bg-gradient-to-br to-gray-900/80 p-0 shadow-2xl backdrop-blur-xl sm:h-[90vh] sm:w-[95vw] sm:max-w-[95vw] lg:h-[85vh] lg:w-[90vw] lg:max-w-[90vw] xl:max-w-7xl'>
                <DialogHeader className='shadow-space-accent/10 p-3 shadow-sm sm:p-4 lg:p-6'>
                  <DialogTitle className='flex items-center gap-3 text-xl font-bold text-white'>
                    <div className='from-space-accent flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br to-purple-500'>
                      <Rocket className='h-4 w-4 text-white' />
                    </div>
                    Complete Project Portfolio
                    <span className='text-space-gold'>
                      ({filteredProjects.length})
                    </span>
                  </DialogTitle>
                </DialogHeader>

                {/* Scrollable Content Area */}
                <div className='flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6'>
                  {filteredProjects.length > 0 ? (
                    <div className='grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3'>
                      {filteredProjects.map((project, index) => (
                        <ProjectCardEnhanced
                          key={project.id}
                          project={project}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16'>
                      <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 sm:mb-4 sm:h-16 sm:w-16 lg:mb-6 lg:h-20 lg:w-20'>
                        <Search className='h-6 w-6 text-gray-500 sm:h-8 sm:w-8 lg:h-10 lg:w-10' />
                      </div>
                      <h3 className='mb-1 text-base font-semibold text-gray-300 sm:mb-2 sm:text-lg lg:text-xl'>
                        No projects found
                      </h3>
                      <p className='text-center text-xs text-gray-500 sm:text-sm lg:text-base'>
                        Try adjusting your search terms or
                        <br />
                        select a different technology filter
                      </p>
                    </div>
                  )}
                </div>

                {/* Enhanced Footer with Close Button */}
                <div className='shadow-space-accent/10 flex justify-center p-3 shadow-sm sm:p-4 lg:p-6'>
                  <DialogClose asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      className='group hover:bg-space-accent/20 hover:shadow-space-accent/20 relative w-full overflow-hidden text-white hover:shadow-lg sm:w-auto'
                    >
                      <div className='from-space-accent/10 absolute inset-0 bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                      <div className='relative z-10 flex items-center gap-2'>
                        <X className='h-4 w-4' />
                        Close Portfolio
                      </div>
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 -z-10 rounded-xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100'></div>
          </div>
        </div>
      )}

      {/* Enhanced Empty State */}
      {projects.length === 0 && (
        <div className='relative mx-auto max-w-md py-20 text-center'>
          <div className='glass-cosmic shadow-space-accent/20 rounded-2xl p-12 shadow-lg'>
            <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900'>
              <Rocket className='h-10 w-10 text-gray-500' />
            </div>
            <h3 className='mb-2 text-xl font-semibold text-gray-300'>
              No projects available
            </h3>
            <p className='text-gray-500'>
              Amazing projects will appear here once they are added to the
              cosmic portfolio.
            </p>
            <div className='mt-6 flex justify-center'>
              <div className='from-space-gold/20 flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-gradient-to-br to-transparent'>
                <Star className='text-space-gold h-4 w-4' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Projects
