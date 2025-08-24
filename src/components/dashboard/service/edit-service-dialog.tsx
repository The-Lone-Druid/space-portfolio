'use client'

import { ServiceForm } from '@/components/forms/service-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useServices } from '@/hooks/use-services'
import { type ServiceFormData } from '@/lib/validations'
import type { ServiceWithDetails } from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'

interface EditServiceDialogProps {
  service: ServiceWithDetails
  children: React.ReactNode
}

export function EditServiceDialog({
  service,
  children,
}: EditServiceDialogProps) {
  const [open, setOpen] = useState(false)
  const { updateService } = useServices()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdateService = async (data: ServiceFormData) => {
    try {
      setIsSubmitting(true)
      await updateService(service.id, data)
      toast.success('Service updated successfully!')
      setOpen(false)
    } catch (error) {
      console.error('Failed to update service:', error)
      toast.error('Failed to update service. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-h-[90vh] min-w-[50vw] overflow-y-auto border-gray-800 bg-gray-900'>
        <DialogHeader>
          <DialogTitle className='text-white'>Edit Service</DialogTitle>
          <DialogDescription className='text-gray-400'>
            Update the service information. Changes will be reflected on your
            services page.
          </DialogDescription>
        </DialogHeader>
        <ServiceForm
          initialData={service}
          onSubmit={handleUpdateService}
          onCancel={() => setOpen(false)}
          isSubmitting={isSubmitting}
          submitLabel='Update Service'
        />
      </DialogContent>
    </Dialog>
  )
}
