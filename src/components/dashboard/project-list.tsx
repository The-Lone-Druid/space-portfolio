'use client'

import { ProjectForm } from '@/components/forms/project-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Switch } from '@/components/ui/switch'
import { useProjects } from '@/hooks/use-projects'
import type { ProjectFormData } from '@/lib/validations'
import type { ProjectWithDetails } from '@/types'
import { format } from 'date-fns'
import {
  Calendar,
  Edit,
  ExternalLink,
  Filter,
  Github,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

interface ProjectListProps {
  onCreateProject?: () => void
}

export function ProjectList({ onCreateProject }: ProjectListProps) {
  const {
    projects,
    isLoading,
    error,
    updateProject,
    deleteProject,
    toggleProjectStatus,
    toggleFeaturedStatus,
  } = useProjects()

  const [editingProject, setEditingProject] =
    useState<ProjectWithDetails | null>(null)
  const [deletingProject, setDeletingProject] =
    useState<ProjectWithDetails | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'inactive'
  >('all')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter projects based on search term and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && project.isActive) ||
      (filterStatus === 'inactive' && !project.isActive)

    return matchesSearch && matchesStatus
  })

  const handleEditProject = async (data: ProjectFormData) => {
    if (!editingProject) return

    try {
      setIsSubmitting(true)
      await updateProject(editingProject.id, data)
      setEditingProject(null)
    } catch (error) {
      console.error('Failed to update project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProject = async () => {
    if (!deletingProject) return

    try {
      await deleteProject(deletingProject.id)
      setDeletingProject(null)
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? 'bg-green-500/20 text-green-400'
      : 'bg-gray-500/20 text-gray-400'
  }

  if (error) {
    return (
      <Card className='border-red-500/30 bg-red-900/20'>
        <CardContent className='p-6'>
          <div className='text-center text-red-400'>
            <p className='font-medium'>Failed to load projects</p>
            <p className='mt-1 text-sm text-red-300'>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className='space-y-6'>
        {/* Search and Filter Controls */}
        <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
          <CardContent className='p-4'>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <div className='relative flex-1'>
                <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                <Input
                  placeholder='Search projects...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='border-gray-700 bg-gray-800/50 pl-10 text-white'
                />
              </div>
              <div className='flex gap-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      className='border-gray-600 text-gray-300'
                    >
                      <Filter className='mr-2 h-4 w-4' />
                      {filterStatus === 'all'
                        ? 'All Projects'
                        : filterStatus === 'active'
                          ? 'Active'
                          : 'Inactive'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='end'
                    className='border-gray-700 bg-gray-800'
                  >
                    <DropdownMenuItem
                      onClick={() => setFilterStatus('all')}
                      className='text-gray-300 hover:bg-gray-700'
                    >
                      All Projects
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterStatus('active')}
                      className='text-gray-300 hover:bg-gray-700'
                    >
                      Active Only
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterStatus('inactive')}
                      className='text-gray-300 hover:bg-gray-700'
                    >
                      Inactive Only
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {onCreateProject && (
                  <Button
                    onClick={onCreateProject}
                    size='sm'
                    className='bg-purple-600 hover:bg-purple-700'
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    New Project
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects List */}
        {isLoading ? (
          <div className='flex justify-center py-12'>
            <LoadingSpinner variant='orbit' size='lg' />
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
            <CardContent className='p-12'>
              <div className='text-center text-gray-400'>
                <p className='text-lg font-medium'>No projects found</p>
                <p className='mt-1 text-sm'>
                  {searchTerm || filterStatus !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first project to get started'}
                </p>
                {onCreateProject && !searchTerm && filterStatus === 'all' && (
                  <Button
                    onClick={onCreateProject}
                    className='mt-4 bg-purple-600 hover:bg-purple-700'
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Create Project
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4'>
            {filteredProjects.map(project => (
              <Card
                key={project.id}
                className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm transition-colors hover:border-gray-700/50'
              >
                <CardContent className='p-6'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 space-y-3'>
                      {/* Project Header */}
                      <div className='flex items-start gap-3'>
                        <div className='flex-1'>
                          <div className='mb-1 flex items-center gap-2'>
                            <h3 className='text-lg font-semibold text-white'>
                              {project.projectName}
                            </h3>
                            <Badge className={getStatusColor(project.isActive)}>
                              {project.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            {project.featured && (
                              <Badge className='bg-yellow-500/20 text-yellow-400'>
                                <Star className='mr-1 h-3 w-3' />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className='flex items-center gap-4 text-sm text-gray-400'>
                            <span className='flex items-center gap-1'>
                              <Calendar className='h-4 w-4' />
                              {project.projectDate}
                            </span>
                            <span>Order: {project.order}</span>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className='flex items-center gap-2'>
                          <Switch
                            checked={project.featured}
                            onCheckedChange={checked =>
                              toggleFeaturedStatus(project.id, checked)
                            }
                          />
                          <span className='text-xs text-gray-400'>
                            Featured
                          </span>

                          <Switch
                            checked={project.isActive}
                            onCheckedChange={checked =>
                              toggleProjectStatus(project.id, checked)
                            }
                          />
                          <span className='text-xs text-gray-400'>Active</span>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='text-gray-400 hover:text-white'
                              >
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align='end'
                              className='border-gray-700 bg-gray-800'
                            >
                              <DropdownMenuItem
                                onClick={() => setEditingProject(project)}
                                className='text-gray-300 hover:bg-gray-700'
                              >
                                <Edit className='mr-2 h-4 w-4' />
                                Edit
                              </DropdownMenuItem>
                              {project.projectLink && (
                                <DropdownMenuItem asChild>
                                  <a
                                    href={project.projectLink}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-gray-300 hover:bg-gray-700'
                                  >
                                    <ExternalLink className='mr-2 h-4 w-4' />
                                    View Live
                                  </a>
                                </DropdownMenuItem>
                              )}
                              {project.githubLink && (
                                <DropdownMenuItem asChild>
                                  <a
                                    href={project.githubLink}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-gray-300 hover:bg-gray-700'
                                  >
                                    <Github className='mr-2 h-4 w-4' />
                                    View Code
                                  </a>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className='bg-gray-700' />
                              <DropdownMenuItem
                                onClick={() => setDeletingProject(project)}
                                className='text-red-400 hover:bg-red-400/10'
                              >
                                <Trash2 className='mr-2 h-4 w-4' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Project Description */}
                      <p className='line-clamp-2 text-sm leading-relaxed text-gray-300'>
                        {project.projectDescription}
                      </p>

                      {/* Skills and Tasks Summary */}
                      <div className='flex flex-wrap gap-4 text-xs text-gray-400'>
                        {project.skillsUtilized.length > 0 && (
                          <span>
                            <strong className='text-gray-300'>Skills:</strong>{' '}
                            {project.skillsUtilized.length}
                          </span>
                        )}
                        {project.projectTasks.length > 0 && (
                          <span>
                            <strong className='text-gray-300'>Tasks:</strong>{' '}
                            {project.projectTasks.length}
                          </span>
                        )}
                        <span>
                          <strong className='text-gray-300'>Updated:</strong>{' '}
                          {format(new Date(project.updatedAt), 'MMM d, yyyy')}
                        </span>
                      </div>

                      {/* Links */}
                      {(project.projectLink || project.githubLink) && (
                        <div className='flex gap-2 pt-2'>
                          {project.projectLink && (
                            <Button
                              variant='outline'
                              size='sm'
                              asChild
                              className='text-xs'
                            >
                              <a
                                href={project.projectLink}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <ExternalLink className='mr-1 h-3 w-3' />
                                Live Demo
                              </a>
                            </Button>
                          )}
                          {project.githubLink && (
                            <Button
                              variant='outline'
                              size='sm'
                              asChild
                              className='text-xs'
                            >
                              <a
                                href={project.githubLink}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <Github className='mr-1 h-3 w-3' />
                                Source Code
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Project Dialog */}
      <Dialog
        open={!!editingProject}
        onOpenChange={() => setEditingProject(null)}
      >
        <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto border-gray-800 bg-gray-900'>
          <DialogHeader>
            <DialogTitle className='text-white'>Edit Project</DialogTitle>
            <DialogDescription className='text-gray-400'>
              Update the project information and settings.
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              initialData={editingProject}
              onSubmit={handleEditProject}
              onCancel={() => setEditingProject(null)}
              isSubmitting={isSubmitting}
              submitLabel='Update Project'
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deletingProject}
        onOpenChange={() => setDeletingProject(null)}
      >
        <DialogContent className='border-gray-800 bg-gray-900'>
          <DialogHeader>
            <DialogTitle className='text-white'>Delete Project</DialogTitle>
            <DialogDescription className='text-gray-400'>
              Are you sure you want to delete &ldquo;
              {deletingProject?.projectName}&rdquo;? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className='mt-6 flex justify-end gap-4'>
            <Button variant='outline' onClick={() => setDeletingProject(null)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteProject}>
              <Trash2 className='mr-2 h-4 w-4' />
              Delete Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
