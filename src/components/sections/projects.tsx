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
        {/* Background glow effect */}
        <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100'></div>

        <div className='glass-cosmic flex h-full flex-col rounded-2xl border border-white/10 p-6 transition-all duration-500 group-hover:scale-105 group-hover:transform hover:border-white/30'>
          {/* Project Header */}
          <div className='mb-4 flex items-start justify-between'>
            <div className='flex-1'>
              <div className='mb-2 flex items-center gap-2'>
                {project.featured && (
                  <div className='bg-space-gold/20 text-space-gold border-space-gold/30 rounded-full border px-2 py-1 text-xs font-medium'>
                    <Star className='mr-1 inline h-3 w-3' />
                    Featured
                  </div>
                )}
                {project.isOngoing && (
                  <div className='rounded-full border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400'>
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
                    className='hover:border-space-accent/50 hover:text-space-accent border-white/20 bg-white/5 text-xs text-gray-300 transition-colors duration-300'
                  >
                    {skillItem.name}
                  </Badge>
                ))}
              {project.skillsUtilized.length > 4 && (
                <Badge
                  variant='outline'
                  className='border-white/20 bg-white/5 text-xs text-gray-400'
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
              className='hover:border-space-gold/50 hover:text-space-gold h-9 border-white/20 px-3'
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
      <SectionHeader
        title='My'
        highlight='Featured Projects'
        subtitle="Explore a collection of applications I've built, each one solving real-world problems with innovative technology solutions"
      />

      {/* Featured Projects Grid (First 3) */}
      <div className='mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {featuredProjects.map((project, index) => (
          <ProjectCardEnhanced
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Show More Projects Button */}
      {hasMoreProjects && (
        <div className='mb-8 text-center'>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size='lg'
                variant='cosmic'
                className='group relative overflow-hidden'
              >
                <Grid3X3 className='mr-2 h-5 w-5' />
                View All Projects ({projects.length})
                <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </Button>
            </DialogTrigger>
            <DialogContent className='border-space-accent/30 max-h-[90vh] max-w-6xl bg-black/95'>
              <DialogHeader>
                <DialogTitle className='text-2xl font-bold text-white'>
                  All Projects ({filteredProjects.length})
                </DialogTitle>
              </DialogHeader>

              {/* Search and Filter Controls */}
              <div className='mb-6 flex flex-col gap-4 sm:flex-row'>
                <div className='relative flex-1'>
                  <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                  <Input
                    placeholder='Search projects...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className='border-white/20 bg-white/5 pl-10 text-white placeholder:text-gray-400'
                  />
                </div>
                <div className='relative min-w-[200px]'>
                  <Filter className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                  <select
                    value={selectedSkill}
                    onChange={e => setSelectedSkill(e.target.value)}
                    className='focus:ring-space-accent/50 focus:border-space-accent/50 w-full rounded-md border border-white/20 bg-white/5 py-2 pr-4 pl-10 text-white focus:ring-2 focus:outline-none'
                  >
                    <option value=''>All Skills</option>
                    {allSkills.map(skill => (
                      <option key={skill} value={skill} className='bg-gray-900'>
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
                  <div className='py-12 text-center'>
                    <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800'>
                      <Search className='h-8 w-8 text-gray-500' />
                    </div>
                    <p className='mb-2 text-xl text-gray-400'>
                      No projects found
                    </p>
                    <p className='text-gray-500'>
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <div className='py-20 text-center'>
          <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800'>
            <Rocket className='h-10 w-10 text-gray-500' />
          </div>
          <p className='mb-2 text-xl text-gray-400'>No projects available</p>
          <p className='text-gray-500'>
            Projects will appear here once they are added.
          </p>
        </div>
      )}
    </>
  )
}

export default Projects
