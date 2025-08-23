import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Personal Info validation schemas
export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  email: z.string().email('Please enter a valid email address'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  resumeUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
})

export const socialLinkSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Please enter a valid URL'),
  icon: z.string().optional(),
})

export const heroStatsSchema = z.object({
  verifiedSkills: z.number().min(0, 'Must be 0 or greater'),
  professionalProjects: z.number().min(0, 'Must be 0 or greater'),
  personalProjects: z.number().min(0, 'Must be 0 or greater'),
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
export type SocialLinkFormData = z.infer<typeof socialLinkSchema>
export type HeroStatsFormData = z.infer<typeof heroStatsSchema>
