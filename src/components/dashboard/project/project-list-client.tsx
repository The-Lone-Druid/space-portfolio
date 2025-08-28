'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { formatProjectDateRange } from '@/lib/project-date-utils'
import type { ProjectWithDetails } from '@/types'
import {
  Edit,
  ExternalLink,
  Filter,
  Github,
  Search,
  Star,
  Trash,
  X,
} from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { useProjects } from '../../../hooks/use-projects'
import { EditProjectDialog } from './edit-project-dialog'

interface ProjectListClientProps {
  projects: ProjectWithDetails[]
}

const ITEMS_PER_PAGE = 6

export function ProjectListClient({ projects }: ProjectListClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<string>('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const { deleteProject } = useProjects()

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

  // Filter projects based on search query, selected skill, and featured status
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
        selectedSkill === 'all' ||
        project.skillsUtilized.some(skill => skill.name === selectedSkill)

      const matchesFeatured =
        showFeaturedOnly === 'all' ||
        (showFeaturedOnly === 'featured' && project.featured) ||
        (showFeaturedOnly === 'regular' && !project.featured)

      return matchesSearch && matchesSkill && matchesFeatured
    })
  }, [projects, searchQuery, selectedSkill, showFeaturedOnly])

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedSkill, showFeaturedOnly])

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedSkill('all')
    setShowFeaturedOnly('all')
    setCurrentPage(1)
  }

  const handleDeleteProject = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?'))
      await deleteProject(id)
  }

  return (
    <div className='space-y-6'>
      {/* Search and Filter Controls */}
      <div className='space-y-4'>
        {/* Header Filter Controls */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-2'>
            <Filter className='h-4 w-4 text-white/70' />
            <span className='text-sm font-medium text-white'>Filters</span>
          </div>

          {/* Filter Row */}
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              {/* Featured Filter */}
              <div className='flex items-center gap-2'>
                <Select
                  value={showFeaturedOnly}
                  onValueChange={setShowFeaturedOnly}
                >
                  <SelectTrigger className='w-[140px] border-white/20 bg-white/5 text-white'>
                    <SelectValue placeholder='All Projects' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Projects</SelectItem>
                    <SelectItem value='featured'>Featured Only</SelectItem>
                    <SelectItem value='regular'>Regular Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Skills Filter */}
              <div className='flex items-center gap-2'>
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger className='w-[160px] border-white/20 bg-white/5 text-white'>
                    <SelectValue placeholder='All Skills' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Skills</SelectItem>
                    {allSkills.map(skill => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery ||
              selectedSkill !== 'all' ||
              showFeaturedOnly !== 'all') && (
              <Button variant='outline' size='sm' onClick={clearAllFilters}>
                <X className='mr-2 h-4 w-4' />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

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
              className='absolute top-1/2 right-3 -translate-y-1/2 text-white/50 transition-colors hover:text-white'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className='flex items-center justify-between text-sm text-white/70'>
        <div>
          {filteredProjects.length === projects.length
            ? `Showing all ${projects.length} projects`
            : `Showing ${filteredProjects.length} of ${projects.length} projects`}
          {filteredProjects.length > ITEMS_PER_PAGE && (
            <span className='ml-2'>
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>

        {filteredProjects.length > ITEMS_PER_PAGE && (
          <div className='text-xs'>{ITEMS_PER_PAGE} per page</div>
        )}
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
          <Button onClick={clearAllFilters} variant='space'>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className='space-y-6'>
          {/* Projects Grid */}
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {paginatedProjects.map(project => (
              <Card
                key={project.id}
                className='glass-cosmic hover:border-space-accent/50 flex h-full flex-col border-white/10 transition-all duration-300 hover:scale-[1.02]'
              >
                <CardContent className='flex h-full flex-col p-6'>
                  {/* Header with title and featured badge */}
                  <div className='mb-4'>
                    <div className='mb-3 flex items-start justify-between'>
                      <h3 className='line-clamp-2 flex-1 pr-2 text-lg leading-tight font-semibold text-white'>
                        {project.projectName}
                      </h3>
                      {project.featured && (
                        <Badge className='flex-shrink-0 border-yellow-500/30 bg-yellow-500/20 text-yellow-400'>
                          <Star className='mr-1 h-3 w-3' />
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Description - truncated to 3 lines */}
                    <p className='mb-3 line-clamp-3 text-sm leading-relaxed text-white/80'>
                      {project.projectDescription}
                    </p>

                    {/* Date */}
                    <div className='mb-4 flex items-center gap-2'>
                      <div className='text-xs text-white/60'>
                        {formatProjectDateRange({
                          startDate: project.startDate,
                          endDate: project.endDate || undefined,
                          isOngoing: project.isOngoing,
                        })}
                      </div>
                      {project.isOngoing && (
                        <Badge className='border-green-500/30 bg-green-500/20 text-xs text-green-400'>
                          Ongoing
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Skills - limited display */}
                  {project.skillsUtilized.length > 0 && (
                    <div className='mb-4'>
                      <div className='flex flex-wrap gap-2'>
                        {project.skillsUtilized.slice(0, 3).map(skill => (
                          <Badge
                            key={skill.id}
                            variant={
                              selectedSkill === skill.name
                                ? 'default'
                                : 'outline'
                            }
                            onClick={() =>
                              setSelectedSkill(
                                selectedSkill === skill.name
                                  ? 'all'
                                  : skill.name
                              )
                            }
                          >
                            {skill.name}
                          </Badge>
                        ))}
                        {project.skillsUtilized.length > 3 && (
                          <Badge
                            variant='outline'
                            className='border-white/20 bg-white/5 text-xs text-white/60'
                          >
                            +{project.skillsUtilized.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Links */}
                  <div className='mb-4 flex gap-2'>
                    {project.projectLink && (
                      <Button
                        size='sm'
                        variant='nebula'
                        className='flex-1'
                        asChild
                      >
                        <a
                          href={project.projectLink}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLink className='mr-1 h-3 w-3' />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button
                        size='sm'
                        variant='cosmic'
                        className='flex-1'
                        asChild
                      >
                        <a
                          href={project.githubLink}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Github className='mr-1 h-3 w-3' />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Management Actions - pushed to bottom */}
                  <div className='mt-auto border-t border-white/10 pt-4'>
                    <div className='flex items-center justify-between'>
                      <Button
                        size='sm'
                        variant='outline'
                        asChild
                        className='mr-2 flex-1'
                      >
                        <Link href={`/dashboard/projects/${project.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <div className='flex items-center gap-2'>
                        <EditProjectDialog project={project}>
                          <Button size='sm' variant='stellar'>
                            <Edit className='h-3 w-3' />
                          </Button>
                        </EditProjectDialog>
                        <Button
                          size='sm'
                          variant='destructive'
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash className='h-3 w-3' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className={`cursor-pointer ${
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'hover:bg-white/10'
                      }`}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    page => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className='cursor-pointer hover:bg-white/10'
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      className={`cursor-pointer ${
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'hover:bg-white/10'
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
