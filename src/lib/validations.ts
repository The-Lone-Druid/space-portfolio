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

// Project validation schemas
export const projectSchema = z.object({
  projectName: z.string().min(2, 'Project name must be at least 2 characters'),
  projectDate: z.string().min(1, 'Project date is required'),
  projectDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters'),
  projectLink: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  githubLink: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  featured: z.boolean(),
  order: z.number().min(0, 'Order must be 0 or greater'),
})

export const projectTaskSchema = z.object({
  task: z.string().min(1, 'Task description is required'),
  order: z.number().min(0, 'Order must be 0 or greater').default(0),
})

export const projectSkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  order: z.number().min(0, 'Order must be 0 or greater').default(0),
})

// Extended form data for creating projects with relations
export const projectWithRelationsSchema = projectSchema.extend({
  tasks: z.array(projectTaskSchema).optional().default([]),
  skills: z.array(projectSkillSchema).optional().default([]),
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
export type SocialLinkFormData = z.infer<typeof socialLinkSchema>
export type HeroStatsFormData = z.infer<typeof heroStatsSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
export type ProjectTaskFormData = z.infer<typeof projectTaskSchema>
export type ProjectSkillFormData = z.infer<typeof projectSkillSchema>
export type ProjectWithRelationsFormData = z.infer<
  typeof projectWithRelationsSchema
>
