'use client'

import { ProjectForm } from '@/components/forms/project-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useProjects } from '@/hooks/use-projects'
import type { ProjectWithRelationsFormData } from '@/lib/validations'
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit,
  ExternalLink,
  Github,
  GripVertical,
  Plus,
  Star,
  StarOff,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

interface Project {
  id: number
  projectName: string
  projectDate: string
  projectDescription: string
  projectLink?: string
  githubLink?: string
  featured: boolean
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  projectTasks: Array<{
    id: number
    task: string
    order: number
  }>
  skillsUtilized: Array<{
    id: number
    name: string
    order: number
  }>
}

export function ProjectList() {
  const {
    projects,
    isLoading,
    isSaving,
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
  } = useProjects()

  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const handleCreateProject = async (data: ProjectWithRelationsFormData) => {
    await createProject(data)
    setShowForm(false)
  }

  const handleUpdateProject = async (data: ProjectWithRelationsFormData) => {
    if (editingProject) {
      await updateProject(editingProject.id, data)
      setEditingProject(null)
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className='glass-cosmic p-8 text-center'>
        <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent' />
        <p className='text-gray-300'>Loading projects...</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='glass-cosmic p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='mb-2 text-3xl font-bold text-white'>
              Project Management
            </h1>
            <p className='text-gray-300'>
              Manage your portfolio projects with space-themed elegance
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className='bg-blue-600 hover:bg-blue-700'
            disabled={isSaving}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Project
          </Button>
        </div>
      </div>

      {/* Create/Edit Form */}
      {(showForm || editingProject) && (
        <ProjectForm
          project={editingProject || undefined}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onCancel={() => {
            setShowForm(false)
            setEditingProject(null)
          }}
          isLoading={isSaving}
        />
      )}

      {/* Projects Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {projects.length === 0 ? (
          <div className='col-span-full'>
            <Card className='glass-cosmic p-12 text-center'>
              <div className='mb-4 text-gray-400'>
                <Plus className='mx-auto mb-4 h-16 w-16 opacity-50' />
                <h3 className='mb-2 text-xl font-semibold text-gray-300'>
                  No Projects Yet
                </h3>
                <p>Create your first project to get started</p>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className='bg-blue-600 hover:bg-blue-700'
              >
                <Plus className='mr-2 h-4 w-4' />
                Create First Project
              </Button>
            </Card>
          </div>
        ) : (
          projects.map(project => (
            <Card
              key={project.id}
              className='glass-cosmic space-y-4 p-6 transition-all duration-300 hover:bg-white/10'
            >
              {/* Project Header */}
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='mb-2 flex items-center gap-2'>
                    <h3 className='text-lg font-semibold text-white'>
                      {project.projectName}
                    </h3>
                    {project.featured && (
                      <Star className='h-4 w-4 fill-current text-yellow-400' />
                    )}
                  </div>
                  <div className='mb-3 flex items-center text-sm text-gray-400'>
                    <Calendar className='mr-1 h-4 w-4' />
                    {formatDate(project.projectDate)}
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleFeatured(project.id)}
                    className='text-gray-400 hover:text-yellow-400'
                  >
                    {project.featured ? (
                      <Star className='h-4 w-4 fill-current' />
                    ) : (
                      <StarOff className='h-4 w-4' />
                    )}
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setEditingProject(project)}
                    className='text-gray-400 hover:text-blue-400'
                  >
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleDeleteProject(project.id)}
                    className='text-gray-400 hover:text-red-400'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              {/* Project Description */}
              <p className='text-sm leading-relaxed text-gray-300'>
                {project.projectDescription}
              </p>

              {/* Project Links */}
              {(project.projectLink || project.githubLink) && (
                <div className='flex gap-2'>
                  {project.projectLink && (
                    <Button
                      variant='outline'
                      size='sm'
                      className='border-blue-600 text-blue-400 hover:bg-blue-600/20'
                      onClick={() => window.open(project.projectLink, '_blank')}
                    >
                      <ExternalLink className='mr-1 h-3 w-3' />
                      Demo
                    </Button>
                  )}
                  {project.githubLink && (
                    <Button
                      variant='outline'
                      size='sm'
                      className='border-gray-600 text-gray-400 hover:bg-gray-600/20'
                      onClick={() => window.open(project.githubLink, '_blank')}
                    >
                      <Github className='mr-1 h-3 w-3' />
                      Code
                    </Button>
                  )}
                </div>
              )}

              {/* Skills Used */}
              {project.skillsUtilized.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='text-xs font-medium tracking-wide text-gray-400 uppercase'>
                    Technologies
                  </h4>
                  <div className='flex flex-wrap gap-1'>
                    {project.skillsUtilized.slice(0, 4).map(skill => (
                      <Badge
                        key={skill.id}
                        variant='secondary'
                        className='border border-gray-700 bg-gray-800/50 text-xs text-gray-300'
                      >
                        {skill.name}
                      </Badge>
                    ))}
                    {project.skillsUtilized.length > 4 && (
                      <Badge
                        variant='secondary'
                        className='border border-gray-700 bg-gray-800/50 text-xs text-gray-400'
                      >
                        +{project.skillsUtilized.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Expandable Tasks Section */}
              {project.projectTasks.length > 0 && (
                <div className='border-t border-gray-700 pt-3'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() =>
                      setExpandedProject(
                        expandedProject === project.id ? null : project.id
                      )
                    }
                    className='h-auto p-0 text-gray-400 hover:text-white'
                  >
                    <span className='mr-2 text-xs font-medium tracking-wide uppercase'>
                      Tasks ({project.projectTasks.length})
                    </span>
                    {expandedProject === project.id ? (
                      <ChevronUp className='h-3 w-3' />
                    ) : (
                      <ChevronDown className='h-3 w-3' />
                    )}
                  </Button>

                  {expandedProject === project.id && (
                    <ul className='mt-2 space-y-1'>
                      {project.projectTasks.map(task => (
                        <li
                          key={task.id}
                          className='flex items-center text-sm text-gray-400'
                        >
                          <GripVertical className='mr-2 h-3 w-3 text-gray-600' />
                          {task.task}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Project Metadata */}
              <div className='flex items-center justify-between border-t border-gray-700 pt-3 text-xs text-gray-500'>
                <span>Order: {project.order}</span>
                <span>ID: {project.id}</span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Footer Stats */}
      <div className='glass-cosmic p-6 text-center'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div>
            <div className='text-2xl font-bold text-white'>
              {projects.length}
            </div>
            <div className='text-sm text-gray-400'>Total Projects</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-yellow-400'>
              {projects.filter(p => p.featured).length}
            </div>
            <div className='text-sm text-gray-400'>Featured Projects</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-green-400'>
              {projects.reduce((acc, p) => acc + p.skillsUtilized.length, 0)}
            </div>
            <div className='text-sm text-gray-400'>Technologies Used</div>
          </div>
        </div>
      </div>
    </div>
  )
}
