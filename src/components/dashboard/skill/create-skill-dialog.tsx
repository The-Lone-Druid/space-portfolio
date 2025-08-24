'use client'

import { SkillForm } from '@/components/forms/skill-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useSkills } from '@/hooks/use-skills'
import type { SkillFormData } from '@/lib/validations'
import { useState } from 'react'
import { toast } from 'sonner'

interface CreateSkillDialogProps {
  children: React.ReactNode
}

export function CreateSkillDialog({ children }: CreateSkillDialogProps) {
  const { createSkill } = useSkills()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateSkill = async (data: SkillFormData) => {
    try {
      setIsSubmitting(true)
      await createSkill(data)
      toast.success('Skill created successfully!')
      setOpen(false)
    } catch (error) {
      console.error('Failed to create skill:', error)
      toast.error('Failed to create skill. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto border-gray-800 bg-gray-900'>
        <DialogHeader>
          <DialogTitle className='text-white'>Add New Skill</DialogTitle>
          <DialogDescription className='text-gray-400'>
            Add a new skill or technology to your expertise portfolio.
          </DialogDescription>
        </DialogHeader>
        <SkillForm
          onSubmit={handleCreateSkill}
          onCancel={() => setOpen(false)}
          isSubmitting={isSubmitting}
          submitLabel='Create Skill'
        />
      </DialogContent>
    </Dialog>
  )
}
