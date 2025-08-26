import { SettingType } from '@prisma/client'
import { z } from 'zod'

// Contact Form Schema
export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Authentication Form Schemas
export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type SignupFormData = z.infer<typeof signupSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

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

export const projectSchema = z
  .object({
    projectName: z.string().min(1, 'Project name is required'),
    startDate: z.coerce.date({ message: 'Start date is required' }),
    endDate: z.coerce.date().optional(),
    isOngoing: z.boolean().default(false),
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
  .refine(
    data => {
      // If not ongoing and endDate is provided, ensure endDate is after startDate
      if (!data.isOngoing && data.endDate) {
        return data.endDate >= data.startDate
      }
      return true
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  )

export type ProjectFormData = z.infer<typeof projectSchema>

// Skills validation schema
export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  level: z
    .number()
    .min(0, 'Proficiency level must be at least 0')
    .max(100, 'Proficiency level cannot exceed 100'),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
})

export const projectUpdateSchema = projectSchema.partial().extend({
  id: z.number(),
})

export const skillUpdateSchema = skillSchema.partial().extend({
  id: z.number(),
})
export type ProjectUpdateData = z.infer<typeof projectUpdateSchema>
export type ProjectTaskData = z.infer<typeof projectTaskSchema>
export type ProjectSkillData = z.infer<typeof projectSkillSchema>
export type SkillFormData = z.infer<typeof skillSchema>
export type SkillUpdateData = z.infer<typeof skillUpdateSchema>

// Services validation schema
export const serviceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  desc: z
    .string()
    .min(10, 'Service description must be at least 10 characters'),
  icon: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
})

export const serviceUpdateSchema = serviceSchema.partial().extend({
  id: z.number(),
})

export type ServiceFormData = z.infer<typeof serviceSchema>
export type ServiceUpdateData = z.infer<typeof serviceUpdateSchema>

// Settings validation schemas
export const settingSchema = z.object({
  key: z
    .string()
    .min(1, 'Key is required')
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      'Key can only contain letters, numbers, underscores, dots, and hyphens'
    )
    .transform(val => val.toLowerCase()),
  value: z.string().min(1, 'Value is required'),
  description: z.string().optional(),
  type: z.nativeEnum(SettingType).default(SettingType.STRING),
  isActive: z.boolean().default(true),
})

export const settingUpdateSchema = z.object({
  key: z
    .string()
    .min(1, 'Key is required')
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      'Key can only contain letters, numbers, underscores, dots, and hyphens'
    )
    .transform(val => val.toLowerCase())
    .optional(),
  value: z.string().min(1, 'Value is required').optional(),
  description: z.string().optional(),
  type: z.nativeEnum(SettingType).optional(),
  isActive: z.boolean().optional(),
})

export type SettingFormData = z.infer<typeof settingSchema>
export type SettingUpdateData = z.infer<typeof settingUpdateSchema>
