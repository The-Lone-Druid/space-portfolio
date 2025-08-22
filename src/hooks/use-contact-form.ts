import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate form submission - would normally send data to API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Use data for API call in real implementation
      void data

      toast.success('Mission Control Received! 🚀', {
        description:
          "Your message has been sent successfully. I'll get back to you soon!",
      })

      form.reset()
    } catch {
      toast.error('Houston, we have a problem! 🛰️', {
        description:
          'Something went wrong. Please try again or contact me directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
  }
}
