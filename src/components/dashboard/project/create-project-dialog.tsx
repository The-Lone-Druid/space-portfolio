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
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface CreateProjectDialogProps {
  children: React.ReactNode
}

export function CreateProjectDialog({ children }: CreateProjectDialogProps) {
  const { createProject } = useProjects()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleCreateProject = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true)
      await createProject(data)
      toast.success('Project created successfully!')
      setOpen(false)
      router.push(`/dashboard/projects`)
    } catch (error) {
      console.error('Failed to create project:', error)
      toast.error('Failed to create project. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-h-[90vh] min-w-[80vw] overflow-y-auto border-gray-800 bg-gray-900'>
        <DialogHeader>
          <DialogTitle className='text-white'>Create New Project</DialogTitle>
          <DialogDescription className='text-gray-400'>
            Add a new project to your portfolio. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setOpen(false)}
          isSubmitting={isSubmitting}
          submitLabel='Create Project'
        />
      </DialogContent>
    </Dialog>
  )
}
