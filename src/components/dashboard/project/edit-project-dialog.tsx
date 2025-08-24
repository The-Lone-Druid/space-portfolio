'use client'

import { ProjectForm } from '@/components/forms/project-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useProjects } from '@/hooks/use-projects'
import type { ProjectFormData } from '@/lib/validations'
import type { ProjectWithDetails } from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'

interface EditProjectDialogProps {
  project: ProjectWithDetails
  children: React.ReactNode
}

export function EditProjectDialog({
  project,
  children,
}: EditProjectDialogProps) {
  const { updateProject } = useProjects()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdateProject = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true)
      await updateProject(project.id, data)
      toast.success('Project updated successfully!')
      setOpen(false)
      // Refresh the page to show updated data
      window.location.reload()
    } catch (error) {
      console.error('Failed to update project:', error)
      toast.error('Failed to update project. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-h-[90vh] min-w-[80vw] overflow-y-auto border-gray-800 bg-gray-900'>
        <DialogHeader>
          <DialogTitle className='text-white'>Edit Project</DialogTitle>
          <DialogDescription className='text-gray-400'>
            Update your project details and information.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          initialData={project}
          onSubmit={handleUpdateProject}
          onCancel={() => setOpen(false)}
          isSubmitting={isSubmitting}
          submitLabel='Update Project'
        />
      </DialogContent>
    </Dialog>
  )
}
