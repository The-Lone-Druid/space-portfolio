'use client'

import { ProjectForm } from '@/components/forms/project-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useProjects } from '@/hooks/use-projects'
import type { ProjectFormData } from '@/lib/validations'
import type { ProjectWithDetails } from '@/types'
import { format } from 'date-fns'
import {
  ArrowLeft,
  Calendar,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  Github,
  Star,
  Trash2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProjectDetailClientProps {
  project: ProjectWithDetails
}

export function ProjectDetailClient({
  project: initialProject,
}: ProjectDetailClientProps) {
  const router = useRouter()
  const { updateProject, deleteProject } = useProjects()

  const [project, setProject] = useState(initialProject)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdateProject = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true)
      const updatedProject = await updateProject(project.id, data)
      if (updatedProject) {
        setProject(updatedProject)
      }
      setShowEditDialog(false)
    } catch (error) {
      console.error('Failed to update project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProject = async () => {
    try {
      await deleteProject(project.id)
      router.push('/dashboard/projects')
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  return (
    <>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              onClick={() => router.push('/dashboard/projects')}
              className='border-gray-600 text-gray-300 hover:bg-gray-800/50'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Projects
            </Button>
            <div>
              <h1 className='text-2xl font-bold text-white'>
                {project.projectName}
              </h1>
              <div className='mt-1 flex items-center gap-2'>
                <Badge
                  className={
                    project.isActive
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }
                >
                  {project.isActive ? (
                    <>
                      <Eye className='mr-1 h-3 w-3' />
                      Active
                    </>
                  ) : (
                    <>
                      <EyeOff className='mr-1 h-3 w-3' />
                      Inactive
                    </>
                  )}
                </Badge>
                {project.featured && (
                  <Badge className='bg-yellow-500/20 text-yellow-400'>
                    <Star className='mr-1 h-3 w-3' />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() => setShowEditDialog(true)}
              className='border-gray-600 text-gray-300 hover:bg-gray-800/50'
            >
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </Button>
            <Button
              variant='destructive'
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='space-y-6 lg:col-span-2'>
            {/* Project Information */}
            <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='text-white'>Project Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-300'>
                    Description
                  </label>
                  <p className='mt-1 leading-relaxed text-gray-200'>
                    {project.projectDescription}
                  </p>
                </div>

                <div className='flex items-center gap-6'>
                  <div>
                    <label className='text-sm font-medium text-gray-300'>
                      Project Date
                    </label>
                    <p className='mt-1 flex items-center gap-2 text-gray-200'>
                      <Calendar className='h-4 w-4' />
                      {project.projectDate}
                    </p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-300'>
                      Display Order
                    </label>
                    <p className='mt-1 text-gray-200'>{project.order}</p>
                  </div>
                </div>

                {(project.projectLink || project.githubLink) && (
                  <div>
                    <label className='text-sm font-medium text-gray-300'>
                      Links
                    </label>
                    <div className='mt-2 flex gap-2'>
                      {project.projectLink && (
                        <Button variant='outline' size='sm' asChild>
                          <a
                            href={project.projectLink}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLink className='mr-2 h-4 w-4' />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button variant='outline' size='sm' asChild>
                          <a
                            href={project.githubLink}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Github className='mr-2 h-4 w-4' />
                            Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Project Tasks */}
            {project.projectTasks.length > 0 && (
              <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white'>Project Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {project.projectTasks
                      .sort((a, b) => a.order - b.order)
                      .map((task, index) => (
                        <div key={task.id} className='flex gap-3'>
                          <div className='mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-medium text-purple-400'>
                            {index + 1}
                          </div>
                          <p className='leading-relaxed text-gray-300'>
                            {task.task}
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Skills & Technologies */}
            {project.skillsUtilized.length > 0 && (
              <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white'>
                    Skills & Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-2'>
                    {project.skillsUtilized
                      .sort((a, b) => a.order - b.order)
                      .map(skill => (
                        <Badge
                          key={skill.id}
                          variant='secondary'
                          className='bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                        >
                          {skill.name}
                        </Badge>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='text-white'>Metadata</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div>
                  <label className='text-sm font-medium text-gray-300'>
                    Created
                  </label>
                  <p className='text-sm text-gray-200'>
                    {format(new Date(project.createdAt), 'PPp')}
                  </p>
                </div>
                <Separator className='bg-gray-700' />
                <div>
                  <label className='text-sm font-medium text-gray-300'>
                    Last Updated
                  </label>
                  <p className='text-sm text-gray-200'>
                    {format(new Date(project.updatedAt), 'PPp')}
                  </p>
                </div>
                <Separator className='bg-gray-700' />
                <div>
                  <label className='text-sm font-medium text-gray-300'>
                    Project ID
                  </label>
                  <p className='font-mono text-sm text-gray-200'>
                    #{project.id}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto border-gray-800 bg-gray-900'>
          <DialogHeader>
            <DialogTitle className='text-white'>Edit Project</DialogTitle>
            <DialogDescription className='text-gray-400'>
              Update the project information and settings.
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            initialData={project}
            onSubmit={handleUpdateProject}
            onCancel={() => setShowEditDialog(false)}
            isSubmitting={isSubmitting}
            submitLabel='Update Project'
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className='border-gray-800 bg-gray-900'>
          <DialogHeader>
            <DialogTitle className='text-white'>Delete Project</DialogTitle>
            <DialogDescription className='text-gray-400'>
              Are you sure you want to delete &ldquo;{project.projectName}
              &rdquo;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='mt-6 flex justify-end gap-4'>
            <Button
              variant='outline'
              onClick={() => setShowDeleteDialog(false)}
            >
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
