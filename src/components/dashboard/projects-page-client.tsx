'use client'

import { ProjectList } from '@/components/dashboard/project-list'
import { ProjectStats } from '@/components/dashboard/project-stats'
import { ProjectForm } from '@/components/forms/project-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useProjects } from '@/hooks/use-projects'
import type { ProjectFormData } from '@/lib/validations'
import { useState } from 'react'

export function ProjectsPageClient() {
  const { createProject } = useProjects()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateProject = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true)
      await createProject(data)
      setShowCreateDialog(false)
    } catch (error) {
      console.error('Failed to create project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className='space-y-6'>
        {/* Project Statistics */}
        <ProjectStats />

        {/* Projects List */}
        <ProjectList onCreateProject={() => setShowCreateDialog(true)} />
      </div>

      {/* Create Project Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto border-gray-800 bg-gray-900'>
          <DialogHeader>
            <DialogTitle className='text-white'>Create New Project</DialogTitle>
            <DialogDescription className='text-gray-400'>
              Add a new project to your portfolio. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => setShowCreateDialog(false)}
            isSubmitting={isSubmitting}
            submitLabel='Create Project'
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
