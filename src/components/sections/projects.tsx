'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ProjectWithDetails } from '../../types'
import { ProjectCard } from '../cards/project-card'
import { SectionCard } from '../cards/section-card'

interface ProjectsProps {
  projects: ProjectWithDetails[]
}

const Projects = ({ projects }: ProjectsProps) => {
  const [filter, setFilter] = useState('all')

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter(project =>
          project.skillsUtilized.some((skill: { name: string }) =>
            filter === 'frontend'
              ? skill.name.toLowerCase().includes('react') ||
                skill.name.toLowerCase().includes('next')
              : filter === 'backend'
                ? skill.name.toLowerCase().includes('node')
                : true
          )
        )

  return (
    <SectionCard
      id='projects'
      title='My'
      highlight='Featured Projects'
      subtitle="Explore a collection of applications I've built, each one solving real-world problems with innovative technology solutions"
    >
      {/* Filter Buttons */}
      <div className='mb-12 flex flex-wrap justify-center gap-4'>
        {['all', 'frontend', 'backend', 'web'].map(category => (
          <Button
            key={category}
            variant={filter === category ? 'cosmic' : 'outline'}
            onClick={() => setFilter(category)}
            className={`capitalize ${
              filter !== category
                ? 'border-space-gold/50 text-space-gold/70 hover:text-space-gold hover:border-space-gold hover:bg-space-gold/10'
                : ''
            }`}
          >
            {category === 'all' ? 'All Projects' : category}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            {...project}
            animationDelay={index * 0.1}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className='py-20 text-center'>
          <p className='text-xl text-gray-400'>
            No projects found for &quot;{filter}&quot; category.
          </p>
        </div>
      )}
    </SectionCard>
  )
}

export default Projects
