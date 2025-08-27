'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
} from 'lucide-react'
import { ProjectWithDetails } from '../../types'
import { SectionHeader } from '../shared/section-header'

interface ProjectsProps {
  projects: ProjectWithDetails[]
}

const Projects = ({ projects }: ProjectsProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<string>('')
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

  // Get all unique skills for filter
  const allSkills = Array.from(
    new Set(
      projects.flatMap(project =>
        project.skillsUtilized.map(skill => skill.name)
      )
    )
  )

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
        <div className='glass-cosmic hover:shadow-space-accent/20 flex h-full flex-col rounded-2xl p-6 transition-all duration-500 group-hover:scale-105 group-hover:transform hover:shadow-lg'>
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
          <div className='flex gap-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-0 md:opacity-100'>
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
            <Button
              size='sm'
              variant='outline'
              className='hover:text-space-gold h-9 px-3 hover:bg-white/10 hover:shadow-md'
            >
              <Eye className='h-4 w-4' />
            </Button>
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
                <Button
                  size='lg'
                  variant='cosmic'
                  className='group relative overflow-hidden px-8 py-4 text-lg font-semibold'
                >
                  <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  <div className='relative z-10 flex items-center gap-3'>
                    <div className='from-space-accent flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br to-purple-500 transition-transform duration-300 group-hover:scale-110'>
                      <Grid3X3 className='h-3 w-3 text-white' />
                    </div>
                    <span>Explore All Projects</span>
                    <span className='text-space-gold'>({projects.length})</span>
                  </div>
                  <div className='from-space-gold to-space-accent absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full'></div>
                </Button>
              </DialogTrigger>
              <DialogContent className='from-space-cosmic/70 shadow-space-accent/20 max-h-[90vh] max-w-6xl bg-gradient-to-br to-gray-900/80 shadow-2xl backdrop-blur-xl'>
                <DialogHeader className='shadow-space-accent/10 pb-4 shadow-sm'>
                  <DialogTitle className='flex items-center gap-3 text-2xl font-bold text-white'>
                    <div className='from-space-accent flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br to-purple-500'>
                      <Rocket className='h-4 w-4 text-white' />
                    </div>
                    Complete Project Portfolio
                    <span className='text-space-gold'>
                      ({filteredProjects.length})
                    </span>
                  </DialogTitle>
                </DialogHeader>

                {/* Enhanced Search and Filter Controls */}
                <div className='mb-6 flex flex-col gap-4 sm:flex-row'>
                  <div className='group relative flex-1'>
                    <Search className='group-focus-within:text-space-accent absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 transition-colors duration-300' />
                    <Input
                      placeholder='Search projects by name or description...'
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className='focus:ring-space-accent/50 bg-white/5 pl-10 text-white shadow-md transition-all duration-300 placeholder:text-gray-400 hover:bg-white/10 focus:ring-2 focus:outline-none'
                    />
                  </div>
                  <div className='group relative min-w-[200px]'>
                    <Filter className='group-focus-within:text-space-accent absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 transition-colors duration-300' />
                    <select
                      value={selectedSkill}
                      onChange={e => setSelectedSkill(e.target.value)}
                      className='focus:ring-space-accent/50 w-full rounded-md bg-white/5 py-2 pr-4 pl-10 text-white shadow-md transition-all duration-300 hover:bg-white/10 focus:ring-2 focus:outline-none'
                    >
                      <option value='' className='bg-gray-900'>
                        All Technologies
                      </option>
                      {allSkills.map(skill => (
                        <option
                          key={skill}
                          value={skill}
                          className='bg-gray-900'
                        >
                          {skill}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Projects Grid in Dialog */}
                <div className='max-h-[60vh] overflow-y-auto'>
                  {filteredProjects.length > 0 ? (
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      {filteredProjects.map((project, index) => (
                        <ProjectCardEnhanced
                          key={project.id}
                          project={project}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center py-12'>
                      <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900'>
                        <Search className='h-8 w-8 text-gray-500' />
                      </div>
                      <h3 className='mb-2 text-xl font-semibold text-gray-300'>
                        No projects found
                      </h3>
                      <p className='text-center text-gray-500'>
                        Try adjusting your search terms or
                        <br />
                        select a different technology filter
                      </p>
                    </div>
                  )}
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
