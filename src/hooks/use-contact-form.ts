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
      const response = await fetch('https://formspree.io/f/myzdybed', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast.success('Mission Control Received! 🚀', {
        description:
          "Your message has been sent successfully. I'll get back to you soon!",
      })

      form.reset()
    } catch (error) {
      console.error('Contact form submission error:', error)
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
