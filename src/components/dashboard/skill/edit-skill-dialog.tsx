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
import type { SkillWithDetails } from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'

interface EditSkillDialogProps {
  skill: SkillWithDetails
  children: React.ReactNode
}

export function EditSkillDialog({ skill, children }: EditSkillDialogProps) {
  const { updateSkill } = useSkills()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdateSkill = async (data: SkillFormData) => {
    try {
      setIsSubmitting(true)
      await updateSkill(skill.id, data)
      toast.success('Skill updated successfully!')
      setOpen(false)
    } catch (error) {
      console.error('Failed to update skill:', error)
      toast.error('Failed to update skill. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto border-gray-800 bg-gray-900'>
        <DialogHeader>
          <DialogTitle className='text-white'>Edit Skill</DialogTitle>
          <DialogDescription className='text-gray-400'>
            Update the details of {skill.name}.
          </DialogDescription>
        </DialogHeader>
        <SkillForm
          initialData={skill}
          onSubmit={handleUpdateSkill}
          onCancel={() => setOpen(false)}
          isSubmitting={isSubmitting}
          submitLabel='Update Skill'
        />
      </DialogContent>
    </Dialog>
  )
}
