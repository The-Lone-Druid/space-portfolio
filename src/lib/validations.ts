import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Project validation schemas
export const projectTaskSchema = z.object({
  id: z.number().optional(),
  task: z.string().min(1, 'Task description is required'),
  order: z.number().default(0),
})

export const projectSkillSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Skill name is required'),
  order: z.number().default(0),
})

export const projectSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  projectDate: z.string().min(1, 'Project date is required'),
  projectDescription: z
    .string()
    .min(10, 'Project description must be at least 10 characters'),
  projectLink: z
    .string()
    .url('Please enter a valid project URL')
    .optional()
    .or(z.literal(''))
    .transform(val => (val === '' ? undefined : val)),
  githubLink: z
    .string()
    .url('Please enter a valid GitHub URL')
    .optional()
    .or(z.literal(''))
    .transform(val => (val === '' ? undefined : val)),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  projectTasks: z.array(projectTaskSchema).default([]),
  skillsUtilized: z.array(projectSkillSchema).default([]),
})

export const projectUpdateSchema = projectSchema.partial().extend({
  id: z.number(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
export type ProjectUpdateData = z.infer<typeof projectUpdateSchema>
export type ProjectTaskData = z.infer<typeof projectTaskSchema>
export type ProjectSkillData = z.infer<typeof projectSkillSchema>
