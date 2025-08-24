'use client'

import { ProjectWithDetails } from '../../types'
import { ProjectCard } from '../cards/project-card'
import { SectionCard } from '../cards/section-card'

interface ProjectsProps {
  projects: ProjectWithDetails[]
}

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <SectionCard
      id='projects'
      title='My'
      highlight='Featured Projects'
      subtitle="Explore a collection of applications I've built, each one solving real-world problems with innovative technology solutions"
    >
      {/* Projects Grid */}
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            projectName={project.projectName}
            projectDescription={project.projectDescription}
            startDate={project.startDate}
            endDate={project.endDate}
            isOngoing={project.isOngoing}
            projectLink={project.projectLink}
            githubLink={project.githubLink}
            skillsUtilized={project.skillsUtilized}
            featured={project.featured}
            animationDelay={index * 0.1}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <div className='py-20 text-center'>
          <p className='text-xl text-gray-400'>No projects found.</p>
        </div>
      )}
    </SectionCard>
  )
}

export default Projects
