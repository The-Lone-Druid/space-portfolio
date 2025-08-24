import type {
  Hero as PrismaHero,
  PersonalInfo as PrismaPersonalInfo,
  Project as PrismaProject,
  ProjectSkill as PrismaProjectSkill,
  ProjectTask as PrismaProjectTask,
  Service as PrismaService,
  Skill as PrismaSkill,
  SocialLink as PrismaSocialLink,
} from '@prisma/client'

// Re-export Prisma types for convenience
export type PersonalInfo = PrismaPersonalInfo
export type Hero = PrismaHero
export type Skill = PrismaSkill
export type Project = PrismaProject
export type Service = PrismaService
export type SocialLink = PrismaSocialLink
export type ProjectTask = PrismaProjectTask
export type ProjectSkill = PrismaProjectSkill

// Extended types for API responses with relations
export type PersonalInfoWithSocials = PrismaPersonalInfo & {
  socialLinks: PrismaSocialLink[]
}

export type ProjectWithDetails = PrismaProject & {
  projectTasks: PrismaProjectTask[]
  skillsUtilized: PrismaProjectSkill[]
}

// Extended types for skills
export type SkillWithDetails = PrismaSkill

// Extended types for services
export type ServiceWithDetails = PrismaService

// Form data types
export interface SkillFormData {
  name: string
  category: string
  level: number
  order?: number
  isActive?: boolean
}

export interface ServiceFormData {
  name: string
  desc: string
  icon?: string
  order?: number
  isActive?: boolean
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Portfolio data structure for page components
export interface PortfolioData {
  personalInfo: PersonalInfoWithSocials | null
  heroStats: Hero | null
  skills: Skill[]
  projects: ProjectWithDetails[]
  services: Service[]
}
