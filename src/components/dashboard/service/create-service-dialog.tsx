'use client'

import { ServiceForm } from '@/components/forms/service-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useServices } from '@/hooks/use-services'
import type { ServiceFormData } from '@/lib/validations'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface CreateServiceDialogProps {
  trigger?: React.ReactNode
}

export function CreateServiceDialog({ trigger }: CreateServiceDialogProps) {
  const [open, setOpen] = useState(false)
  const { createService } = useServices()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateService = async (data: ServiceFormData) => {
    try {
      setIsSubmitting(true)
      await createService(data)
      toast.success('Service created successfully!')
      setOpen(false)
    } catch (error) {
      console.error('Failed to create service:', error)
      toast.error('Failed to create service. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant='space' className='gap-2'>
            <Plus className='h-4 w-4' />
            Add Service
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] min-w-[50vw] overflow-y-auto border-gray-800 bg-gray-900'>
        <DialogHeader>
          <DialogTitle className='text-white'>Add New Service</DialogTitle>
          <DialogDescription className='text-gray-400'>
            Add a new service offering to your space portfolio.
          </DialogDescription>
        </DialogHeader>
        <ServiceForm
          onSubmit={handleCreateService}
          onCancel={() => setOpen(false)}
          isSubmitting={isSubmitting}
          submitLabel='Create Service'
        />
      </DialogContent>
    </Dialog>
  )
}
