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
import { Search, Rocket, Star, X } from 'lucide-react'
import { ProjectWithDetails } from '../../types'
import { SectionHeader } from '../shared/section-header'
import ProjectCard from '../dashboard/project/project-card'

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
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isVisible={isVisible}
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
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={index}
                          isVisible={isVisible}
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
