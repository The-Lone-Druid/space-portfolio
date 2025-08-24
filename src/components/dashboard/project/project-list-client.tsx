'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { ProjectWithDetails } from '@/types'
import { Edit, ExternalLink, Github, Search, Star, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { EditProjectDialog } from './edit-project-dialog'

interface ProjectListClientProps {
  projects: ProjectWithDetails[]
}

export function ProjectListClient({ projects }: ProjectListClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  // Get all unique skills from projects
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>()
    projects.forEach(project => {
      project.skillsUtilized.forEach(skill => {
        skillsSet.add(skill.name)
      })
    })
    return Array.from(skillsSet).sort()
  }, [projects])

  // Filter projects based on search query and selected skill
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        searchQuery === '' ||
        project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.projectDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.skillsUtilized.some(skill =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesSkill =
        selectedSkill === null ||
        project.skillsUtilized.some(skill => skill.name === selectedSkill)

      return matchesSearch && matchesSkill
    })
  }, [projects, searchQuery, selectedSkill])

  return (
    <div className='space-y-4'>
      {/* Search and Filter Controls */}
      <div className='space-y-4'>
        {/* Search Input */}
        <div className='relative'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/50' />
          <Input
            placeholder='Search projects by name, description, or skills...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='border-white/20 bg-white/5 pl-10 text-white placeholder:text-white/50'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute top-1/2 right-3 -translate-y-1/2 text-white/50 hover:text-white'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>

        {/* Skills Filter */}
        {allSkills.length > 0 && (
          <div className='space-y-2'>
            <div className='text-sm text-white/70'>Filter by skills:</div>
            <div className='flex flex-wrap gap-2'>
              <Button
                size='sm'
                variant={selectedSkill === null ? 'space' : 'link'}
                onClick={() => setSelectedSkill(null)}
              >
                All Skills
              </Button>
              {allSkills.map(skill => (
                <Button
                  key={skill}
                  size='sm'
                  variant={selectedSkill === skill ? 'space' : 'link'}
                  onClick={() =>
                    setSelectedSkill(selectedSkill === skill ? null : skill)
                  }
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className='text-sm text-white/70'>
        {filteredProjects.length === projects.length
          ? `Showing all ${projects.length} projects`
          : `Showing ${filteredProjects.length} of ${projects.length} projects`}
      </div>

      {/* Project List */}
      {filteredProjects.length === 0 ? (
        <div className='flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
          <Search className='mb-4 h-12 w-12 text-white/40' />
          <h3 className='mb-2 text-lg font-semibold text-white'>
            No projects found
          </h3>
          <p className='mb-4 text-sm text-white/70'>
            Try adjusting your search criteria or filters.
          </p>
          <Button
            onClick={() => {
              setSearchQuery('')
              setSelectedSkill(null)
            }}
            variant='space'
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredProjects.map(project => (
            <Card
              key={project.id}
              className='glass-nebula hover:border-space-accent/50 border-white/10 transition-all'
            >
              <CardContent className='p-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1 space-y-3'>
                    <div className='flex items-center gap-3'>
                      <h3 className='text-lg font-semibold text-white'>
                        {project.projectName}
                      </h3>
                      {project.featured && (
                        <Badge className='border-yellow-500/30 bg-yellow-500/20 text-yellow-400'>
                          <Star className='mr-1 h-3 w-3' />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <p className='text-sm text-white/70'>
                      {project.projectDescription}
                    </p>

                    <div className='text-xs text-white/60'>
                      Created: {project.projectDate}
                    </div>

                    {/* Skills */}
                    {project.skillsUtilized.length > 0 && (
                      <div className='flex flex-wrap gap-2'>
                        {project.skillsUtilized.map(skill => (
                          <Badge
                            key={skill.id}
                            variant='secondary'
                            className={`border-space-accent/30 bg-space-accent/20 text-space-accent cursor-pointer transition-colors ${
                              selectedSkill === skill.name
                                ? 'bg-space-accent/40 border-space-accent/60'
                                : 'hover:bg-space-accent/30'
                            }`}
                            onClick={() =>
                              setSelectedSkill(
                                selectedSkill === skill.name ? null : skill.name
                              )
                            }
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className='flex gap-2'>
                      {project.projectLink && (
                        <Button size='sm' variant='nebula' asChild>
                          <a
                            href={project.projectLink}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLink className='mr-2 h-3 w-3' />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button size='sm' variant='cosmic' asChild>
                          <a
                            href={project.githubLink}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Github className='mr-2 h-3 w-3' />
                            Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button size='sm' variant='outline' asChild>
                      <Link href={`/dashboard/projects/${project.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <EditProjectDialog project={project}>
                      <Button size='sm' variant='stellar'>
                        <Edit className='h-3 w-3' />
                      </Button>
                    </EditProjectDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
