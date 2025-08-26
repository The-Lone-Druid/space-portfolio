import type {
  Hero as PrismaHero,
  PersonalInfo as PrismaPersonalInfo,
  Project as PrismaProject,
  ProjectSkill as PrismaProjectSkill,
  ProjectTask as PrismaProjectTask,
  Service as PrismaService,
  SiteSettings as PrismaSiteSettings,
  Skill as PrismaSkill,
  SocialLink as PrismaSocialLink,
} from '@prisma/client'
import { NextRequest } from 'next/server'

// Re-export Prisma types for convenience
export type PersonalInfo = PrismaPersonalInfo
export type Hero = PrismaHero
export type Skill = PrismaSkill
export type Project = PrismaProject
export type Service = PrismaService
export type SocialLink = PrismaSocialLink
export type ProjectTask = PrismaProjectTask
export type ProjectSkill = PrismaProjectSkill
export type SiteSettings = PrismaSiteSettings

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

// Extended types for settings
export type SettingWithDetails = PrismaSiteSettings

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

export interface DashboardStats {
  overview: {
    portfolioCompletion: number
    totalItems: number
    lastUpdated: Date | null
  }
  heroStats: {
    verifiedSkills: number
    professionalProjects: number
    personalProjects: number
    yearsOfExperience: number
  }
  projects: {
    total: number
    featured: number
    recent: Array<{
      id: number
      projectName: string
      startDate: Date
      endDate: Date | null
      isOngoing: boolean
      featured: boolean
    }>
  }
  skills: {
    total: number
    categories: number
    avgProficiency: number
    expertLevel: number
    topSkills: Array<{
      id: number
      name: string
      level: number
      category: string
    }>
  }
  services: {
    total: number
    recent: Array<{
      id: number
      name: string
      desc: string
    }>
  }
  personalInfo: {
    isComplete: boolean
    hasResume: boolean
    socialLinksCount: number
  }
  quickInsights: {
    portfolioStrength: 'weak' | 'moderate' | 'strong' | 'excellent'
    recommendations: string[]
    completionAreas: Array<{
      area: string
      status: 'complete' | 'incomplete' | 'needs-update'
      priority: 'high' | 'medium' | 'low'
    }>
  }
}

export interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export interface Context {
  params: Promise<{ id: string }>
}

export interface RateLimitConfig {
  maxAttempts: number
  windowMs: number
  keyGenerator?: (request: NextRequest) => string
}

export interface RateLimitEntry {
  count: number
  resetTime: number
}

export interface ProjectDateRange {
  startDate: Date
  endDate?: Date
  isOngoing: boolean
}

export interface LegacyProjectData {
  projectDate: string
}

export interface EmailConfig {
  from: string
  service: 'console' | 'resend' // Email service options
}

export interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

export interface RevalidationResponse {
  success: boolean
  message?: string
  error?: string
  timestamp?: string
  type?: 'path' | 'tag'
  target?: string
}

export interface UseRevalidationOptions {
  onSuccess?: (response: RevalidationResponse) => void
  onError?: (error: string) => void
}

export interface UseAnimatedCounterProps {
  end: number
  duration?: number
  start?: number
  suffix?: string
}

export interface PersonalInfoFormData {
  name: string
  title: string
  bio: string
  email: string
  location: string
  resumeUrl?: string
  socialLinks?: Omit<
    SocialLink,
    'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'personalInfoId'
  >[]
  heroStats: Omit<Hero, 'createdAt' | 'updatedAt' | 'isActive'>
}

export interface SocialLinkFormData {
  name: string
  url: string
  icon?: string
  order?: number
}

export interface PortfolioData {
  personalInfo: PersonalInfoWithSocials | null
  heroStats: Hero | null
  skills: Skill[]
  projects: ProjectWithDetails[]
  services: Service[]
}

export interface UsePortfolioDataReturn {
  data: PortfolioData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}
